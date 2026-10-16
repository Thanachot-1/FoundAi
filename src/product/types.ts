export type RunStatus =
  | "draft"
  | "generating"
  | "awaiting-review"
  | "approved"
  | "failed"
  | "canceled"
  | "interrupted"

export type Company = {
  name: string
  service: string
  customers: string
  isExample: boolean
}

export type ReferenceFile = {
  id: string
  name: string
  size: number
  type: string
  textPreview?: string
}

export type Playbook = {
  tone: string
  designPreferences: string
  requiredPractices: string
  avoid: string
  customInstructions: string[]
  references: ReferenceFile[]
}

export type ProjectBrief = {
  title: string
  clientName: string
  description: string
  audience: string
  goal: string
  sections: string
  colors: string
  contact: string
  additionalInstructions: string
}

export type ActivityEvent = {
  id: string
  at: string
  message: string
  kind?: "normal" | "error"
}

export type ProjectVersion = {
  id: string
  number: number
  createdAt: string
  html: string
  revisionNote?: string
  briefSnapshot: ProjectBrief
  playbookSnapshot: Playbook
  approvedAt?: string
}

export type Project = {
  id: string
  brief: ProjectBrief
  status: RunStatus
  createdAt: string
  updatedAt: string
  events: ActivityEvent[]
  versions: ProjectVersion[]
  activeVersionId?: string
}

export type PrototypeStore = {
  version: 1
  company: Company | null
  playbook: Playbook
  projects: Project[]
}

export type RevisionOption = "accent-blue" | "accent-coral" | "add-contact"
