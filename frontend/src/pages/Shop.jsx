// src/pages/Shop.jsx — full replacement
import { useState } from 'react'
import Navbar from '../components/Navbar'
import { ALL_PRODUCTS } from '../data/products'

const SPECIES_LIST = [
  { id: 'All',        icon: '🐾', label: 'All Pets' },
  { id: 'Dogs',       icon: '🐶', label: 'Dogs' },
  { id: 'Cats',       icon: '🐱', label: 'Cats' },
  { id: 'Rabbit',     icon: '🐰', label: 'Rabbit' },
  { id: 'Hamster',    icon: '🐹', label: 'Hamster' },
  { id: 'Guinea Pig', icon: '🐾', label: 'Guinea Pig' },
  { id: 'Birds',      icon: '🐦', label: 'Birds' },
  { id: 'Fish',       icon: '🐠', label: 'Fish' },
]

const CAT_LIST = [
  { id: 'All',         icon: '🛒' },
  { id: 'Food',        icon: '🍖' },
  { id: 'Toys',        icon: '🎾' },
  { id: 'Accessories', icon: '🎀' },
  { id: 'Grooming',    icon: '✂️' },
  { id: 'Health',      icon: '💊' },
]

const SORT_OPTIONS = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Top Rated']

function speciesIcon(s) {
  const found = SPECIES_LIST.find((x) => x.id === s)
  return found ? found.icon : '🐾'
}

