export default function Navbar({ setPage, activePage = '' }) {

  function goTo(e, dest) {
    e.preventDefault()
    setPage(dest)
  }

  function activeStyle(page) {
    if (activePage === page) {
      return { color: 'var(--green-500)', fontWeight: '600' }
    }
    return {}
  }

  return (
    <header className="navbar">

      <button
        className="navbar-logo"
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
        onClick={() => setPage('home')}
      >
        🐾 Paws.az
      </button>

      <nav className="navbar-nav">
        <a href="#" style={activeStyle('home')} onClick={(e) => goTo(e, 'home')}>
          Home
        </a>
        <a href="#" style={activeStyle('shop')} onClick={(e) => goTo(e, 'shop')}>
          Shop
        </a>
        <a href="#" style={activeStyle('services')} onClick={(e) => goTo(e, 'services')}>
          Services
        </a>
        <a href="#" style={activeStyle('blog')} onClick={(e) => goTo(e, 'blog')}>
          Blog
        </a>
        <a href="#" style={activeStyle('care-donate')} onClick={(e) => goTo(e, 'care-donate')}>
          Care &amp; Donate
        </a>
        <a href="#" style={activeStyle('contact')} onClick={(e) => goTo(e, 'contact')}>
          Contact
        </a>
      </nav>

      <div className="navbar-actions">
        <button className="icon-btn">🔍</button>
        <button className="icon-btn">🤍</button>
        <button className="icon-btn">🛒</button>
        <button className="icon-btn" onClick={() => setPage('dashboard')}>👤</button>
        <button className="btn-primary" onClick={() => setPage('login')}>Sign in</button>
      </div>

    </header>
  )
}