import { Link } from "react-router"
import { AlexMini, EmptyState, PageHeader, StatusBadge } from "@/product/components/ProductUI"
import { useProduct } from "@/product/state/ProductState"

export default function OverviewPage() {
  const { store } = useProduct()
  const projects = store.projects
  const awaiting = projects.filter(
    (project) => project.status === "awaiting-review",
  ).length
  const approved = projects.filter((project) => project.status === "approved").length

  return (
    <div className="product-page">
      <PageHeader
        eyebrow="Company overview"
        title={`Good to see you, ${store.company?.name}.`}
        description="Direct the work, review each result, and keep the final say."
        action={
          <Link className="product-button" to="/app/projects?new=1">
            Create Project
          </Link>
        }
      />
      <section className="metrics-grid" aria-label="Project summary">
        <article><span>All projects</span><strong>{projects.length}</strong></article>
        <article><span>Awaiting review</span><strong>{awaiting}</strong></article>
        <article><span>Approved</span><strong>{approved}</strong></article>
      </section>
      <div className="overview-grid">
        <section className="product-card">
          <div className="card-heading">
            <div><p className="product-eyebrow">Your team</p><h2>Alex is ready</h2></div>
            <Link to="/app/team">View team</Link>
          </div>
          <AlexMini
            state={
              projects.some((project) => project.status === "generating")
                ? "Generating an example"
                : "Available"
            }
          />
          <p className="muted-copy">
            Alex creates single-page landing page examples, follows your saved
            brief, and handles supported revisions.
          </p>
        </section>
        <section className="product-card">
          <div className="card-heading">
            <div><p className="product-eyebrow">Recent activity</p><h2>Projects</h2></div>
            <Link to="/app/projects">View all</Link>
          </div>
          {projects.length ? (
            <div className="project-list">
              {projects.slice(0, 4).map((project) => (
                <Link key={project.id} to={`/app/projects/${project.id}`}>
                  <div>
                    <strong>{project.brief.title}</strong>
                    <span>{project.brief.clientName}</span>
                  </div>
                  <StatusBadge status={project.status} />
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No projects yet"
              copy="Create a brief when you’re ready to give Alex the first assignment."
              action={<Link className="product-text-link" to="/app/projects?new=1">Create your first project →</Link>}
            />
          )}
        </section>
      </div>
    </div>
  )
}
