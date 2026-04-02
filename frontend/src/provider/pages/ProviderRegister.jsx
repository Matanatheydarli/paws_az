export default function ProviderRegister({ onSubmit, goLogin }) {
  const categories = ['Veterinary', 'Grooming', 'Training', 'Pet Hotel', 'Dog Walking', 'Pet Taxi', 'Other']

  return (
    <div className="pr-auth-page" style={{ alignItems: 'flex-start', paddingTop: '40px' }}>
      <div className="pr-auth-card" style={{ maxWidth: '600px' }}>
        <div className="pr-auth-logo">
          <span style={{ fontSize: '28px' }}>🐾</span>
          <strong>Paws.az Provider</strong>
        </div>
        <h2>Create provider account</h2>
        <p>Join Paws.az and start receiving bookings</p>

        <div className="pr-form-grid">

          <div className="pr-form-grid pr-form-row-2">
            <div className="pr-field">
              <label>Business / Clinic Name</label>
              <input type="text" placeholder="Paws Veterinary Clinic" />
            </div>
            <div className="pr-field">
              <label>Provider Category</label>
              <select>
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="pr-form-grid pr-form-row-2">
            <div className="pr-field">
              <label>Email address</label>
              <input type="email" placeholder="you@clinic.az" />
            </div>
            <div className="pr-field">
              <label>Phone number</label>
              <input type="tel" placeholder="+994 50 000 00 00" />
            </div>
          </div>

          <div className="pr-form-grid pr-form-row-2">
            <div className="pr-field">
              <label>Password</label>
              <input type="password" placeholder="Min. 8 characters" />
            </div>
            <div className="pr-field">
              <label>Confirm Password</label>
              <input type="password" placeholder="Repeat password" />
            </div>
          </div>

          <div className="pr-form-grid pr-form-row-2">
            <div className="pr-field">
              <label>City</label>
              <select>
                <option>Baku</option>
                <option>Ganja</option>
                <option>Sumqayit</option>
                <option>Other</option>
              </select>
            </div>
            <div className="pr-field">
              <label>Address</label>
              <input type="text" placeholder="Nizami Street 45" />
            </div>
          </div>

          <div className="pr-field">
            <label>Short Description</label>
            <textarea
              rows={3}
              placeholder="Tell us about your business, experience, and the services you offer..."
            />
          </div>

          <div className="pr-field">
            <label>Business Logo / Photo</label>
            <div style={{
              border: '2px dashed var(--pr-border)',
              borderRadius: '10px',
              padding: '24px',
              textAlign: 'center',
              background: 'var(--pr-bg)',
              cursor: 'pointer',
            }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>📷</div>
              <p style={{ fontSize: '14px', color: 'var(--pr-text-lt)' }}>Click to upload or drag and drop</p>
              <p style={{ fontSize: '12px', color: 'var(--pr-text-lt)', marginTop: '4px' }}>PNG, JPG up to 5MB</p>
            </div>
          </div>

        </div>

        <button
          className="pr-btn pr-btn-primary pr-btn-lg"
          style={{ width: '100%', marginTop: '20px' }}
          onClick={onSubmit}
        >
          Submit Application 🐾
        </button>

        <p style={{ fontSize: '12px', color: 'var(--pr-text-lt)', textAlign: 'center', marginTop: '12px', lineHeight: 1.6 }}>
          By applying you agree to our Terms of Service. We will review your application within 48 hours.
        </p>

        <div className="pr-auth-switch">
          Already have an account? <button onClick={goLogin}>Sign in</button>
        </div>
      </div>
    </div>
  )
}