import { type FormEvent, useState } from "react"
import { Link } from "react-router"
import { Logo, Portrait } from "@/components/brand/Brand"
import { useProduct } from "@/product/state/ProductState"

export default function OnboardingPage() {
  const { saveCompany } = useProduct()
  const [name, setName] = useState("")
  const [service, setService] = useState("")
  const [customers, setCustomers] = useState("")

  function submit(event: FormEvent) {
    event.preventDefault()
    saveCompany({ name, service, customers, isExample: false })
  }

  function example() {
    saveCompany({
      name: "Northstar Studio",
      service: "Warm, conversion-focused landing pages for independent businesses",
      customers: "Local founders and small hospitality brands",
      isExample: true,
    })
  }

  return (
    <div className="product-shell onboarding-shell">
      <header className="onboarding-header">
        <Link to="/" aria-label="Back to FoundAi website">
          <Logo />
        </Link>
        <span>Prototype · AI not connected</span>
      </header>
      <main className="onboarding-main">
        <section className="onboarding-copy">
          <p className="product-eyebrow">Set up your company</p>
          <h1>Give Alex a business to build with.</h1>
          <p>
            Start with landing-page development. You’ll shape the offer, teach
            Alex your standards, and review every deliverable.
          </p>
          <div className="onboarding-alex">
            <Portrait variant="alex" />
            <div>
              <strong>Alex joins first</strong>
              <span>AI Employee · Website Developer</span>
            </div>
          </div>
        </section>
        <form className="product-card onboarding-form" onSubmit={submit}>
          <label>
            Company name
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your company"
            />
          </label>
          <label>
            What service do you want to offer?
            <textarea
              required
              rows={3}
              value={service}
              onChange={(event) => setService(event.target.value)}
              placeholder="Describe your landing-page service"
            />
            <small>Landing-page development is the available service.</small>
          </label>
          <label>
            Who are your target customers?
            <textarea
              required
              rows={3}
              value={customers}
              onChange={(event) => setCustomers(event.target.value)}
              placeholder="Independent cafés, coaches, local businesses..."
            />
          </label>
          <button className="product-button" type="submit">
            Create workspace
          </button>
          <button className="product-button secondary" type="button" onClick={example}>
            Try an example company
          </button>
          <p className="form-note">
            The example is fictional and is labeled throughout the workspace.
          </p>
        </form>
      </main>
    </div>
  )
}
