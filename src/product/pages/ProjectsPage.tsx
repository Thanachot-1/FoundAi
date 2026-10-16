import { type FormEvent, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router"
import { EmptyState, PageHeader, StatusBadge } from "@/product/components/ProductUI"
import { useProduct } from "@/product/state/ProductState"
import type { ProjectBrief } from "@/product/types"

const blankBrief: ProjectBrief = {
  title: "",
  clientName: "",
  description: "",
  audience: "",
  goal: "",
  sections: "",
  colors: "",
  contact: "",
  additionalInstructions: "",
}

const exampleBrief: ProjectBrief = {
  title: "A warmer welcome to every morning",
  clientName: "Juniper Coffee House",
  description:
    "A neighborhood coffee shop serving seasonal drinks, fresh pastries, and a calm place to meet.",
  audience: "Local remote workers, neighbors, and weekend visitors",
  goal: "Encourage first visits and make the menu feel inviting",
  sections: "Our story, Seasonal menu, Visit the shop",
  colors: "#e66e58, cream, deep brown",
  contact: "hello@juniper.example · 18 Market Lane",
  additionalInstructions:
    "Keep the language welcoming and make the location easy to find.",
}

export default function ProjectsPage() {
  const { store, createProject } = useProduct()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [brief, setBrief] = useState<ProjectBrief>(blankBrief)
  const [error, setError] = useState("")
  const isCreating = searchParams.get("new") === "1"

  function update(field: keyof ProjectBrief, value: string) {
    setBrief((current) => ({ ...current, [field]: value }))
  }

  async function submit(event: FormEvent) {
    event.preventDefault()
    const required: (keyof ProjectBrief)[] = [
      "title",
      "clientName",
      "description",
      "audience",
      "goal",
      "sections",
      "colors",
    ]
    if (required.some((field) => !brief[field].trim())) {
      setError("Complete all required fields before assigning the project.")
      return
    }
    const project = await createProject(brief)
    navigate(`/app/projects/${project.id}`)
  }

  if (isCreating) {
    return (
      <div className="product-page">
        <PageHeader
          eyebrow="New project"
          title="Brief Alex."
          description="Give Alex the practical context needed to assemble a template-generated landing page."
          action={<button className="product-text-button" type="button" onClick={() => setSearchParams({})}>Cancel</button>}
        />
        <form className="product-card project-form" onSubmit={submit}>
          <div className="form-heading">
            <div><h2>Landing-page brief</h2><p>Required fields are marked.</p></div>
            <button className="product-button secondary" type="button" onClick={() => { setBrief(exampleBrief); setError("") }}>
              Fill example brief
            </button>
          </div>
          <div className="form-grid">
            <label>Project title *<input value={brief.title} onChange={(e) => update("title", e.target.value)} required /></label>
            <label>Business / client name *<input value={brief.clientName} onChange={(e) => update("clientName", e.target.value)} required /></label>
            <label className="full">Business description *<textarea rows={3} value={brief.description} onChange={(e) => update("description", e.target.value)} required /></label>
            <label>Target audience *<textarea rows={3} value={brief.audience} onChange={(e) => update("audience", e.target.value)} required /></label>
            <label>Main website goal *<textarea rows={3} value={brief.goal} onChange={(e) => update("goal", e.target.value)} required /></label>
            <label>Required sections *<textarea rows={3} value={brief.sections} onChange={(e) => update("sections", e.target.value)} placeholder="About, Services, Contact" required /></label>
            <label>Preferred colors *<textarea rows={3} value={brief.colors} onChange={(e) => update("colors", e.target.value)} placeholder="#1654e8, ivory" required /></label>
            <label className="full">Contact information to include <input value={brief.contact} onChange={(e) => update("contact", e.target.value)} /></label>
            <label className="full">Additional instructions<textarea rows={4} value={brief.additionalInstructions} onChange={(e) => update("additionalInstructions", e.target.value)} /></label>
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="save-row"><button className="product-button" type="submit">Save brief & open workspace</button><span>Assigned to Alex</span></div>
        </form>
      </div>
    )
  }

  return (
    <div className="product-page">
      <PageHeader
        eyebrow="Projects"
        title="Work in one clear place."
        description="Each project keeps its brief, activity, deliverables, and earlier versions together."
        action={<button className="product-button" type="button" onClick={() => setSearchParams({ new: "1" })}>Create Project</button>}
      />
      {store.projects.length ? (
        <section className="projects-table product-card">
          <div className="projects-table-head"><span>Project</span><span>Status</span><span>Versions</span><span>Updated</span></div>
          {store.projects.map((project) => (
            <Link key={project.id} to={`/app/projects/${project.id}`}>
              <div><strong>{project.brief.title}</strong><span>{project.brief.clientName}</span></div>
              <StatusBadge status={project.status} />
              <span>{project.versions.length}</span>
              <time>{new Date(project.updatedAt).toLocaleDateString()}</time>
            </Link>
          ))}
        </section>
      ) : (
        <EmptyState
          title="The project desk is clear"
          copy="Create a landing-page brief and assign the first piece of work to Alex."
          action={<button className="product-button" type="button" onClick={() => setSearchParams({ new: "1" })}>Create Project</button>}
        />
      )}
    </div>
  )
}
