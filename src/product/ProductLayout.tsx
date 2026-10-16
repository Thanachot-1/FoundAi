import { useState } from "react"
import { Link, NavLink, Outlet } from "react-router"
import { Logo } from "@/components/brand/Brand"
import OnboardingPage from "@/product/pages/OnboardingPage"
import { useProduct } from "@/product/state/ProductState"

const navigation = [
  { label: "Overview", to: "/app", end: true, icon: "OV" },
  { label: "Team", to: "/app/team", icon: "A" },
  { label: "Playbook", to: "/app/playbook", icon: "PB" },
  { label: "Projects", to: "/app/projects", icon: "PR" },
  { label: "Settings", to: "/app/settings", icon: "ST" },
]

export default function ProductLayout() {
  const { store, storageAvailable } = useProduct()
  const [menuOpen, setMenuOpen] = useState(false)

  if (!store.company) return <OnboardingPage />

  return (
    <div className="product-shell">
      <button
        className="product-menu-toggle"
        type="button"
        onClick={() => setMenuOpen(true)}
        aria-label="Open workspace navigation"
      >
        Menu
      </button>
      {menuOpen && (
        <button
          className="product-nav-scrim"
          type="button"
          aria-label="Close workspace navigation"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <aside className={menuOpen ? "product-sidebar is-open" : "product-sidebar"}>
        <div className="product-sidebar-brand">
          <Link to="/" aria-label="FoundAi website">
            <Logo />
          </Link>
          <button
            type="button"
            aria-label="Close workspace navigation"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>
        </div>
        <div className="company-chip">
          <span>{store.company.name.slice(0, 2).toUpperCase()}</span>
          <div>
            <strong>{store.company.name}</strong>
            <small>{store.company.isExample ? "Example company" : "Workspace"}</small>
          </div>
        </div>
        <nav aria-label="Workspace navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              end={item.end}
              to={item.to}
              onClick={() => setMenuOpen(false)}
            >
              <span aria-hidden="true">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="product-sidebar-footer">
          <div className="founder-avatar">TT</div>
          <div>
            <strong>Founder</strong>
            <Link to="/">Back to website</Link>
          </div>
        </div>
      </aside>
      <main className="product-main">
        <div className="prototype-strip">
          <span>Prototype · AI not connected</span>
          {!storageAvailable && (
            <strong>Browser storage is unavailable; changes may not persist.</strong>
          )}
        </div>
        <Outlet />
      </main>
    </div>
  )
}