export default function Shop({ setPage, wishlist = [], toggleFav, cart = [], addToCart, addedId }) {
  const [activeCat,     setActiveCat]     = useState('All')
  const [activeSpecies, setActiveSpecies] = useState('All')
  const [priceRange,    setPriceRange]    = useState('All')
  const [sortBy,        setSortBy]        = useState('Featured')
  const [search,        setSearch]        = useState('')

  const [localWishlist, setLocalWishlist] = useState([])
  const [localCart,     setLocalCart]     = useState([])
  const [localAdded,    setLocalAdded]    = useState(null)

  const activeWishlist = toggleFav ? wishlist : localWishlist
  const activeAdded    = addedId !== undefined ? addedId : localAdded

  function handleToggleWish(id) {
    if (toggleFav) {
      toggleFav(id)
    } else {
      setLocalWishlist((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      )
    }
  }

  function handleAddToCart(id) {
    if (addToCart) {
      addToCart(id)
    } else {
      setLocalCart((prev) => [...prev, id])
      setLocalAdded(id)
      setTimeout(() => setLocalAdded(null), 1500)
    }
  }

  function clearFilters() {
    setSearch('')
    setActiveCat('All')
    setActiveSpecies('All')
    setPriceRange('All')
    setSortBy('Featured')
  }

  let products = ALL_PRODUCTS.filter((p) => {
    const matchCat     = activeCat === 'All' || p.cat === activeCat
    const matchSpecies = activeSpecies === 'All' || p.species === activeSpecies
    const matchSearch  = p.name.toLowerCase().includes(search.toLowerCase()) ||
                         p.brand.toLowerCase().includes(search.toLowerCase())
    const matchPrice   =
      priceRange === 'All'       ? true :
      priceRange === 'Under ₼10' ? p.price < 10 :
      priceRange === '₼10 – ₼30' ? p.price >= 10 && p.price <= 30 :
      p.price > 30
    return matchCat && matchSpecies && matchSearch && matchPrice
  })

  if (sortBy === 'Price: Low to High') products = [...products].sort((a, b) => a.price - b.price)
  if (sortBy === 'Price: High to Low') products = [...products].sort((a, b) => b.price - a.price)
  if (sortBy === 'Top Rated')          products = [...products].sort((a, b) => b.rating - a.rating)

  const cartCount = addToCart ? cart.length : localCart.length

  return (
    <div className="shop2-page">

      <Navbar setPage={setPage} activePage="shop" wishlistCount={activeWishlist.length} />

      <div className="shop2-species-bar">
        <div className="shop2-species-inner">
          {SPECIES_LIST.map((s) => (
            <button key={s.id} className={'shop2-species-btn' + (activeSpecies === s.id ? ' active' : '')} onClick={() => setActiveSpecies(s.id)}>
              <span className="shop2-species-icon">{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="shop2-filterbar">
        <div className="shop2-filterbar-inner">
          <div className="shop2-filter-group">
            <label>Price Range</label>
            <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
              <option>All</option><option>Under ₼10</option><option>₼10 – ₼30</option><option>Over ₼30</option>
            </select>
          </div>
          <div className="shop2-filter-group">
            <label>Special Offers</label>
            <select><option>All</option><option>On sale</option><option>New arrivals</option><option>Best sellers</option></select>
          </div>
          <div className="shop2-filter-group">
            <label>Brands</label>
            <select><option>All brands</option><option>Royal Canin</option><option>Kong</option><option>Vitakraft</option><option>Tetra</option><option>Versele-Laga</option><option>Ruffwear</option><option>Zesty Paws</option></select>
          </div>
          <div className="shop2-filter-group">
            <label>Sort by</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="shop2-search-wrap">
            <span>🔍</span>
            <input type="text" placeholder="Search products, brands..." value={search} onChange={(e) => setSearch(e.target.value)} />
            {search && <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)', fontSize: '14px' }} onClick={() => setSearch('')}>✕</button>}
          </div>
        </div>
      </div>

      <div className="shop2-layout">
        <aside className="shop2-sidebar">
          <div className="shop2-sidebar-section">
            <h5>Category</h5>
            {CAT_LIST.map((c) => (
              <button key={c.id} className={'shop2-side-item' + (activeCat === c.id ? ' active' : '')} onClick={() => setActiveCat(c.id)}>
                <span>{c.icon} {c.id}</span>
              </button>
            ))}
          </div>
          <div className="shop2-sidebar-section" style={{ marginTop: '8px' }}>
            <h5>Pet Type</h5>
            {SPECIES_LIST.map((s) => (
              <button key={s.id} className={'shop2-side-item' + (activeSpecies === s.id ? ' active' : '')} onClick={() => setActiveSpecies(s.id)}>
                <span>{s.icon} {s.label}</span>
              </button>
            ))}
          </div>
          <div className="shop2-sidebar-section" style={{ marginTop: '8px' }}>
            <h5>Small Pets</h5>
            {['Rabbit', 'Hamster', 'Guinea Pig'].map((s) => (
              <button key={s} className={'shop2-side-item' + (activeSpecies === s ? ' active' : '')} onClick={() => setActiveSpecies(s)} style={{ paddingLeft: '20px', fontSize: '13px' }}>
                <span>{s === 'Rabbit' ? '🐰' : s === 'Hamster' ? '🐹' : '🐾'} {s}</span>
              </button>
            ))}
          </div>
          <div className="shop2-info-card">
            <p className="shop2-info-label">Important information</p>
            <h4>Every Purchase Feeds a Homeless Pet</h4>
            <p>Each of your purchases provides our little homeless friends with a bowl of food.</p>
            <div className="shop2-info-counter">26,173</div>
            <p style={{ fontSize: '11px', color: 'var(--text-light)', marginTop: '6px' }}>pets helped so far</p>
          </div>
        </aside>

        <div className="shop2-right">
          <div className="shop2-deal-banner">
            <div className="shop2-deal-text">
              <span className="shop2-deal-label">Deal of the day</span>
              <h2>Super Sale!</h2>
              <p>The best carrier bag for your pet</p>
              <div className="shop2-deal-timer">
                <div className="shop2-timer-block"><strong>12</strong><span>Days</span></div>
                <div className="shop2-timer-block"><strong>22</strong><span>Hours</span></div>
                <div className="shop2-timer-block"><strong>06</strong><span>Mins</span></div>
              </div>
            </div>
            <div className="shop2-deal-img">
              <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80" alt="Deal" />
            </div>
          </div>

          {(activeCat !== 'All' || activeSpecies !== 'All' || priceRange !== 'All' || search) && (
            <div className="shop2-active-filters">
              <span style={{ fontSize: '13px', color: 'var(--text-mid)', fontWeight: 500 }}>Active filters:</span>
              {activeSpecies !== 'All' && <span className="shop2-filter-tag">{speciesIcon(activeSpecies)} {activeSpecies}<button onClick={() => setActiveSpecies('All')}>✕</button></span>}
              {activeCat !== 'All' && <span className="shop2-filter-tag">{activeCat}<button onClick={() => setActiveCat('All')}>✕</button></span>}
              {priceRange !== 'All' && <span className="shop2-filter-tag">{priceRange}<button onClick={() => setPriceRange('All')}>✕</button></span>}
              {search && <span className="shop2-filter-tag">"{search}"<button onClick={() => setSearch('')}>✕</button></span>}
              <button className="shop2-clear-btn" onClick={clearFilters}>Clear all</button>
            </div>
          )}

          <div className="shop2-results-bar">
            <p>Showing <strong>{products.length}</strong> of <strong>{ALL_PRODUCTS.length}</strong> products</p>
            {cartCount > 0 && <div className="shop2-cart-pill">🛒 {cartCount} item{cartCount > 1 ? 's' : ''} in cart</div>}
          </div>

          {products.length === 0 ? (
            <div className="shop2-empty">
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
              <h3>No products found</h3>
              <p>Try clearing your filters or searching something else.</p>
              <button className="btn-primary" style={{ marginTop: '14px' }} onClick={clearFilters}>Clear all filters</button>
            </div>
          ) : (
            <div className="shop2-grid">
              {products.map((p) => (
                <div className="shop2-card" key={p.id}>
                  <div className="shop2-card-img">
                    <img src={p.img} alt={p.name} />
                    {p.badge && <span className="shop2-badge" style={{ background: p.badgeColor }}>{p.badge}</span>}
                    <button className="shop2-wish" onClick={() => handleToggleWish(p.id)}>
                      {activeWishlist.includes(p.id) ? '❤️' : '🤍'}
                    </button>
                  </div>
                  <div className="shop2-card-body">
                    <h4>{p.name}</h4>
                    <div className="shop2-card-meta">
                      <span className="shop2-species-tag">{speciesIcon(p.species)} {p.species}</span>
                      <span className="shop2-age">{p.age}</span>
                    </div>
                    <div className="shop2-card-meta" style={{ marginTop: '4px' }}>
                      <span className="shop2-weight">⚖️ {p.weight}</span>
                      <span className="shop2-rating-sm">★ {p.rating}</span>
                    </div>
                    <div className="shop2-card-footer">
                      <div className="shop2-price">
                        <strong>{p.price} AZN</strong>
                        <span>{p.unit}</span>
                      </div>
                      <button className={'shop2-add-btn' + (activeAdded === p.id ? ' added' : '')} onClick={() => handleAddToCart(p.id)}>
                        {activeAdded === p.id ? '✓ Added' : '🛒 Add'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <footer style={{ background: 'var(--text-dark)', padding: '40px clamp(20px,5vw,80px)', marginTop: '40px' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', fontWeight: 700, color: 'var(--green-300)' }}>🐾 Paws.az</div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>© 2026 Paws.az. All rights reserved.</p>
          <button className="btn-outline" style={{ borderColor: 'var(--green-400)', color: 'var(--green-300)' }} onClick={() => setPage('home')}>Back to home</button>
        </div>
      </footer>
    </div>
  )
}