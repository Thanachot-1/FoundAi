export type Employee = {
  name: string
  role: string
  skills: string[]
  variant: "alex" | "maya" | "sam"
}

export const employees: Employee[] = [
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
