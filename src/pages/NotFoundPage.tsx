import { Link } from "react-router"
import { Logo } from "@/components/brand/Brand"

export default function NotFoundPage() {
  return (
    <main className="not-found">
      <Logo />
      <p className="product-eyebrow">404</p>
      <h1>This page isn’t in the plan.</h1>
      <p>Return to the FoundAi website or open your local workspace.</p>
      <div className="button-row">
        <Link className="product-button" to="/">Company website</Link>
        <Link className="product-button secondary" to="/app">Open workspace</Link>
      </div>
    </main>
  )
}
