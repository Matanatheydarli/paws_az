import React from 'react'

export default function Signup({ goTo }) {
  return (
    <div className="page page-signup active">
      <div className="auth-page">
        <div className="auth-card">
          <a className="logo" href="#home" onClick={(e) => { e.preventDefault(); goTo('home') }}>
            <span className="logo-paw">🐾</span> Paws.az
          </a>
          <h2>Create account</h2>
          <p className="auth-sub">Join thousands of happy pet owners in Azerbaijan</p>

          <div className="social-login">
            <button className="social-login-btn" type="button">🌐 Google</button>
            <button className="social-login-btn" type="button">🍎 Apple</button>
          </div>

          <div className="auth-divider"><span>or sign up with email</span></div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="form-field">
              <label>First name</label>
              <div className="input-wrap">
                <span className="input-icon">👤</span>
                <input type="text" placeholder="Leyla" />
              </div>
            </div>
            <div className="form-field">
              <label>Last name</label>
              <input type="text" placeholder="Huseynova" />
            </div>
          </div>

          <div className="form-field">
            <label>Email address</label>
            <div className="input-wrap">
              <span className="input-icon">✉️</span>
              <input type="email" placeholder="you@example.com" />
            </div>
          </div>

          <div className="form-field">
            <label>Password</label>
            <div className="input-wrap">
              <span className="input-icon">🔒</span>
              <input type="password" placeholder="Min. 8 characters" />
            </div>
          </div>

          <div className="form-field" style={{ marginBottom: 20 }}>
            <label>I am a...</label>
            <select
              style={{
                width: '100%',
                padding: '13px 16px',
                border: '1.5px solid var(--green-200)',
                borderRadius: 'var(--radius-sm)',
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 14,
                background: 'var(--beige-50)',
                outline: 'none',
              }}
            >
              <option>Pet owner</option>
              <option>Service provider</option>
              <option>Both</option>
            </select>
          </div>

          <button
            className="btn-primary"
            type="button"
            style={{ width: '100%', justifyContent: 'center', padding: 15 }}
            onClick={() => goTo('dashboard')}
          >
            Create my account 🐾
          </button>

          <p style={{ fontSize: 12, color: 'var(--text-light)', textAlign: 'center', marginTop: 14, lineHeight: 1.6 }}>
            By signing up, you agree to our{' '}
            <a href="#terms" onClick={(e) => e.preventDefault()} style={{ color: 'var(--green-500)', textDecoration: 'none' }}>
              Terms
            </a>{' '}
            and{' '}
            <a href="#privacy" onClick={(e) => e.preventDefault()} style={{ color: 'var(--green-500)', textDecoration: 'none' }}>
              Privacy Policy
            </a>.
          </p>

          <p className="auth-switch">
            Already have an account?{' '}
            <a href="#login" onClick={(e) => { e.preventDefault(); goTo('login') }}>
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}