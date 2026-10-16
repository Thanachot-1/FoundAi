import type { ReactNode } from "react"
import { Portrait } from "@/components/brand/Brand"
import type { RunStatus } from "@/product/types"

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <header className="product-page-header">
      <div>
        <p className="product-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action}
    </header>
  )
}

export function StatusBadge({ status }: { status: RunStatus }) {
  return (
    <span className={`product-status product-status-${status}`}>
      {status.replace("-", " ")}
    </span>
  )
}

export function AlexMini({ state }: { state?: string }) {
  return (
    <div className="alex-mini">
      <div className="alex-mini-portrait">
        <Portrait variant="alex" />
      </div>
      <div>
        <strong>Alex</strong>
        <span>AI Employee · Website Developer</span>
        {state && <small>{state}</small>}
      </div>
    </div>
  )
}

export function EmptyState({
  title,
  copy,
  action,
}: {
  title: string
  copy: string
  action?: ReactNode
}) {
  return (
    <div className="product-empty">
      <span aria-hidden="true">F·Ai</span>
      <h2>{title}</h2>
      <p>{copy}</p>
      {action}
    </div>
  )
}
