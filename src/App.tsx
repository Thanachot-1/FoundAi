import { FormEvent, ReactNode, useState } from "react"

type Employee = {
  name: string
  role: string
  skills: string[]
  variant: "alex" | "maya" | "sam"
}

const employees: Employee[] = [
  {
    name: "Alex",
    role: "Software Developer",
    skills: ["Coding", "Testing", "Technical Documentation"],
    variant: "alex",
  },
  {
    name: "Maya",
    role: "Marketing Specialist",
    skills: ["Campaign Planning", "Copywriting", "Content Research"],
    variant: "maya",
  },
  {
    name: "Sam",
    role: "Customer Support Specialist",
    skills: ["Customer Communication", "FAQs", "Follow-ups"],
    variant: "sam",
  },
]

const navItems = [
  { label: "Vision", href: "#vision" },
  { label: "AI Employees", href: "#employees" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About", href: "#about" },
]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 6l4 4-4 4" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 12 4 4L19 6" />
    </svg>
  )
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2c.6 5.7 4.3 9.4 10 10-5.7.6-9.4 4.3-10 10-.6-5.7-4.3-9.4-10-10 5.7-.6 9.4-4.3 10-10Z" />
    </svg>
  )
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <img
      className={compact ? "brand-logo brand-logo-compact" : "brand-logo"}
      src="/foundai-logo.png"
      alt="FoundAi"
    />
  )
}

function Portrait({ variant }: { variant: Employee["variant"] }) {
  if (variant === "alex") {
    return (
      <svg
        className="portrait-svg"
        viewBox="0 0 320 300"
        role="img"
        aria-label="Illustrated portrait of Alex"
      >
        <path
          className="portrait-bg-accent"
          d="M30 236C54 133 108 61 207 43c56-10 88 21 91 79 4 73-31 136-100 159-66 22-185 24-168-45Z"
        />
        <circle className="skin" cx="165" cy="112" r="58" />
        <path
          className="hair dark"
          d="M111 110c-2-53 23-80 61-80 48 0 72 36 62 83-13-9-25-25-29-43-18 22-48 35-94 40Z"
        />
        <path
          className="ear skin"
          d="M109 110c-16-5-20 28-1 33m118-33c17-4 20 28 1 33"
        />
        <path className="face-line" d="M149 125c10 8 21 8 31 0" />
        <path className="eye" d="M139 106h9m35 0h9" />
        <path
          className="glasses"
          d="M125 96h38v24h-38zm48 0h38v24h-38zm-10 8h10"
        />
        <path className="neck skin" d="M146 157v31h39v-31" />
        <path
          className="hoodie"
          d="M72 286c4-73 35-112 83-112h22c52 0 82 39 86 112Z"
        />
        <path
          className="hoodie-detail"
          d="M142 177l23 28 24-28m-24 28v62m-15-44-21 36m51-36 21 36"
        />
      </svg>
    )
  }

  if (variant === "maya") {
    return (
      <svg
        className="portrait-svg"
        viewBox="0 0 320 300"
        role="img"
        aria-label="Illustrated portrait of Maya"
      >
        <path
          className="portrait-bg-accent"
          d="M28 190C47 89 130 31 221 54c66 17 91 82 60 148-30 64-92 90-164 81-70-9-101-31-89-93Z"
        />
        <path
          className="hair maya-hair"
          d="M102 126c-7-52 17-94 66-97 53-3 88 37 78 101l-19 71H98Z"
        />
        <circle className="skin maya-skin" cx="170" cy="113" r="57" />
        <path
          className="hair maya-hair"
          d="M112 98c2-42 24-64 61-64 39 0 63 28 62 68-24-12-42-28-52-49-13 23-35 37-71 45Z"
        />
        <path className="eye" d="M143 109h9m37 0h9" />
        <path className="face-line" d="M153 132c11 9 24 9 35-1" />
        <path className="neck maya-skin" d="M151 157v32h40v-32" />
        <path
          className="maya-shirt"
          d="M67 286c8-73 40-111 91-111h24c52 0 85 38 92 111Z"
        />
        <path
          className="shirt-line"
          d="M136 180c6 19 18 29 35 29 16 0 28-10 35-29"
        />
        <path className="earring" d="M111 124v18m118-18v18" />
      </svg>
    )
  }

  return (
    <svg
      className="portrait-svg"
      viewBox="0 0 320 300"
      role="img"
      aria-label="Illustrated portrait of Sam"
    >
      <path
        className="portrait-bg-accent"
        d="M34 220C45 124 108 55 197 49c63-4 99 33 98 96-1 73-49 127-120 140-72 13-149 7-141-65Z"
      />
      <circle className="skin sam-skin" cx="165" cy="112" r="58" />
      <path
        className="hair sam-hair"
        d="M107 111c-5-51 18-81 60-81 45 0 70 30 65 81-16-24-38-39-66-45-13 24-32 39-59 45Z"
      />
      <path className="eye" d="M139 109h9m35 0h9" />
      <path className="face-line" d="M148 131c13 12 28 12 42 0" />
      <path className="neck sam-skin" d="M146 158v31h39v-31" />
      <path
        className="sam-shirt"
        d="M67 286c7-72 39-111 90-111h20c55 0 88 39 94 111Z"
      />
      <path
        className="shirt-line"
        d="M139 179c5 18 15 29 27 29 13 0 23-11 29-29"
      />
      <path
        className="headset"
        d="M111 125v-14c0-37 21-63 55-63s56 26 56 63v35c0 17-12 26-32 26m-81-52h14v31h-14zm100 0h14v31h-14z"
      />
      <circle className="headset-dot" cx="183" cy="171" r="5" />
    </svg>
  )
}

function EmployeeCard({
  employee,
  compact = false,
  className = "",
}: {
  employee: Employee
  compact?: boolean
  className?: string
}) {
  return (
    <article
      className={`employee-card employee-${employee.variant} ${
        compact ? "employee-card-compact" : ""
      } ${className}`}
    >
      <div className="card-topline">
        <Logo compact />
        <span className="concept-label">Concept profile</span>
      </div>
      <div className="portrait-wrap">
        <Portrait variant={employee.variant} />
        <span className="employee-label">
          <SparkIcon /> AI Employee
        </span>
      </div>
      <div className="card-copy">
        <h3>{employee.name}</h3>
        <p>{employee.role}</p>
        <ul aria-label={`${employee.name}'s skills`}>
          {employee.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

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

export default function App() {
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
