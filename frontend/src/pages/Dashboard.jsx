import { useState } from 'react'

export default function Dashboard({ setPage }) {
  const [activeNav, setActiveNav] = useState('dashboard')

  const sideNav = [
    { id: 'orders',    icon: '📦', label: 'Orders' },
    { id: 'reservations', icon: '📅', label: 'Reservations' },
    { id: 'wishlist',  icon: '🤍', label: 'Wishlist' },
    { id: 'addresses', icon: '📍', label: 'Addresses' },
    { id: 'payment',   icon: '💳', label: 'Payment methods' },
    { id: 'settings',  icon: '⚙️', label: 'Settings' },
  ]

  return (
    <div className="dash-page">

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
          <button className="icon-btn" style={{ background: 'var(--green-500)', color: 'white' }}>👤</button>
          <button className="icon-btn">⚙️</button>
        </div>
      </header>

      <div className="dash-layout">

        {/* ── SIDEBAR ── */}
        <aside className="dash-sidebar">

          {/* user card */}
          <div className="dash-user-card">
            <div className="dash-user-avatar">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
                alt="Mina Mammadova"
              />
            </div>
            <div className="dash-user-info">
              <span className="dash-hello">Hello,</span>
              <strong>Mina Mammadova</strong>
            </div>
          </div>

          <button className="dash-profile-btn">My profile</button>
          <button className="dash-profile-btn">My Pet</button>

          <div className="dash-divider" />

          <nav className="dash-sidenav">
            {sideNav.map(item => (
              <button
                key={item.id}
                className={`dash-sidenav-item${activeNav === item.id ? ' active' : ''}`}
                onClick={() => setActiveNav(item.id)}
              >
                <span className="dash-sidenav-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
            <button
              className="dash-sidenav-item dash-logout"
              onClick={() => setPage('home')}
            >
              <span className="dash-sidenav-icon">🚪</span>
              Logout
            </button>
          </nav>
        </aside>

        {/* ── MAIN ── */}
        <main className="dash-main">

          {/* top row */}
          <div className="dash-top-row">

            {/* upcoming reservation */}
            <div className="dash-upcoming">
              <h3 className="dash-section-title">Upcoming reservation</h3>
              <div className="dash-reservation-card">
                <div className="dash-res-left">
                  <span className="dash-res-id">#reservation5154</span>
                  <p className="dash-res-label">Routine control of</p>
                  <h2 className="dash-res-name">Cappuccino</h2>
                  <p className="dash-res-type">Cat</p>
                  <div className="dash-paw-deco">🐾</div>
                </div>
                <div className="dash-res-right">
                  <div className="dash-res-detail">
                    <span className="dash-res-detail-icon">📍</span>
                    <div>
                      <strong>AARC Clinic</strong>
                      <p>Badamdar 72, Baku AZ</p>
                    </div>
                  </div>
                  <div className="dash-res-detail">
                    <span className="dash-res-detail-icon">📅</span>
                    <div>
                      <strong>Thursday, September 18, 2024</strong>
                    </div>
                  </div>
                  <div className="dash-res-detail">
                    <span className="dash-res-detail-icon">🕐</span>
                    <div><strong>13:00</strong></div>
                  </div>
                  <div className="dash-res-actions">
                    <button className="dash-res-cancel">Cancel book</button>
                    <button className="dash-res-edit">Edit</button>
                    <button className="dash-res-pay">Pay ↗</button>
                  </div>
                </div>
              </div>
            </div>

            {/* paws coins */}
            <div className="dash-coins-card">
              <div className="dash-coins-number">
                <span className="dash-coins-big">67</span>
                <span className="dash-coins-label">Paws Coins</span>
              </div>
              <p className="dash-coins-sub">you can spend it on</p>
              <div className="dash-coins-options">
                <span>Purchases</span>
                <span className="dash-coins-or">or</span>
                <span>Donate</span>
              </div>
            </div>

          </div>

          {/* last order row */}
          <div className="dash-bottom-row">

            {/* last order */}
            <div className="dash-order-card">
              <h3 className="dash-section-title">Last order</h3>
              <div className="dash-order-meta">
                <div>
                  <p className="dash-order-meta-label">Buyer</p>
                  <p className="dash-order-meta-value">Mina Mammadova</p>
                </div>
                <div>
                  <p className="dash-order-meta-label">Order date</p>
                  <p className="dash-order-meta-value">Sep. 12 2024 10:53</p>
                </div>
                <div>
                  <p className="dash-order-meta-label">Order Summary</p>
                  <p className="dash-order-meta-value">5 products</p>
                </div>
                <div>
                  <p className="dash-order-meta-label">Amount</p>
                  <p className="dash-order-meta-value dash-order-amount">126 USD</p>
                </div>
              </div>

              <div className="dash-order-products">
                {[
                  'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=200&q=80',
                  'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=200&q=80',
                  'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=200&q=80',
                  'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=200&q=80',
                  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&q=80',
                ].map((src, i) => (
                  <div className="dash-order-product-img" key={i}>
                    <img src={src} alt={`product ${i + 1}`} />
                  </div>
                ))}
              </div>

              <div className="dash-order-footer">
                <span className="dash-order-status">✅ Delivered</span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="dash-order-again">Order again</button>
                  <button className="dash-order-details">Order details ↗</button>
                </div>
              </div>
            </div>

            {/* thank you card */}
            <div className="dash-thanks-card">
              <div className="dash-thanks-heart">❤️</div>
              <h4>Thank you for your support!</h4>
              <div className="dash-thanks-stats">
                <div className="dash-thanks-row">
                  <span>You have made</span>
                  <strong>12</strong>
                  <span>purchases</span>
                </div>
                <div className="dash-thanks-row">
                  <span>used services</span>
                  <strong>6</strong>
                  <span>times</span>
                </div>
                <div className="dash-thanks-row">
                  <span>and made</span>
                  <strong>7</strong>
                  <span>donations</span>
                </div>
              </div>
              <p className="dash-thanks-msg">
                We truly appreciate your help in supporting animals!
              </p>
            </div>

          </div>
        </main>
      </div>

      {/* ── FOOTER ── */}
      <footer className="dash-footer">
        <div className="dash-footer-inner">
          <div className="dash-footer-brand">
            <div className="dash-footer-logo">Paws.az</div>
            <p>Caring for pets with love and kindness.</p>
          </div>
          <div className="dash-footer-socials">
            <a href="#">📍</a>
            <a href="#">📷</a>
            <a href="#">👥</a>
            <a href="#">🎵</a>
          </div>
          <div className="dash-footer-links">
            <div>
              <a href="#">FAQ</a>
              <a href="#">Shipping</a>
              <a href="#">Returns</a>
              <a href="#">Privacy</a>
            </div>
            <div>
              <a href="#">Contacts</a>
              <a href="#">Help</a>
              <a href="#">News</a>
              <a href="#">About us</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}

