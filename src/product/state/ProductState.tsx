import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { productService, type RunRequest } from "@/product/services/productService"
import type {
  Company,
  Playbook,
  Project,
  ProjectBrief,
  PrototypeStore,
  ReferenceFile,
  RevisionOption,
} from "@/product/types"

const STORAGE_KEY = "foundai-prototype-v1"

const emptyPlaybook: Playbook = {
  tone: "",
  designPreferences: "",
  requiredPractices: "",
  avoid: "",
  customInstructions: [],
  references: [],
}

const emptyStore: PrototypeStore = {
  version: 1,
  company: null,
  playbook: emptyPlaybook,
  projects: [],
}

function event(message: string, kind: "normal" | "error" = "normal") {
  return { id: crypto.randomUUID(), at: new Date().toISOString(), message, kind }
}

function loadStore(): PrototypeStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyStore
    const parsed = JSON.parse(raw) as PrototypeStore
    if (
      parsed.version !== 1 ||
      !Array.isArray(parsed.projects) ||
      !parsed.playbook
    ) {
      return emptyStore
    }
    return {
      ...parsed,
      projects: parsed.projects.map((project) =>
        project.status === "generating"
          ? {
              ...project,
              status: "interrupted" as const,
              events: [
                ...project.events,
                event("Generation was interrupted by a page refresh.", "error"),
              ],
            }
          : project,
      ),
    }
  } catch {
    return emptyStore
  }
}

type ProductContextValue = {
  store: PrototypeStore
  storageAvailable: boolean
  saveCompany: (company: Company) => void
  savePlaybook: (playbook: Playbook) => void
  addReferences: (references: ReferenceFile[]) => void
  removeReference: (id: string) => void
  createProject: (brief: ProjectBrief) => Promise<Project>
  updateBrief: (id: string, brief: ProjectBrief) => void
  startRun: (
    id: string,
    revision?: { option: RevisionOption; note: string },
    simulateFailure?: boolean,
  ) => Promise<void>
  cancelRun: (id: string) => Promise<void>
  approveVersion: (projectId: string, versionId: string) => Promise<void>
  reset: () => void
}

const ProductContext = createContext<ProductContextValue | null>(null)

export function ProductProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<PrototypeStore>(loadStore)
  const [storageAvailable, setStorageAvailable] = useState(true)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
      setStorageAvailable(true)
    } catch {
      setStorageAvailable(false)
    }
  }, [store])

  useEffect(
    () =>
      productService.subscribe((update) => {
        setStore((current) => ({
          ...current,
          projects: current.projects.map((project) => {
            if (project.id !== update.projectId) return project
            const updatedAt = new Date().toISOString()
            if (update.type === "progress") {
              return {
                ...project,
                updatedAt,
                events: [...project.events, event(update.message)],
              }
            }
            if (update.type === "completed") {
              return {
                ...project,
                status: "awaiting-review",
                updatedAt,
                versions: [...project.versions, update.version],
                activeVersionId: update.version.id,
                events: [
                  ...project.events,
                  event(`Version ${update.version.number} is ready for review.`),
                ],
              }
            }
            return {
              ...project,
              status: update.type === "failed" ? "failed" : "canceled",
              updatedAt,
              events: [
                ...project.events,
                event(update.message, update.type === "failed" ? "error" : "normal"),
              ],
            }
          }),
        }))
      }),
    [],
  )

  const value = useMemo<ProductContextValue>(
    () => ({
      store,
      storageAvailable,
      saveCompany: (company) => setStore((current) => ({ ...current, company })),
      savePlaybook: (playbook) => setStore((current) => ({ ...current, playbook })),
      addReferences: (references) =>
        setStore((current) => ({
          ...current,
          playbook: {
            ...current.playbook,
            references: [...current.playbook.references, ...references],
          },
        })),
      removeReference: (id) =>
        setStore((current) => ({
          ...current,
          playbook: {
            ...current.playbook,
            references: current.playbook.references.filter(
              (reference) => reference.id !== id,
            ),
          },
        })),
      createProject: async (brief) => {
        const now = new Date().toISOString()
        const project = await productService.createProject({
          id: crypto.randomUUID(),
          brief,
          status: "draft",
          createdAt: now,
          updatedAt: now,
          events: [event("Project created and assigned to Alex.")],
          versions: [],
        })
        setStore((current) => ({
          ...current,
          projects: [project, ...current.projects],
        }))
        return project
      },
      updateBrief: (id, brief) =>
        setStore((current) => ({
          ...current,
          projects: current.projects.map((project) =>
            project.id === id
              ? { ...project, brief, updatedAt: new Date().toISOString() }
              : project,
          ),
        })),
      startRun: async (id, revision, simulateFailure) => {
        const project = store.projects.find((item) => item.id === id)
        if (!project || project.status === "generating") return
        setStore((current) => ({
          ...current,
          projects: current.projects.map((item) =>
            item.id === id
              ? {
                  ...item,
                  status: "generating",
                  updatedAt: new Date().toISOString(),
                  events: [
                    ...item.events,
                    event(
                      revision
                        ? "Revision generation started."
                        : "Example generation started.",
                    ),
                  ],
                }
              : item,
          ),
        }))
        const request: RunRequest = {
          project: structuredClone(project),
          playbook: structuredClone(store.playbook),
          revision,
          simulateFailure,
        }
        if (revision) await productService.createRevision(request)
        else await productService.startRun(request)
      },
      cancelRun: (id) => productService.cancelRun(id),
      approveVersion: async (projectId, versionId) => {
        await productService.approveVersion(projectId, versionId)
        setStore((current) => ({
          ...current,
          projects: current.projects.map((project) =>
            project.id === projectId
              ? {
                  ...project,
                  status: "approved",
                  activeVersionId: versionId,
                  updatedAt: new Date().toISOString(),
                  versions: project.versions.map((version) =>
                    version.id === versionId
                      ? { ...version, approvedAt: new Date().toISOString() }
                      : version,
                  ),
                  events: [...project.events, event("Deliverable approved by owner.")],
                }
              : project,
          ),
        }))
      },
      reset: () => {
        localStorage.removeItem(STORAGE_KEY)
        setStore(emptyStore)
      },
    }),
    [store, storageAvailable],
  )

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

export function useProduct() {
  const context = useContext(ProductContext)
  if (!context) throw new Error("useProduct must be used inside ProductProvider")
  return context
}
