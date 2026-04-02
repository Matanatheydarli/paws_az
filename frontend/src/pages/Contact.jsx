import { useState } from 'react'
import Navbar from '../components/Navbar'

export default function Contact({ setPage }) {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', subject: '', message: '' })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit() {
    setSent(true)
  }

  const info = [
    {
      icon: '📍',
      title: 'Our office',
      lines: ['28 May Street', 'Baku, Azerbaijan AZ1000'],
    },
    {
      icon: '📞',
      title: 'Phone',
      lines: ['+994 12 555 01 23', '+994 50 555 01 23'],
    },
    {
      icon: '✉️',
      title: 'Email',
      lines: ['hello@paws.az', 'support@paws.az'],
    },
    {
      icon: '⏰',
      title: 'Working hours',
      lines: ['Mon – Fri: 9:00 AM – 8:00 PM', 'Sat – Sun: 10:00 AM – 6:00 PM'],
    },
  ]

  const faqs = [
    { q: 'How do I book a service?', a: 'Simply browse our services, pick a provider, choose a time slot and confirm your booking. You will receive a confirmation email instantly.' },
    { q: 'Can I cancel or reschedule?', a: 'Yes. You can cancel or reschedule up to 24 hours before your appointment from your dashboard with no charge.' },
    { q: 'How do I become a provider?', a: 'Click Become a Provider in the homepage, fill in the application form, and our team will review it within 48 hours.' },
    { q: 'Are all providers verified?', a: 'Yes. Every provider goes through a background check and credential verification before being approved on the platform.' },
  ]

  return (
    <div className="contact-page">

      <Navbar setPage={setPage} activePage="contact" />

      {/* ── HERO ── */}
      <section className="contact-hero">
        <div className="contact-hero-inner">
          <p className="section-eyebrow" style={{ textAlign: 'center' }}>We are here for you</p>
          <h1>Get in <em>touch</em></h1>
          <p>Have a question, partnership idea, or just want to say hello? Our pet-loving team is always happy to hear from you.</p>
        </div>
        <div className="contact-hero-cards">
          <div className="contact-hero-card">
            <span>💬</span>
            <h4>Live chat</h4>
            <p>Average reply in 2 min</p>
          </div>
          <div className="contact-hero-card">
            <span>📞</span>
            <h4>Call us</h4>
            <p>Mon–Fri 9AM–8PM</p>
          </div>
          <div className="contact-hero-card">
            <span>✉️</span>
            <h4>Email us</h4>
            <p>Reply within 24h</p>
          </div>
        </div>
      </section>

      {/* ── MAIN LAYOUT ── */}
      <section className="contact-main">

        {/* LEFT — info */}
        <div className="contact-info-col">
          <h2>Contact <em>information</em></h2>
          <p className="contact-info-sub">
            Reach out through any channel below or fill in the form and we will get back to you as soon as possible.
          </p>

          <div className="contact-info-list">
            {info.map((item) => (
              <div className="contact-info-item" key={item.title}>
                <div className="contact-info-icon">{item.icon}</div>
                <div>
                  <h5>{item.title}</h5>
                  {item.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* social */}
          <div className="contact-socials">
            <p>Follow us</p>
            <div className="contact-social-row">
              <a className="contact-social-btn" href="#">𝕏</a>
              <a className="contact-social-btn" href="#">in</a>
              <a className="contact-social-btn" href="#">📷</a>
              <a className="contact-social-btn" href="#">▶</a>
            </div>
          </div>

          {/* map placeholder */}
          <div className="contact-map">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=700&q=80"
              alt="Map"
            />
            <div className="contact-map-pin">📍 Paws.az HQ</div>
          </div>
        </div>

        {/* RIGHT — form */}
        <div className="contact-form-col">
          <div className="contact-form-card">

            {!sent ? (
              <>
                <h3>Send us a message</h3>
                <p>Fill in the form below and we will be in touch shortly.</p>

                <div className="contact-form-row">
                  <div className="contact-field">
                    <label>First name</label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Leyla"
                      value={form.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="contact-field">
                    <label>Last name</label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Huseynova"
                      value={form.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="contact-field">
                  <label>Email address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="contact-field">
                  <label>Subject</label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                  >
                    <option value="">Select a topic...</option>
                    <option>General inquiry</option>
                    <option>Booking support</option>
                    <option>Become a provider</option>
                    <option>Report an issue</option>
                    <option>Partnership</option>
                    <option>Press & Media</option>
                  </select>
                </div>

                <div className="contact-field">
                  <label>Message</label>
                  <textarea
                    name="message"
                    placeholder="Tell us how we can help..."
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                  />
                </div>

                <button className="contact-submit-btn" onClick={handleSubmit}>
                  Send message 🐾
                </button>

                <p className="contact-privacy">
                  By submitting this form you agree to our Privacy Policy. We never share your data.
                </p>
              </>
            ) : (
              <div className="contact-success">
                <div className="contact-success-icon">🎉</div>
                <h3>Message sent!</h3>
                <p>
                  Thank you for reaching out, <strong>{form.firstName || 'friend'}</strong>!
                  Our team will get back to you at <strong>{form.email || 'your email'}</strong> within 24 hours.
                </p>
                <button
                  className="contact-submit-btn"
                  onClick={() => setSent(false)}
                >
                  Send another message
                </button>
                <button
                  className="btn-outline"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}
                  onClick={() => setPage('home')}
                >
                  Back to home
                </button>
              </div>
            )}

          </div>
        </div>

      </section>

      {/* ── FAQ ── */}
      <section className="contact-faq-section">
        <div className="contact-faq-inner">
          <p className="section-eyebrow" style={{ textAlign: 'center' }}>Quick answers</p>
          <h2 className="contact-faq-title">Frequently asked <em>questions</em></h2>
          <div className="contact-faq-grid">
            {faqs.map((faq) => (
              <div className="contact-faq-card" key={faq.q}>
                <h4>{faq.q}</h4>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <p style={{ fontSize: '15px', color: 'var(--text-mid)', marginBottom: '16px' }}>
              Still have questions?
            </p>
            <button className="btn-primary" style={{ padding: '14px 32px', fontSize: '15px' }}>
              View full FAQ →
            </button>
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
          <button
            className="btn-outline"
            style={{ borderColor: 'var(--green-400)', color: 'var(--green-300)' }}
            onClick={() => setPage('home')}
          >
            Back to home
          </button>
        </div>
      </footer>

    </div>
  )
}