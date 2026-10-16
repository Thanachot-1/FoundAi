import { type ChangeEvent, type FormEvent, useState } from "react"
import { AlexMini, PageHeader } from "@/product/components/ProductUI"
import { useProduct } from "@/product/state/ProductState"
import type { Playbook, ReferenceFile } from "@/product/types"

const formatSize = (bytes: number) =>
  bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(1)} KB`

export default function PlaybookPage() {
  const { store, savePlaybook, addReferences, removeReference } = useProduct()
  const [draft, setDraft] = useState<Playbook>(store.playbook)
  const [custom, setCustom] = useState("")
  const [saved, setSaved] = useState(false)

  function update(field: keyof Playbook, value: string) {
    setSaved(false)
    setDraft((current) => ({ ...current, [field]: value }))
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    savePlaybook({ ...draft, references: store.playbook.references })
    setSaved(true)
  }

  function addCustom() {
    if (!custom.trim()) return
    setDraft((current) => ({
      ...current,
      customInstructions: [...current.customInstructions, custom.trim()],
    }))
    setCustom("")
    setSaved(false)
  }

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? [])
    const references: ReferenceFile[] = await Promise.all(
      files.map(async (file) => {
        const isText =
          file.type.startsWith("text/") ||
          /\.(txt|md|csv)$/i.test(file.name)
        let textPreview: string | undefined
        if (isText && file.size <= 100_000) {
          textPreview = (await file.text()).slice(0, 1200)
        }
        return {
          id: crypto.randomUUID(),
          name: file.name,
          size: file.size,
          type: file.type || "Unknown type",
          textPreview,
        }
      }),
    )
    addReferences(references)
    event.target.value = ""
  }

  return (
    <div className="product-page">
      <PageHeader
        eyebrow="Alex’s playbook"
        title="Teach the way you work."
        description="This working guide is saved with each run. It guides Alex’s examples; it does not train or fine-tune a model."
      />
      <div className="playbook-grid">
        <form className="product-card playbook-form" onSubmit={submit}>
          <label>Tone of voice<textarea rows={4} value={draft.tone} onChange={(e) => update("tone", e.target.value)} placeholder="Warm, plain-spoken, confident..." /></label>
          <label>Design preferences<textarea rows={4} value={draft.designPreferences} onChange={(e) => update("designPreferences", e.target.value)} placeholder="Editorial layout, generous space..." /></label>
          <label>Required practices<textarea rows={4} value={draft.requiredPractices} onChange={(e) => update("requiredPractices", e.target.value)} placeholder="Accessible contrast, clear CTA..." /></label>
          <label>Things to avoid<textarea rows={4} value={draft.avoid} onChange={(e) => update("avoid", e.target.value)} placeholder="Jargon, unsupported claims..." /></label>
          <div className="custom-instructions">
            <label>Custom instruction<input value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="Add another working rule" /></label>
            <button type="button" className="product-button secondary" onClick={addCustom}>Add</button>
          </div>
          {draft.customInstructions.length > 0 && (
            <ul className="instruction-list">
              {draft.customInstructions.map((instruction, index) => (
                <li key={`${instruction}-${index}`}><span>{instruction}</span><button type="button" onClick={() => setDraft((current) => ({ ...current, customInstructions: current.customInstructions.filter((_, itemIndex) => itemIndex !== index) }))}>Remove</button></li>
              ))}
            </ul>
          )}
          <div className="save-row"><button className="product-button" type="submit">Save playbook</button>{saved && <span role="status">Saved locally</span>}</div>
        </form>
        <aside className="playbook-side">
          <section className="product-card">
            <AlexMini state="Uses this guide on the next run" />
          </section>
          <section className="product-card upload-card">
            <p className="product-eyebrow">References</p>
            <h2>Supporting files</h2>
            <p>
              Text previews are stored locally. For PDFs and other files, only
              file information is stored; no AI has read or understood them.
            </p>
            <label className="upload-button">
              Add references
              <input type="file" multiple onChange={upload} />
            </label>
            <div className="reference-list">
              {store.playbook.references.map((reference) => (
                <article key={reference.id}>
                  <div><strong>{reference.name}</strong><span>{reference.type} · {formatSize(reference.size)}</span></div>
                  <button type="button" onClick={() => removeReference(reference.id)}>Remove</button>
                  {reference.textPreview ? <pre>{reference.textPreview}</pre> : <small>File information only; content is not stored.</small>}
                </article>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}
