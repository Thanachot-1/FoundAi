import type {
  Playbook,
  Project,
  ProjectBrief,
  ProjectVersion,
  RevisionOption,
} from "@/product/types"

export type RunUpdate =
  | { projectId: string; type: "progress"; message: string }
  | { projectId: string; type: "failed"; message: string }
  | { projectId: string; type: "canceled"; message: string }
  | { projectId: string; type: "completed"; version: ProjectVersion }

export type RunRequest = {
  project: Project
  playbook: Playbook
  revision?: {
    option: RevisionOption
    note: string
  }
  simulateFailure?: boolean
}

export interface ProductService {
  createProject(project: Project): Promise<Project>
  updateProject(project: Project): Promise<Project>
  startRun(request: RunRequest): Promise<void>
  createRevision(request: RunRequest): Promise<void>
  cancelRun(projectId: string): Promise<void>
  approveVersion(projectId: string, versionId: string): Promise<void>
  getArtifacts(project: Project): Promise<ProjectVersion[]>
  subscribe(listener: (update: RunUpdate) => void): () => void
}

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")

const validColor = (value: string) => {
  const candidate = value.trim().split(/[\s,]+/)[0]
  return /^#[0-9a-f]{6}$/i.test(candidate) ? candidate : "#1654e8"
}

function makeHtml(
  brief: ProjectBrief,
  option?: RevisionOption,
): string {
  const baseAccent = validColor(brief.colors)
  const accent =
    option === "accent-coral"
      ? "#e66e58"
      : option === "accent-blue"
        ? "#1654e8"
        : baseAccent
  const sections = brief.sections
    .split(/,|\n/)
    .map((section) => section.trim())
    .filter(Boolean)
  const contact =
    option === "add-contact" || brief.contact
      ? `<section class="contact"><p>Ready to get started?</p><h2>Let’s make something memorable.</h2><p>${escapeHtml(brief.contact || "Contact us to begin.")}</p></section>`
      : ""

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(brief.title)}</title>
  <style>
    *{box-sizing:border-box}body{margin:0;background:#fffdf7;color:#20211f;font-family:Arial,sans-serif}header,main,footer{max-width:1100px;margin:auto;padding:28px 32px}nav{display:flex;justify-content:space-between;align-items:center;font-weight:700}.badge{color:${accent};text-transform:uppercase;letter-spacing:.12em;font-size:12px}.hero{padding:100px 0 80px;border-bottom:1px solid #d7d1c4}.hero h1{max-width:850px;margin:12px 0 22px;font-size:clamp(48px,8vw,92px);line-height:.95;letter-spacing:-.06em}.hero p{max-width:620px;color:#65655f;font-size:20px;line-height:1.6}.cta{display:inline-block;margin-top:18px;padding:15px 22px;border-radius:10px;background:${accent};color:white;text-decoration:none;font-weight:700;box-shadow:5px 5px 0 #20211f}.services{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px;padding:64px 0}.card{padding:28px;border:1px solid #20211f;border-radius:18px;box-shadow:5px 5px 0 #20211f}.card span{color:${accent};font-weight:700}.contact{margin:32px 0;padding:56px;border-radius:24px;background:#20211f;color:white}.contact p{color:#d7d1c4}.contact h2{font-size:42px;margin:8px 0 18px}footer{display:flex;justify-content:space-between;border-top:1px solid #d7d1c4;color:#65655f}@media(max-width:600px){header,main,footer{padding-left:20px;padding-right:20px}.hero{padding:64px 0}.contact{padding:32px}.hero h1{font-size:52px}}
  </style>
</head>
<body>
  <header><nav><strong>${escapeHtml(brief.clientName)}</strong><span>Independent business</span></nav></header>
  <main>
    <section class="hero"><span class="badge">${escapeHtml(brief.goal)}</span><h1>${escapeHtml(brief.title)}</h1><p>${escapeHtml(brief.description)}</p><a class="cta" href="#services">Explore our work</a></section>
    <section class="services" id="services">${(sections.length ? sections : ["About", "Services", "Contact"]).map((section, index) => `<article class="card"><span>0${index + 1}</span><h2>${escapeHtml(section)}</h2><p>Thoughtfully created for ${escapeHtml(brief.audience)}.</p></article>`).join("")}</section>
    ${contact}
  </main>
  <footer><span>${escapeHtml(brief.clientName)}</span><span>Template-generated example</span></footer>
</body>
</html>`
}

class LocalMockProductService implements ProductService {
  private listeners = new Set<(update: RunUpdate) => void>()
  private timers = new Map<string, number[]>()

  async createProject(project: Project) {
    return structuredClone(project)
  }

  async updateProject(project: Project) {
    return structuredClone(project)
  }

  subscribe(listener: (update: RunUpdate) => void) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private emit(update: RunUpdate) {
    this.listeners.forEach((listener) => listener(update))
  }

  private schedule(projectId: string, callback: () => void, delay: number) {
    const timer = window.setTimeout(callback, delay)
    this.timers.set(projectId, [...(this.timers.get(projectId) ?? []), timer])
  }

  async startRun(request: RunRequest) {
    await this.run(request)
  }

  async createRevision(request: RunRequest) {
    await this.run(request)
  }

  private async run(request: RunRequest) {
    const { project, playbook, revision, simulateFailure } = request
    await this.cancelRun(project.id, false)
    this.schedule(
      project.id,
      () =>
        this.emit({
          projectId: project.id,
          type: "progress",
          message: "Template structure prepared from the saved brief.",
        }),
      450,
    )
    this.schedule(
      project.id,
      () =>
        this.emit({
          projectId: project.id,
          type: "progress",
          message: "Brand styles and page sections assembled.",
        }),
      1050,
    )
    this.schedule(project.id, () => {
      this.timers.delete(project.id)
      if (simulateFailure) {
        this.emit({
          projectId: project.id,
          type: "failed",
          message: "Simulated generation failure. No artifact was created.",
        })
        return
      }
      const createdAt = new Date().toISOString()
      const version: ProjectVersion = {
        id: crypto.randomUUID(),
        number: project.versions.length + 1,
        createdAt,
        html: makeHtml(project.brief, revision?.option),
        revisionNote: revision?.note,
        briefSnapshot: structuredClone(project.brief),
        playbookSnapshot: structuredClone(playbook),
      }
      this.emit({ projectId: project.id, type: "completed", version })
    }, 1750)
  }

  async cancelRun(projectId: string, emit = true) {
    for (const timer of this.timers.get(projectId) ?? []) {
      window.clearTimeout(timer)
    }
    const hadRun = this.timers.delete(projectId)
    if (hadRun && emit) {
      this.emit({
        projectId,
        type: "canceled",
        message: "Example generation canceled.",
      })
    }
  }

  async approveVersion() {}

  async getArtifacts(project: Project) {
    return structuredClone(project.versions)
  }
}

export const productService: ProductService = new LocalMockProductService()
