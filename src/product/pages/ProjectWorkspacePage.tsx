import { type FormEvent, useMemo, useState } from "react"
import { Link, useParams } from "react-router"
import { AlexMini, EmptyState, PageHeader, StatusBadge } from "@/product/components/ProductUI"
import { useProduct } from "@/product/state/ProductState"
import type { ProjectBrief, RevisionOption } from "@/product/types"

type WorkspaceTab = "brief" | "activity" | "deliverable"
type DeliverableTab = "preview" | "files" | "versions"

function downloadHtml(html: string, name: string) {
  const url = URL.createObjectURL(new Blob([html], { type: "text/html" }))
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = `${name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-index.html`
  anchor.click()
  URL.revokeObjectURL(url)
}

export default function ProjectWorkspacePage() {
  const { projectId } = useParams()
  const {
    store,
    updateBrief,
    startRun,
    cancelRun,
    approveVersion,
  } = useProduct()
  const project = store.projects.find((item) => item.id === projectId)
  const [workspaceTab, setWorkspaceTab] = useState<WorkspaceTab>("deliverable")
  const [deliverableTab, setDeliverableTab] = useState<DeliverableTab>("preview")
  const [previewWidth, setPreviewWidth] = useState<"desktop" | "mobile">("desktop")
  const [selectedVersionId, setSelectedVersionId] = useState<string>()
  const [editing, setEditing] = useState(false)
  const [briefDraft, setBriefDraft] = useState<ProjectBrief | null>(null)
  const [revisionOption, setRevisionOption] =
    useState<RevisionOption>("accent-coral")
  const [revisionNote, setRevisionNote] = useState("")
  const [copied, setCopied] = useState(false)

  const selectedVersion = useMemo(() => {
    if (!project) return undefined
    return (
      project.versions.find((version) => version.id === selectedVersionId) ??
      project.versions.find((version) => version.id === project.activeVersionId) ??
      project.versions.at(-1)
    )
  }, [project, selectedVersionId])

  if (!project) {
    return (
      <div className="product-page">
        <EmptyState
          title="Project not found"
          copy="This project ID isn’t stored in this browser. Return to Projects to choose an available project."
          action={<Link className="product-button" to="/app/projects">Back to Projects</Link>}
        />
      </div>
    )
  }

  const isActive = project.status === "generating"

  function beginEdit() {
    setBriefDraft(structuredClone(project!.brief))
    setEditing(true)
  }

  function saveBrief(event: FormEvent) {
    event.preventDefault()
    if (briefDraft) updateBrief(project!.id, briefDraft)
    setEditing(false)
  }

  function requestRevision() {
    if (!selectedVersion || isActive) return
    startRun(
      project!.id,
      {
        option: revisionOption,
        note:
          revisionNote.trim() ||
          `Supported template change: ${revisionOption.replaceAll("-", " ")}`,
      },
    )
  }

  async function copySource() {
    if (!selectedVersion) return
    await navigator.clipboard.writeText(selectedVersion.html)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="product-page workspace-page">
      <PageHeader
        eyebrow={`${project.brief.clientName} · Assigned to Alex`}
        title={project.brief.title}
        action={<StatusBadge status={project.status} />}
      />
      <nav className="workspace-mobile-tabs" aria-label="Project workspace panels">
        {(["brief", "activity", "deliverable"] as WorkspaceTab[]).map((tab) => (
          <button key={tab} className={workspaceTab === tab ? "active" : ""} type="button" onClick={() => setWorkspaceTab(tab)}>{tab}</button>
        ))}
      </nav>
      <div className="workspace-grid">
        <aside className={`workspace-brief ${workspaceTab === "brief" ? "mobile-active" : ""}`}>
          <section className="product-card">
            <AlexMini state={isActive ? "Generating example" : "Assigned"} />
          </section>
          <section className="product-card brief-card">
            <div className="card-heading"><div><p className="product-eyebrow">Project brief</p><h2>Inputs</h2></div>{!editing && <button type="button" onClick={beginEdit}>Edit</button>}</div>
            {editing && briefDraft ? (
              <form onSubmit={saveBrief}>
                {(["title", "clientName", "description", "audience", "goal", "sections", "colors", "contact", "additionalInstructions"] as (keyof ProjectBrief)[]).map((field) => (
                  <label key={field}>{field.replace(/([A-Z])/g, " $1")}<textarea rows={field === "description" ? 3 : 2} value={briefDraft[field]} onChange={(e) => setBriefDraft({ ...briefDraft, [field]: e.target.value })} /></label>
                ))}
                <div className="button-row"><button className="product-button small" type="submit">Save</button><button className="product-text-button" type="button" onClick={() => setEditing(false)}>Cancel</button></div>
              </form>
            ) : (
              <dl className="brief-list">
                <div><dt>Audience</dt><dd>{project.brief.audience}</dd></div>
                <div><dt>Goal</dt><dd>{project.brief.goal}</dd></div>
                <div><dt>Sections</dt><dd>{project.brief.sections}</dd></div>
                <div><dt>Colors</dt><dd>{project.brief.colors}</dd></div>
              </dl>
            )}
          </section>
          <section className="product-card snapshot-card">
            <p className="product-eyebrow">Saved company guide</p>
            <h2>Instructions for next run</h2>
            <p>{store.playbook.tone || "No tone guidance saved yet."}</p>
            <p>{store.playbook.requiredPractices || "No required practices saved yet."}</p>
            <small>Each run snapshots the brief and playbook. Earlier versions do not change when these inputs are edited.</small>
          </section>
        </aside>

        <section className={`workspace-main ${workspaceTab === "deliverable" ? "mobile-active" : ""}`}>
          <article className="product-card deliverable-card">
            <header className="deliverable-header">
              <div><p className="product-eyebrow">Deliverable</p><h2>{selectedVersion ? `Version ${selectedVersion.number}` : "No version yet"}</h2></div>
              <div className="segmented">
                {(["preview", "files", "versions"] as DeliverableTab[]).map((tab) => (
                  <button key={tab} className={deliverableTab === tab ? "active" : ""} type="button" onClick={() => setDeliverableTab(tab)}>{tab}</button>
                ))}
              </div>
            </header>
            {deliverableTab === "preview" && (
              selectedVersion ? (
                <>
                  <div className="preview-toolbar">
                    <span>Template-generated example · not published</span>
                    <div className="segmented"><button className={previewWidth === "desktop" ? "active" : ""} type="button" onClick={() => setPreviewWidth("desktop")}>Desktop</button><button className={previewWidth === "mobile" ? "active" : ""} type="button" onClick={() => setPreviewWidth("mobile")}>Mobile</button></div>
                  </div>
                  <div className={`iframe-wrap ${previewWidth}`}><iframe title={`Preview of version ${selectedVersion.number}`} sandbox="" srcDoc={selectedVersion.html} /></div>
                </>
              ) : <EmptyState title="Ready when you are" copy="Generate a deterministic example from this brief to inspect it here." />
            )}
            {deliverableTab === "files" && (
              selectedVersion ? (
                <div className="files-panel">
                  <div className="file-heading"><div><strong>index.html</strong><span>Single-file HTML · local artifact</span></div><div><button type="button" onClick={copySource}>{copied ? "Copied" : "Copy source"}</button><button type="button" onClick={() => downloadHtml(selectedVersion.html, project.brief.clientName)}>Download</button></div></div>
                  <pre><code>{selectedVersion.html}</code></pre>
                </div>
              ) : <EmptyState title="No files yet" copy="The generated index.html will appear after the first example run." />
            )}
            {deliverableTab === "versions" && (
              <div className="versions-list">
                {project.versions.length ? [...project.versions].reverse().map((version) => (
                  <button key={version.id} className={selectedVersion?.id === version.id ? "selected" : ""} type="button" onClick={() => { setSelectedVersionId(version.id); setDeliverableTab("preview") }}>
                    <div><strong>Version {version.number}</strong>{version.approvedAt && <span>Approved</span>}</div>
                    <time>{new Date(version.createdAt).toLocaleString()}</time>
                    <p>{version.revisionNote || "Initial generated example"}</p>
                  </button>
                )) : <EmptyState title="No saved versions" copy="Completed generations and revisions are preserved here." />}
              </div>
            )}
          </article>
        </section>

        <aside className={`workspace-activity ${workspaceTab === "activity" ? "mobile-active" : ""}`}>
          <section className="product-card run-card">
            <p className="product-eyebrow">Run controls</p>
            <h2>{isActive ? "Alex is assembling…" : "Create an example"}</h2>
            <p>Example generation uses a template. The AI backend will be connected next.</p>
            <div className="button-stack">
              {!isActive && (
                <button className="product-button" type="button" onClick={() => startRun(project.id)}>
                  {project.status === "failed" || project.status === "interrupted" ? "Retry" : "Generate Example"}
                </button>
              )}
              {isActive && <button className="product-button danger" type="button" onClick={() => cancelRun(project.id)}>Cancel</button>}
              {import.meta.env.DEV && !isActive && <button className="product-text-button" type="button" onClick={() => startRun(project.id, undefined, true)}>Simulate failure</button>}
            </div>
          </section>
          {selectedVersion && (
            <section className="product-card revision-card">
              <p className="product-eyebrow">Review</p>
              <h2>Request a revision</h2>
              <label>Supported change<select value={revisionOption} onChange={(e) => setRevisionOption(e.target.value as RevisionOption)}><option value="accent-coral">Change accent to coral</option><option value="accent-blue">Change accent to blue</option><option value="add-contact">Add contact section</option></select></label>
              <label>Revision note<textarea rows={3} value={revisionNote} onChange={(e) => setRevisionNote(e.target.value)} placeholder="Free-text note for the future backend" /></label>
              <small>Only the selected template change is simulated today. Free text is saved as a note but is not interpreted.</small>
              <button className="product-button secondary" type="button" disabled={isActive} onClick={requestRevision}>Create revision</button>
              <button className="product-button approve" type="button" disabled={isActive || Boolean(selectedVersion.approvedAt)} onClick={() => approveVersion(project.id, selectedVersion.id)}>{selectedVersion.approvedAt ? "Version approved" : "Approve Deliverable"}</button>
            </section>
          )}
          <section className="product-card activity-card">
            <p className="product-eyebrow">Simulated activity</p>
            <h2>Timeline</h2>
            <ol>{[...project.events].reverse().map((item) => <li key={item.id} className={item.kind === "error" ? "error" : ""}><span /><div><p>{item.message}</p><time>{new Date(item.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</time></div></li>)}</ol>
          </section>
        </aside>
      </div>
    </div>
  )
}
