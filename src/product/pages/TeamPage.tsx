import { Link } from "react-router"
import { Portrait } from "@/components/brand/Brand"
import { employees } from "@/data/employees"
import { PageHeader } from "@/product/components/ProductUI"
import { useProduct } from "@/product/state/ProductState"

export default function TeamPage() {
  const { store } = useProduct()
  const active = store.projects.find((project) => project.status === "generating")

  return (
    <div className="product-page">
      <PageHeader
        eyebrow="AI employees"
        title="A small team, on purpose."
        description="Alex is available now in this prototype. Future roles are shown as direction, not products for sale."
      />
      <section className="team-primary product-card">
        <div className="team-portrait"><Portrait variant="alex" /></div>
        <div className="team-copy">
          <span className="product-status">AI Employee</span>
          <h2>Alex</h2>
          <p className="team-role">Website Developer</p>
          <p>
            Supported work: single-page landing pages, following structured
            briefs, and explicit template revisions.
          </p>
          <div className="task-state">
            <span>Current task state</span>
            <strong>{active ? active.brief.title : "Available for a project"}</strong>
          </div>
          <div className="button-row">
            <Link className="product-button" to="/app/playbook">Teach Alex</Link>
            <Link className="product-button secondary" to="/app/projects?new=1">Assign Project</Link>
          </div>
        </div>
      </section>
      <section>
        <div className="section-mini-heading">
          <div><p className="product-eyebrow">Future crew</p><h2>Planned roles</h2></div>
          <p>Visible for context only. These roles are not selectable or purchasable.</p>
        </div>
        <div className="planned-grid">
          {employees.slice(1).map((employee) => (
            <article className={`planned-card planned-${employee.variant}`} key={employee.name}>
              <div><Portrait variant={employee.variant} /></div>
              <span>Planned</span>
              <h3>{employee.name}</h3>
              <p>{employee.role}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
