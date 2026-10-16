import { type FormEvent, type ReactNode, useState } from "react"
import { Link } from "react-router"
import { employees } from "@/data/employees"
import { ArrowIcon, CheckIcon, EmployeeCard, Logo, SparkIcon } from "@/components/brand/Brand"

const navItems = [
  { label: "Vision", href: "#vision" },
  { label: "AI Employees", href: "#employees" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About", href: "#about" },
]

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string
  title: string
  copy?: string
}) {
  return (
    <header className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {copy && <p className="section-copy">{copy}</p>}
    </header>
  )
}

function StepIcon({ children }: { children: ReactNode }) {
  return (
    <div className="step-icon" aria-hidden="true">
      <svg viewBox="0 0 32 26">{children}</svg>
    </div>
  )
}

export default function CompanyWebsite() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="site-shell" id="top">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="FoundAi home">
          <Logo />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
        <nav
          className={menuOpen ? "nav-open" : ""}
          aria-label="Main navigation"
        >
          <div className="nav-links">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Link to="/app" onClick={() => setMenuOpen(false)}>
              Open Workspace
            </Link>
          </div>
          <a
            className="button button-small"
            href="#waitlist"
            onClick={() => setMenuOpen(false)}
          >
            Join the Waitlist
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow eyebrow-pill">
              <SparkIcon /> For the next generation of founders
            </p>
            <h1 id="hero-title">
              Your idea.
              <br />
              Your company.
              <br />
              <span>Your AI crew.</span>
            </h1>
            <p className="hero-description">
              We’re building a way for anyone to start and run a service
              business with AI employees they can teach and direct.
            </p>
            <div className="hero-actions">
              <a className="button" href="#waitlist">
                Join the Waitlist <ArrowIcon />
              </a>
              <Link className="text-link" to="/app">
                Open Workspace <ArrowIcon />
              </Link>
              <a className="text-link" href="#employees">
                Meet the AI Crew <ArrowIcon />
              </a>
            </div>
            <div className="status">
              <span /> In development
            </div>
          </div>
          <div
            className="hero-cards"
            aria-label="Preview of fictional AI employee concept profiles"
          >
            <div className="hero-orbit hero-orbit-one" />
            <div className="hero-orbit hero-orbit-two" />
            <EmployeeCard
              employee={employees[1]}
              compact
              className="hero-card hero-card-maya"
            />
            <EmployeeCard
              employee={employees[2]}
              compact
              className="hero-card hero-card-sam"
            />
            <EmployeeCard
              employee={employees[0]}
              compact
              className="hero-card hero-card-alex"
            />
            <p className="hero-note">
              A future crew,
              <br />
              built around you.
            </p>
          </div>
        </section>

        <section className="vision section-pad" id="vision">
          <div className="vision-number">01</div>
          <div className="vision-main">
            <p className="eyebrow">The vision</p>
            <h2>An idea shouldn’t require an entire team to get started.</h2>
          </div>
          <div className="vision-side">
            <p>
              Starting a business often means handling sales, delivery, and
              customer communication alone. FoundAi’s vision is to make a
              capable AI team accessible to people starting their first
              business.
            </p>
            <blockquote>
              You set the direction.
              <br />
              <span>Your AI crew helps you move.</span>
            </blockquote>
          </div>
        </section>

        <section className="employees-section section-pad" id="employees">
          <SectionHeading
            eyebrow="Meet the AI employees"
            title="A crew with different strengths."
            copy="A preview of the roles we envision. Our first release will begin with one focused service."
          />
          <div className="employee-grid">
            {employees.map((employee) => (
              <EmployeeCard employee={employee} key={employee.name} />
            ))}
          </div>
          <p className="fiction-note">
            Alex, Maya, and Sam are fictional AI character concepts—not human
            team members or currently available products.
          </p>
        </section>

        <section className="how-section section-pad" id="how-it-works">
          <SectionHeading
            eyebrow="How it will work"
            title="From idea to a business that feels like yours."
            copy="A simple path for shaping your service, your crew, and the way they work with you."
          />
          <ol className="steps">
            <li>
              <span className="step-number">01</span>
              <StepIcon>
                <path d="M8 17V8l8-4 8 4v9l-8 4-8-4Zm0-9 8 4 8-4m-8 4v9" />
              </StepIcon>
              <div>
                <h3>Define your business</h3>
                <p>
                  Choose the service you want to offer and the customers you
                  want to serve.
                </p>
              </div>
            </li>
            <li>
              <span className="step-number">02</span>
              <StepIcon>
                <path d="M7 21v-2c0-3 2-5 5-5h8c3 0 5 2 5 5v2M16 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM5 8H1m2-2v4" />
              </StepIcon>
              <div>
                <h3>Build your crew</h3>
                <p>Select AI employees with the skills your business needs.</p>
              </div>
            </li>
            <li>
              <span className="step-number">03</span>
              <StepIcon>
                <path d="M7 3h11l4 4v16H7V3Zm11 0v5h4M11 13h7m-7 4h7" />
              </StepIcon>
              <div>
                <h3>Teach your way of working</h3>
                <p>Provide instructions, documents, examples, and feedback.</p>
              </div>
            </li>
            <li>
              <span className="step-number">04</span>
              <StepIcon>
                <path d="M4 12s4-6 12-6 12 6 12 6-4 6-12 6S4 12 4 12Zm12 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
              </StepIcon>
              <div>
                <h3>Stay in charge</h3>
                <p>
                  Review outreach, approve key decisions, and check the work
                  before delivery.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section className="control-section section-pad">
          <div className="control-copy">
            <p className="eyebrow">Designed around you</p>
            <h2>
              You’re the founder.
              <br />
              <span>You stay in control.</span>
            </h2>
            <p>
              These are the principles guiding how we’re designing FoundAi—not
              claims about a finished product.
            </p>
          </div>
          <ul className="principles">
            <li>
              <span>
                <CheckIcon />
              </span>
              <p>
                You approve
                <br />
                <strong>important actions.</strong>
              </p>
            </li>
            <li>
              <span>
                <CheckIcon />
              </span>
              <p>
                You review work
                <br />
                <strong>before it reaches clients.</strong>
              </p>
            </li>
            <li>
              <span>
                <CheckIcon />
              </span>
              <p>
                You decide
                <br />
                <strong>how your business operates.</strong>
              </p>
            </li>
          </ul>
        </section>

        <section className="founder-section section-pad" id="about">
          <div className="founder-mark" aria-hidden="true">
            F<span>Ai</span>
          </div>
          <div className="founder-copy">
            <p className="eyebrow">A note from the founder</p>
            <h2>Building for people with something to offer.</h2>
            <p>
              Built by <strong>Thanachot Thetkan</strong>, a Computer
              Engineering student at King Mongkut’s University of Technology
              Thonburi in Thailand, with experience building AI, robotics, and
              remote-sensing projects.
            </p>
            <blockquote>
              “I’m building FoundAi to help more people turn their ideas and
              expertise into a business they own.”
            </blockquote>
            <p className="signature">
              Thanachot Thetkan <span>Founder, FoundAi</span>
            </p>
          </div>
        </section>

        <section className="waitlist-section section-pad" id="waitlist">
          <div className="waitlist-copy">
            <p className="eyebrow">Early access</p>
            <h2>Help shape the future of working for yourself.</h2>
            <p>
              Join the waitlist for development updates and opportunities to
              test early versions of FoundAi.
            </p>
          </div>
          <form className="waitlist-form" onSubmit={handleSubmit}>
            <div className="field-row">
              <label>
                Name
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Your name"
                />
              </label>
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label>
              What service would you want your AI business to offer?{" "}
              <span>(Optional)</span>
              <textarea
                name="service"
                rows={3}
                placeholder="Tell us what you’d love to build..."
              />
            </label>
            <div className="form-footer">
              <button className="button button-light" type="submit">
                Join the Waitlist <ArrowIcon />
              </button>
              <p role={submitted ? "status" : undefined}>
                {submitted
                  ? "Waitlist registration isn’t connected yet. Please check back soon."
                  : "Prototype form—registration isn’t connected yet."}
              </p>
            </div>
          </form>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <a className="wordmark footer-logo" href="#top" aria-label="FoundAi home">
            <Logo />
          </a>
          <p>Build a business with an AI crew.</p>
        </div>
        <nav aria-label="Footer navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <a href="#waitlist">Join the Waitlist</a>
          <Link to="/app">Open Workspace</Link>
        </nav>
        <a className="back-top" href="#top">
          Back to top <span>↑</span>
        </a>
        <p className="footer-meta">
          FoundAi · An early-stage company in development.
        </p>
      </footer>
    </div>
  )
}
