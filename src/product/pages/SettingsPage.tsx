import { useState } from "react"
import { useNavigate } from "react-router"
import { PageHeader } from "@/product/components/ProductUI"
import { useProduct } from "@/product/state/ProductState"

export default function SettingsPage() {
  const { store, reset, saveCompany, storageAvailable } = useProduct()
  const navigate = useNavigate()
  const [confirming, setConfirming] = useState(false)

  return (
    <div className="product-page">
      <PageHeader
        eyebrow="Workspace settings"
        title="Local prototype controls."
        description="Nothing here is connected to authentication, payments, email, deployment, or an AI backend."
      />
      <div className="settings-grid">
        <section className="product-card">
          <p className="product-eyebrow">Company</p>
          <h2>{store.company?.name}</h2>
          {store.company?.isExample && <span className="product-status">Fictional example</span>}
          <label>Service description<textarea rows={4} value={store.company?.service ?? ""} onChange={(event) => store.company && saveCompany({ ...store.company, service: event.target.value })} /></label>
          <label>Target customers<textarea rows={4} value={store.company?.customers ?? ""} onChange={(event) => store.company && saveCompany({ ...store.company, customers: event.target.value })} /></label>
          <p className="form-note">Changes save automatically in this browser.</p>
        </section>
        <section className="product-card danger-zone">
          <p className="product-eyebrow">Local data</p>
          <h2>Reset prototype</h2>
          <p>
            Company details, playbook instructions, project briefs, events, and
            generated HTML versions are stored in localStorage. Uploaded binary
            files are never stored.
          </p>
          <p><strong>Storage status:</strong> {storageAvailable ? "Available" : "Unavailable"}</p>
          {confirming ? (
            <div className="confirm-reset">
              <strong>Delete all local prototype data?</strong>
              <div className="button-row">
                <button className="product-button danger" type="button" onClick={() => { reset(); navigate("/app") }}>Yes, reset everything</button>
                <button className="product-button secondary" type="button" onClick={() => setConfirming(false)}>Keep my data</button>
              </div>
            </div>
          ) : (
            <button className="product-button danger" type="button" onClick={() => setConfirming(true)}>Reset local prototype data</button>
          )}
        </section>
      </div>
    </div>
  )
}
