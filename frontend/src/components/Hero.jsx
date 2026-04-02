export default function Hero({ setPage }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-tag">
          <span className="tag-dot" />
          🇦🇿 Azerbaijan's #1 Pet Platform
        </div>

        <h1>
          Care for your<br />
          pets <em>starts</em><br />
          right here.
        </h1>

        <p className="hero-sub">
          From vet consultations and grooming to training and boarding —
          discover everything your pet needs, all in one premium platform.
        </p>

        <div className="hero-ctas">
          <button
            className="btn-primary"
            onClick={() => setPage('services')}
          >
            🐶 Discover services
          </button>
          <button
            className="btn-outline"
            onClick={() => setPage('become-provider')}
          >
            Become a provider →
          </button>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <h3>4.8k+</h3>
            <p>Happy pet owners</p>
          </div>
          <div className="stat">
            <h3>320+</h3>
            <p>Expert providers</p>
          </div>
          <div className="stat">
            <h3>12</h3>
            <p>Service categories</p>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="float-card">
          <span className="float-icon">⭐</span>
          <div className="float-info"><h5>Top rated</h5><p>Dr. Nigar Aliyeva</p></div>
        </div>
        <div className="float-card">
          <span className="float-icon">📅</span>
          <div className="float-info"><h5>Next slot</h5><p>Today, 3:00 PM</p></div>
        </div>
        <div className="float-card">
          <span className="float-icon">🐕</span>
          <div className="float-info"><h5>Just booked</h5><p>Puppy Training</p></div>
        </div>
        <div className="float-card">
          <span className="float-icon">✅</span>
          <div className="float-info"><h5>Completed</h5><p>Grooming session</p></div>
        </div>

        <div className="hero-main-card">
          <img
            src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=700&q=80"
            alt="Golden retriever"
          />
          <div className="hero-card-badge">
            <div className="badge-text">
              <h4>Premium Grooming</h4>
              <p>Paws Salon • Baku</p>
            </div>
            <div className="badge-rating">⭐ 4.9</div>
          </div>
        </div>
      </div>
    </section>
  )
}