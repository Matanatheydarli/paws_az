import { useState } from 'react'

export default function ProviderServices({ services, setServices }) {
  const [showModal, setShowModal] = useState(false)
  const [editing,   setEditing]   = useState(null)
  const [form,      setForm]      = useState({ name: '', category: 'Veterinary', price: '', duration: '', description: '', img: '🩺', active: true })

  function openAdd() {
    setEditing(null)
    setForm({ name: '', category: 'Veterinary', price: '', duration: '', description: '', img: '🩺', active: true })
    setShowModal(true)
  }

  function openEdit(svc) {
    setEditing(svc)
    setForm({ ...svc })
    setShowModal(true)
  }

  function handleSave() {
    if (editing) {
      setServices((prev) => prev.map((s) => s.id === editing.id ? { ...s, ...form } : s))
    } else {
      const newSvc = { ...form, id: 'SV-' + Date.now(), bookings: 0, price: Number(form.price) }
      setServices((prev) => [...prev, newSvc])
    }
    setShowModal(false)
  }

  function handleDelete(id) {
    setServices((prev) => prev.filter((s) => s.id !== id))
  }

  function toggleActive(id) {
    setServices((prev) => prev.map((s) => s.id === id ? { ...s, active: !s.active } : s))
  }

  const emojis = ['🩺', '💉', '🦷', '✂️', '🛁', '🐶', '🏨', '🚗', '💊', '🧪', '🎓', '🐾']

  return (
    <div>
      <div className="pr-page-header">
        <div className="pr-page-header-left">
          <h1>My Services</h1>
          <p>{services.length} services · {services.filter((s) => s.active).length} active</p>
        </div>
        <button className="pr-btn pr-btn-primary pr-btn-lg" onClick={openAdd}>
          + Add Service
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {services.map((svc) => (
          <div className="pr-service-card" key={svc.id} style={{ opacity: svc.active ? 1 : 0.6 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div className="pr-service-icon">{svc.img}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="pr-toggle-wrap">
                  <button
                    className={'pr-toggle ' + (svc.active ? 'on' : 'off')}
                    onClick={() => toggleActive(svc.id)}
                  >
                    <div className="pr-toggle-thumb" />
                  </button>
                </div>
              </div>
            </div>
            <h4>{svc.name}</h4>
            <p>{svc.description}</p>
            <div className="pr-service-meta">
              <div className="pr-service-meta-item">⏱ {svc.duration}</div>
              <div className="pr-service-meta-item">📊 {svc.bookings} bookings</div>
            </div>
            <div className="pr-service-footer">
              <div className="pr-service-price">₼{svc.price}</div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button className="pr-btn pr-btn-outline pr-btn-sm" onClick={() => openEdit(svc)}>Edit</button>
                <button className="pr-btn pr-btn-danger  pr-btn-sm" onClick={() => handleDelete(svc.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* add / edit modal */}
      {showModal && (
        <div className="pr-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="pr-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pr-modal-header">
              <h3>{editing ? 'Edit Service' : 'Add New Service'}</h3>
              <button className="pr-modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="pr-modal-body">
              <div className="pr-form-grid" style={{ gap: '14px' }}>
                <div className="pr-field">
                  <label>Service Name</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. General Check-up" />
                </div>
                <div className="pr-form-grid pr-form-row-2">
                  <div className="pr-field">
                    <label>Category</label>
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                      {['Veterinary','Grooming','Training','Boarding','Walking','Transport'].map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="pr-field">
                    <label>Icon</label>
                    <select value={form.img} onChange={(e) => setForm({ ...form, img: e.target.value })}>
                      {emojis.map((e) => <option key={e} value={e}>{e}</option>)}
                    </select>
                  </div>
                </div>
                <div className="pr-form-grid pr-form-row-2">
                  <div className="pr-field">
                    <label>Price (₼)</label>
                    <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="35" />
                  </div>
                  <div className="pr-field">
                    <label>Duration</label>
                    <input type="text" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="30 min" />
                  </div>
                </div>
                <div className="pr-field">
                  <label>Description</label>
                  <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe this service..." />
                </div>
              </div>
            </div>
            <div className="pr-modal-footer">
              <button className="pr-btn pr-btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="pr-btn pr-btn-primary" onClick={handleSave}>{editing ? 'Save Changes' : 'Add Service'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}