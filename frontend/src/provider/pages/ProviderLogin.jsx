export default function ProviderLogin({ onLogin, goRegister }) {
  return (
    <div className="pr-auth-page">
      <div className="pr-auth-card">
        <div className="pr-auth-logo">
          <span style={{ fontSize: '28px' }}>🐾</span>
          <strong>Paws.az Provider</strong>
        </div>
        <h2>Welcome back</h2>
        <p>Sign in to your provider account</p>

        <div className="pr-form-grid" style={{ gap: '14px' }}>
          <div className="pr-field">
            <label>Email address</label>
            <input type="email" placeholder="you@clinic.az" />
          </div>
          <div className="pr-field">
            <label>Password</label>
            <input type="password" placeholder="••••••••" />
          </div>
        </div>

        <div style={{ textAlign: 'right', margin: '10px 0 20px' }}>
          <button style={{ background: 'none', border: 'none', color: 'var(--pr-green)', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
            Forgot password?
          </button>
        </div>

        <button
          className="pr-btn pr-btn-primary pr-btn-lg"
          style={{ width: '100%' }}
          onClick={onLogin}
        >
          Sign in to Provider Panel
        </button>

        <div className="pr-auth-switch">
          Don't have a provider account?{' '}
          <button onClick={goRegister}>Apply now →</button>
        </div>
      </div>
    </div>
  )
}