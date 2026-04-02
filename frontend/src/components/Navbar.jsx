import { useState } from 'react'

export default function Navbar({ setPage, activePage = '', wishlistCount = 0, cartCount = 0, goSearch }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchVal,  setSearchVal]  = useState('')

  function goTo(e, dest) {
    e.preventDefault()
    setPage(dest)
  }

  function activeStyle(page) {
    return activePage === page ? { color: 'var(--green-500)', fontWeight: '600' } : {}
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!searchVal.trim()) return
    if (goSearch) goSearch(searchVal.trim())
    setSearchOpen(false)
    setSearchVal('')
  }

  function handleTag(tag) {
    if (goSearch) goSearch(tag)
    setSearchOpen(false)
    setSearchVal('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      setSearchOpen(false)
      setSearchVal('')
    }
  }

  return (
    <>
      <header className="navbar">
        <button
          className="navbar-logo"
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
          onClick={() => setPage('home')}
        >
          🐾 Paws.az
        </button>

        <nav className="navbar-nav">
          <a href="#" style={activeStyle('home')}        onClick={(e) => goTo(e, 'home')}>Home</a>
          <a href="#" style={activeStyle('shop')}        onClick={(e) => goTo(e, 'shop')}>Shop</a>
          <a href="#" style={activeStyle('services')}    onClick={(e) => goTo(e, 'services')}>Services</a>
          <a href="#" style={activeStyle('blog')}        onClick={(e) => goTo(e, 'blog')}>Blog</a>
          <a href="#" style={activeStyle('care-donate')} onClick={(e) => goTo(e, 'care-donate')}>Care &amp; Donate</a>
          <a href="#" style={activeStyle('contact')}     onClick={(e) => goTo(e, 'contact')}>Contact</a>
        </nav>

        <div className="navbar-actions">
          <button
            className={'icon-btn' + (searchOpen ? ' icon-btn-active' : '')}
            onClick={() => setSearchOpen(!searchOpen)}
            title="Search"
          >
            🔍
          </button>
          <button
            className="icon-btn"
            onClick={() => setPage('favourites')}
            title="My Favourites"
            style={{ position: 'relative' }}
          >
            {wishlistCount > 0 ? '❤️' : '🤍'}
            {wishlistCount > 0 && (
              <span className="nav-badge" style={{ background: 'var(--accent-coral)' }}>
                {wishlistCount}
              </span>
            )}
          </button>
          <button
            className="icon-btn"
            onClick={() => setPage('cart')}
            title="Shopping Bag"
            style={{ position: 'relative' }}
          >
            🛒
            {cartCount > 0 && (
              <span className="nav-badge" style={{ background: 'var(--green-500)' }}>
                {cartCount}
              </span>
            )}
          </button>
          <button className="icon-btn" onClick={() => setPage('dashboard')}>👤</button>
          <button className="btn-primary" onClick={() => setPage('login')}>Sign in</button>
        </div>
      </header>

      {/* ── SEARCH DROPDOWN ── */}
      {searchOpen && (
        <div className="navbar-search-overlay" onClick={() => setSearchOpen(false)}>
          <div className="navbar-search-box" onClick={(e) => e.stopPropagation()}>

            {/* input */}
            <form onSubmit={handleSubmit}>
              <div className="navbar-search-input-wrap">
                <span className="navbar-search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search services, products, pets..."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
                {searchVal && (
                  <button
                    type="button"
                    className="navbar-search-clear"
                    onClick={() => setSearchVal('')}
                  >
                    ✕
                  </button>
                )}
                <button type="submit" className="navbar-search-btn">
                  Search
                </button>
              </div>
            </form>

            {/* popular tags */}
            <div className="navbar-search-suggestions">
              <p className="navbar-search-label">Popular searches</p>
              <div className="navbar-search-tags">
                {[
                  'Dog grooming', 'Vet consultation', 'Cat food',
                  'Puppy training', 'Pet hotel', 'Fish tank',
                  'Rabbit food', 'Bird toys', 'Dog walking', 'Vaccination',
                ].map((tag) => (
                  <button
                    key={tag}
                    className="navbar-search-tag"
                    onClick={() => handleTag(tag)}
                  >
                    🔍 {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* quick links */}
            <div className="navbar-search-quick">
              <p className="navbar-search-label">Quick links</p>
              <div className="navbar-search-quick-links">
                <button onClick={() => { setPage('services');        setSearchOpen(false) }}>🩺 Vet Services</button>
                <button onClick={() => { setPage('shop');            setSearchOpen(false) }}>🛒 Pet Shop</button>
                <button onClick={() => { setPage('care-donate');     setSearchOpen(false) }}>🐈 Adopt a Pet</button>
                <button onClick={() => { setPage('become-provider'); setSearchOpen(false) }}>🤝 Become Provider</button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  )
}