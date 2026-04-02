import { useState } from 'react'
import { MOCK_PROVIDER } from '../data/mockData'

export default function ProviderProfile() {
  const [form, setForm] = useState({ ...MOCK_PROVIDER })
  const [saved, setSaved] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div>
      <div className="pr-page-header">
        <div className="pr-page-header-left">
          <h1>Profile Settings</h1>
          <p>Manage your business information and public profile</p>
        </div>
        <button className="pr-btn pr-btn-primary pr-btn-lg" onClick={handleSave}>
          {saved ? '✅ Saved!' : 'Save Changes'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px' }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* business info */}
          <div className="pr-card">
            <div className="pr-card-header"><h3>Business Information</h3></div>
            <div className="pr-card-body">
              <div className="pr-form-grid" style={{ gap: '14px' }}>
                <div className="pr-form-grid pr-form-row-2">
                  <div className="pr-field">
                    <label>Business Name</label>
                    <input name="businessName" value={form.businessName} onChange={handleChange} />
                  </div>
                  <div className="pr-field">
                    <label>Category</label>
                    <select name="category" value={form.category} onChange={handleChange}>
                      {['Veterinary','Grooming','Training','Pet Hotel','Dog Walking','Pet Taxi'].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="pr-field">
                  <label>Description</label>
                  <textarea name="description" rows={4} value={form.description} onChange={handleChange} />
                </div>
                <div className="pr-form-grid pr-form-row-2">
                  <div className="pr-field">
                    <label>Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} />
                  </div>
                  <div className="pr-field">
                    <label>Phone</label>
                    <input name="phone" value={form.phone} onChange={handleChange} />
                  </div>
                </div>
                <div className="pr-form-grid pr-form-row-2">
                  <div className="pr-field">
                    <label>City</label>
                    <input name="city" value={form.city} onChange={handleChange} />
                  </div>
                  <div className="pr-field">
                    <label>Address</label>
                    <input name="address" value={form.address} onChange={handleChange} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* social links */}
          <div className="pr-card">
            <div className="pr-card-header"><h3>Social Links</h3></div>
            <div className="pr-card-body">
              <div className="pr-form-grid" style={{ gap: '12px' }}>
                {['Instagram','Facebook','WhatsApp','Website'].map((s) => (
                  <div className="pr-field" key={s}>
                    <label>{s}</label>
                    <input type="text" placeholder={s === 'Website' ? 'https://yourclinic.az' : '@yourhandle'} />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* right col */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* logo */}
          <div className="pr-card">
            <div className="pr-card-header"><h3>Business Logo</h3></div>
            <div className="pr-card-body" style={{ textAlign: 'center' }}>
              <div style={{
                width: '100px', height: '100px',
                borderRadius: '20px',
                background: 'var(--pr-green-lt)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '48px', margin: '0 auto 16px',
                border: '2px dashed var(--pr-green)',
              }}>
                {form.avatar}
              </div>
              <button className="pr-btn pr-btn-outline" style={{ width: '100%' }}>
                📷 Upload Logo
              </button>
              <p style={{ fontSize: '12px', color: 'var(--pr-text-lt)', marginTop: '8px' }}>JPG or PNG, max 2MB</p>
            </div>
          </div>

          {/* verification */}
          <div className="pr-card">
            <div className="pr-card-header"><h3>Account Status</h3></div>
            <div className="pr-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: 'var(--pr-green-lt)', borderRadius: '10px' }}>
                <span style={{ fontSize: '20px' }}>✅</span>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--pr-green-dk)' }}>Verified Provider</p>
                  <p style={{ fontSize: '12px', color: 'var(--pr-text-lt)' }}>Your account is verified</p>
                </div>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--pr-text-mid)', lineHeight: 1.7 }}>
                <p>⭐ Rating: <strong>{form.rating}</strong></p>
                <p>💬 Reviews: <strong>{form.totalReviews}</strong></p>
                <p>📅 Joined: <strong>{form.joinedDate}</strong></p>
              </div>
            </div>
          </div>

          {/* danger zone */}
          <div className="pr-card" style={{ border: '1.5px solid #fde8e8' }}>
            <div className="pr-card-header" style={{ borderColor: '#fde8e8' }}><h3 style={{ color: 'var(--pr-coral)' }}>Danger Zone</h3></div>
            <div className="pr-card-body">
              <p style={{ fontSize: '13px', color: 'var(--pr-text-lt)', marginBottom: '12px', lineHeight: 1.6 }}>
                These actions are permanent and cannot be undone.
              </p>
              <button className="pr-btn pr-btn-danger" style={{ width: '100%' }}>Deactivate Account</button>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}