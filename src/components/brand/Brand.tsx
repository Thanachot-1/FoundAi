import type { Employee } from "@/data/employees"

export function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 6l4 4-4 4" />
    </svg>
  )
}

export function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 12 4 4L19 6" />
    </svg>
  )
}

export function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2c.6 5.7 4.3 9.4 10 10-5.7.6-9.4 4.3-10 10-.6-5.7-4.3-9.4-10-10 5.7-.6 9.4-4.3 10-10Z" />
    </svg>
  )
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <img
      className={compact ? "brand-logo brand-logo-compact" : "brand-logo"}
      src={`${import.meta.env.BASE_URL}foundai-logo.png`}
      alt="FoundAi"
    />
  )
}

export function Portrait({ variant }: { variant: Employee["variant"] }) {
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

export function EmployeeCard({
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
