import { useState } from 'react'

export default function BecomeProvider({ setPage }) {
  const [step, setStep] = useState(1)
  const [category, setCategory] = useState('')

  const categories = [
    { id: 'vet',      icon: '🩺', label: 'Veterinary' },
    { id: 'grooming', icon: '✂️', label: 'Grooming' },
    { id: 'training', icon: '🎓', label: 'Training' },
    { id: 'sitting',  icon: '🏠', label: 'Pet Sitting' },
    { id: 'boarding', icon: '🏨', label: 'Boarding' },
    { id: 'taxi',     icon: '🚗', label: 'Pet Taxi' },
  ]

  const perks = [
    { icon: '💰', title: 'Earn on your schedule', desc: 'Set your own hours and availability. Work as much or as little as you want.' },
    { icon: '🐾', title: 'Reach 4,800+ pet owners', desc: 'Instantly connect with verified pet owners actively looking for services in Baku.' },
    { icon: '⭐', title: 'Build your reputation', desc: 'Collect reviews, grow your profile, and become a top-rated provider on the platform.' },
    { icon: '🛡️', title: 'Secure payments', desc: 'Get paid safely through Paws.az. No chasing clients, no cash handling required.' },
    { icon: '📱', title: 'Easy dashboard', desc: 'Manage all bookings, messages, and earnings from one simple dashboard.' },
    { icon: '🤝', title: 'Dedicated support', desc: 'Our team is here to help you grow your pet care business every step of the way.' },
  ]

  const steps = [
    { num: 1, title: 'Create your profile', desc: 'Tell us about yourself, your experience, and the services you offer.' },
    { num: 2, title: 'Get verified',         desc: 'We review your credentials and approve your provider account within 48h.' },
    { num: 3, title: 'Start earning',        desc: 'Go live, receive bookings, and start building your pet care business.' },
  ]

  return (
    <div className="bp-page">

      {/* ── NAVBAR ── */}
      <header className="navbar">
        <button
          className="navbar-logo"
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
          onClick={() => setPage('home')}
        >
          🐾 Paws.az
        </button>
        <nav className="navbar-nav">
          <a href="#" onClick={() => setPage('home')}>Home</a>
          <a href="#">Shop</a>
          <a href="#" onClick={() => setPage('services')}>Services</a>
          <a href="#">Care &amp; Donate</a>
        </nav>
        <div className="navbar-actions">
          <button className="icon-btn">🔍</button>
          <button className="icon-btn">🤍</button>
          <button className="icon-btn">🛒</button>
          <button className="icon-btn" onClick={() => setPage('dashboard')}>👤</button>
          <button className="btn-primary" onClick={() => setPage('login')}>Sign in</button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="bp-hero">
        <div className="bp-hero-inner">
          <div className="bp-hero-tag">
            <span className="tag-dot" />
            Join 320+ verified providers
          </div>
          <h1>Turn your passion<br />into a <em>business</em></h1>
          <p>
            Join Azerbaijan's fastest-growing pet care platform.
            Reach thousands of pet owners, set your own schedule, and earn doing what you love.
          </p>
          <div className="bp-hero-ctas">
            <button className="btn-primary" style={{ padding: '16px 36px', fontSize: '16px' }}
              onClick={() => document.getElementById('bp-form').scrollIntoView({ behavior: 'smooth' })}>
              Apply now — it's free →
            </button>
            <button className="btn-outline" style={{ padding: '16px 28px', fontSize: '15px' }}
              onClick={() => setPage('home')}>
              ← Back to home
            </button>
          </div>

          {/* mini stats */}
          <div className="bp-hero-stats">
            <div className="bp-hero-stat">
              <h3>₼2,400+</h3>
              <p>Avg. monthly earnings</p>
            </div>
            <div className="bp-hero-stat">
              <h3>48h</h3>
              <p>Approval time</p>
            </div>
            <div className="bp-hero-stat">
              <h3>0%</h3>
              <p>Commission first month</p>
            </div>
            <div className="bp-hero-stat">
              <h3>4.8★</h3>
              <p>Provider satisfaction</p>
            </div>
          </div>
        </div>

        {/* hero image collage */}
        <div className="bp-hero-visual">
          <div className="bp-img-main">
            <img src="https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=600&q=80" alt="Groomer" />
          </div>
          <div className="bp-img-top">
            <img src="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=400&q=80" alt="Vet" />
          </div>
          <div className="bp-img-bottom">
            <img src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80" alt="Trainer" />
          </div>
          <div className="bp-visual-badge">
            <span style={{ fontSize: '22px' }}>🐾</span>
            <div>
              <strong>New booking!</strong>
              <p>Grooming · Today 2PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bp-section bp-how">
        <div className="bp-section-inner">
          <p className="section-eyebrow" style={{ textAlign: 'center' }}>Simple process</p>
          <h2 className="bp-section-title">How it <em>works</em></h2>
          <div className="bp-steps">
            {steps.map((s, i) => (
              <div className="bp-step" key={s.num}>
                <div className="bp-step-num">{s.num}</div>
                {i < steps.length - 1 && <div className="bp-step-line" />}
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PERKS ── */}
      <section className="bp-section bp-perks-section">
        <div className="bp-section-inner">
          <p className="section-eyebrow" style={{ textAlign: 'center' }}>Why join us</p>
          <h2 className="bp-section-title">Everything you <em>need</em> to succeed</h2>
          <div className="bp-perks-grid">
            {perks.map(p => (
              <div className="bp-perk-card" key={p.title}>
                <span className="bp-perk-icon">{p.icon}</span>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bp-section bp-testimonials">
        <div className="bp-section-inner">
          <p className="section-eyebrow" style={{ textAlign: 'center' }}>Provider stories</p>
          <h2 className="bp-section-title">Loved by <em>providers</em></h2>
          <div className="bp-testi-grid">
            {[
              { name: 'Aynur I.', role: 'Master Groomer • 2 years on Paws.az', avatar: '✂️', text: 'Since joining Paws.az my bookings doubled in the first month. The platform is so easy to use and the clients are wonderful.' },
              { name: 'Dr. Eldar M.', role: 'Veterinarian • 3 years on Paws.az', avatar: '🩺', text: 'I love how Paws.az handles all the admin — payments, scheduling, reminders. I just focus on caring for animals.' },
              { name: 'Kamran R.', role: 'Dog Trainer • 1 year on Paws.az', avatar: '🎓', text: 'The support team helped me set up my profile and within a week I had my first 5 clients. Highly recommend!' },
            ].map(t => (
              <div className="bp-testi-card" key={t.name}>
                <p className="bp-testi-text">"{t.text}"</p>
                <div className="bp-testi-author">
                  <div className="bp-testi-avatar">{t.avatar}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <p>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLICATION FORM ── */}
      <section className="bp-section bp-form-section" id="bp-form">
        <div className="bp-section-inner">
          <p className="section-eyebrow" style={{ textAlign: 'center' }}>Get started today</p>
          <h2 className="bp-section-title">Apply to become a <em>provider</em></h2>

          <div className="bp-form-card">

            {/* step indicator */}
            <div className="bp-form-steps">
              {['Your info', 'Service type', 'Experience'].map((s, i) => (
                <div key={s} className={`bp-form-step${step === i + 1 ? ' active' : step > i + 1 ? ' done' : ''}`}>
                  <div className="bp-form-step-dot">{step > i + 1 ? '✓' : i + 1}</div>
                  <span>{s}</span>
                </div>
              ))}
            </div>

            {/* step 1 */}
            {step === 1 && (
              <div className="bp-form-body">
                <div className="bp-form-row">
                  <div className="login-field">
                    <label>First name</label>
                    <input type="text" placeholder="Leyla" />
                  </div>
                  <div className="login-field">
                    <label>Last name</label>
                    <input type="text" placeholder="Huseynova" />
                  </div>
                </div>
                <div className="login-field">
                  <label>Email address</label>
                  <input type="email" placeholder="you@example.com" />
                </div>
                <div className="login-field">
                  <label>Phone number</label>
                  <input type="tel" placeholder="+994 50 000 00 00" />
                </div>
                <div className="login-field">
                  <label>City / District</label>
                  <input type="text" placeholder="Baku, Sabail" />
                </div>
                <button className="bp-next-btn" onClick={() => setStep(2)}>
                  Continue →
                </button>
              </div>
            )}

            {/* step 2 */}
            {step === 2 && (
              <div className="bp-form-body">
                <p style={{ fontSize: '15px', color: 'var(--text-mid)', marginBottom: '20px' }}>
                  Select the service category you want to offer:
                </p>
                <div className="bp-category-grid">
                  {categories.map(c => (
                    <button
                      key={c.id}
                      className={`bp-category-btn${category === c.id ? ' selected' : ''}`}
                      onClick={() => setCategory(c.id)}
                    >
                      <span>{c.icon}</span>
                      {c.label}
                    </button>
                  ))}
                </div>
                <div className="bp-form-nav">
                  <button className="bp-back-btn" onClick={() => setStep(1)}>← Back</button>
                  <button className="bp-next-btn" onClick={() => setStep(3)} disabled={!category}>
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* step 3 */}
            {step === 3 && (
              <div className="bp-form-body">
                <div className="login-field">
                  <label>Years of experience</label>
                  <select style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #d8e8dc', borderRadius: '8px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', background: 'white', outline: 'none' }}>
                    <option>Less than 1 year</option>
                    <option>1–2 years</option>
                    <option>3–5 years</option>
                    <option>5+ years</option>
                  </select>
                </div>
                <div className="login-field">
                  <label>Certifications or qualifications (optional)</label>
                  <input type="text" placeholder="e.g. City &amp; Guilds Grooming Level 3" />
                </div>
                <div className="login-field">
                  <label>Tell us about yourself</label>
                  <textarea
                    placeholder="Describe your experience, approach, and why you love working with animals..."
                    style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #d8e8dc', borderRadius: '8px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', background: 'white', outline: 'none', minHeight: '110px', resize: 'vertical' }}
                  />
                </div>
                <div className="bp-form-nav">
                  <button className="bp-back-btn" onClick={() => setStep(2)}>← Back</button>
                  <button
                    className="bp-next-btn"
                    style={{ background: 'var(--green-500)' }}
                    onClick={() => setStep(4)}
                  >
                    Submit application 🐾
                  </button>
                </div>
              </div>
            )}

            {/* success */}
            {step === 4 && (
              <div className="bp-success">
                <div className="bp-success-icon">🎉</div>
                <h3>Application submitted!</h3>
                <p>
                  Thank you for applying to Paws.az. Our team will review your profile
                  and get back to you within <strong>48 hours</strong>.
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button className="btn-primary" onClick={() => setPage('home')}>
                    Back to home
                  </button>
                  <button className="btn-outline" onClick={() => setPage('login')}>
                    Sign in →
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: 'var(--text-dark)', padding: '40px clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', fontWeight: 700, color: 'var(--green-300)' }}>
            🐾 Paws.az
          </div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
            © 2026 Paws.az. All rights reserved. Made with 🐾 in Baku, Azerbaijan.
          </p>
          <button className="btn-outline" style={{ borderColor: 'var(--green-400)', color: 'var(--green-300)' }}
            onClick={() => setPage('home')}>
            ← Back to home
          </button>
        </div>
      </footer>

    </div>
  )
}