import { useState } from 'react'
import Navbar from '../components/Navbar'

const ALL_PRODUCTS = [
  {
    id: 1, cat: 'Food', species: 'Dogs',
    img: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&q=80',
    name: 'Organix Beef Heart', brand: 'Organix', price: 6, unit: '0.5 kg',
    rating: 4.8, reviews: 312, badge: 'Best seller', badgeColor: '#f5c842',
    age: '6+ months', weight: '0.5 kg',
  },
  {
    id: 2, cat: 'Food', species: 'Cats',
    img: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=500&q=80',
    name: 'SmartCat Sterilised', brand: 'SmartCat', price: 10, unit: '1 kg',
    rating: 4.9, reviews: 204, badge: 'New', badgeColor: '#7ab8e8',
    age: '1+ years', weight: '1 kg',
  },
  {
    id: 3, cat: 'Food', species: 'Rabbit',
    img: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=500&q=80',
    name: 'Padovan Grandmix Rabbit', brand: 'Padovan', price: 9, unit: '1 kg',
    rating: 4.7, reviews: 98, badge: null, badgeColor: null,
    age: '3+ months', weight: '1 kg',
  },
  {
    id: 4, cat: 'Food', species: 'Dogs',
    img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&q=80',
    name: 'Brit Care Sustainable', brand: 'Brit Care', price: 21, unit: '3 kg',
    rating: 4.9, reviews: 189, badge: 'Top rated', badgeColor: '#5db87a',
    age: '7+ months', weight: '3 kg',
  },
  {
    id: 5, cat: 'Food', species: 'Hamster',
    img: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=500&q=80',
    name: 'Vitakraft Hamster Mix', brand: 'Vitakraft', price: 7, unit: '1 kg',
    rating: 4.6, reviews: 143, badge: null, badgeColor: null,
    age: 'All ages', weight: '1 kg',
  },
  {
    id: 6, cat: 'Food', species: 'Cats',
    img: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&q=80',
    name: 'Royal Canin Kitten', brand: 'Royal Canin', price: 12, unit: '2 kg',
    rating: 5.0, reviews: 267, badge: 'Best seller', badgeColor: '#f5c842',
    age: '2-12 months', weight: '2 kg',
  },
  {
    id: 7, cat: 'Food', species: 'Birds',
    img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&q=80',
    name: 'Premium Parrot Mix', brand: 'Versele-Laga', price: 14, unit: '1 kg',
    rating: 4.8, reviews: 88, badge: null, badgeColor: null,
    age: 'All ages', weight: '1 kg',
  },
  {
    id: 8, cat: 'Food', species: 'Fish',
    img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&q=80',
    name: 'Tetra Goldfish Granules', brand: 'Tetra', price: 8, unit: '100 g',
    rating: 4.7, reviews: 156, badge: null, badgeColor: null,
    age: 'All ages', weight: '100 g',
  },
  {
    id: 9, cat: 'Food', species: 'Guinea Pig',
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&q=80',
    name: 'Guinea Pig Veggie Mix', brand: 'Padovan', price: 8, unit: '0.8 kg',
    rating: 4.7, reviews: 67, badge: null, badgeColor: null,
    age: 'All ages', weight: '0.8 kg',
  },
  {
    id: 10, cat: 'Toys', species: 'Dogs',
    img: 'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=500&q=80',
    name: 'Interactive Puzzle Toy', brand: 'Kong', price: 18, unit: '1 pc',
    rating: 4.8, reviews: 88, badge: 'Sale', badgeColor: '#f0826a',
    age: 'All ages', weight: '0.3 kg',
  },
  {
    id: 11, cat: 'Toys', species: 'Cats',
    img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&q=80',
    name: 'Feather Wand Toy', brand: 'Petstages', price: 8, unit: '1 pc',
    rating: 4.7, reviews: 156, badge: null, badgeColor: null,
    age: 'All ages', weight: '0.1 kg',
  },
  {
    id: 12, cat: 'Toys', species: 'Rabbit',
    img: 'https://images.unsplash.com/photo-1597633425046-08f5110420b5?w=500&q=80',
    name: 'Rabbit Tunnel Play Set', brand: 'Niteangel', price: 22, unit: '1 pc',
    rating: 4.6, reviews: 54, badge: null, badgeColor: null,
    age: 'All ages', weight: '0.4 kg',
  },
  {
    id: 13, cat: 'Toys', species: 'Birds',
    img: 'https://images.unsplash.com/photo-1604916851289-390068e23f08?w=500&q=80',
    name: 'Bird Swing & Mirror Set', brand: 'JW Pet', price: 11, unit: '1 pc',
    rating: 4.8, reviews: 73, badge: null, badgeColor: null,
    age: 'All ages', weight: '0.15 kg',
  },
  {
    id: 14, cat: 'Accessories', species: 'Dogs',
    img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&q=80',
    name: 'Adjustable Harness', brand: 'Ruffwear', price: 55, unit: '1 pc',
    rating: 5.0, reviews: 91, badge: 'Top rated', badgeColor: '#5db87a',
    age: 'Adult', weight: '0.4 kg',
  },
  {
    id: 15, cat: 'Accessories', species: 'Fish',
    img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&q=80',
    name: '30L Aquarium Starter Kit', brand: 'Juwel', price: 89, unit: '1 set',
    rating: 4.9, reviews: 112, badge: 'New', badgeColor: '#7ab8e8',
    age: 'All', weight: '5 kg',
  },
  {
    id: 16, cat: 'Accessories', species: 'Hamster',
    img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&q=80',
    name: 'Hamster Wheel Silent', brand: 'Niteangel', price: 24, unit: '1 pc',
    rating: 4.8, reviews: 188, badge: null, badgeColor: null,
    age: 'All ages', weight: '0.3 kg',
  },
  {
    id: 17, cat: 'Grooming', species: 'Dogs',
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&q=80',
    name: 'Self-Cleaning Slicker Brush', brand: 'Hertzko', price: 20, unit: '1 pc',
    rating: 4.9, reviews: 334, badge: 'Best seller', badgeColor: '#f5c842',
    age: 'All ages', weight: '0.2 kg',
  },
  {
    id: 18, cat: 'Grooming', species: 'Cats',
    img: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=500&q=80',
    name: 'Cat Deshedding Glove', brand: 'HandsOn', price: 16, unit: '1 pair',
    rating: 4.7, reviews: 203, badge: null, badgeColor: null,
    age: 'All ages', weight: '0.1 kg',
  },
  {
    id: 19, cat: 'Health', species: 'Dogs',
    img: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=500&q=80',
    name: 'Omega-3 Supplement', brand: 'Zesty Paws', price: 28, unit: '90 chews',
    rating: 4.9, reviews: 177, badge: 'Sale', badgeColor: '#f0826a',
    age: 'All ages', weight: '0.3 kg',
  },
  {
    id: 20, cat: 'Health', species: 'Birds',
    img: 'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=500&q=80',
    name: 'Bird Vitamin Drops', brand: 'Nekton', price: 18, unit: '25 ml',
    rating: 4.8, reviews: 62, badge: null, badgeColor: null,
    age: 'All ages', weight: '0.05 kg',
  },
]

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
  { id: 'All',        icon: '🛒' },
  { id: 'Food',       icon: '🍖' },
  { id: 'Toys',       icon: '🎾' },
  { id: 'Accessories',icon: '🎀' },
  { id: 'Grooming',   icon: '✂️' },
  { id: 'Health',     icon: '💊' },
]

const SORT_OPTIONS = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Top Rated']

function speciesIcon(s) {
  const found = SPECIES_LIST.find((x) => x.id === s)
  return found ? found.icon : '🐾'
}

export default function Shop({ setPage }) {
  const [activeCat,     setActiveCat]     = useState('All')
  const [activeSpecies, setActiveSpecies] = useState('All')
  const [priceRange,    setPriceRange]    = useState('All')
  const [sortBy,        setSortBy]        = useState('Featured')
  const [wishlist,      setWishlist]      = useState([])
  const [cart,          setCart]          = useState([])
  const [added,         setAdded]         = useState(null)
  const [search,        setSearch]        = useState('')

  function toggleWish(id) {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((x) => x !== id))
    } else {
      setWishlist([...wishlist, id])
    }
  }

  function addToCart(id) {
    setCart([...cart, id])
    setAdded(id)
    setTimeout(() => setAdded(null), 1500)
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
      priceRange === 'All'        ? true :
      priceRange === 'Under ₼10'  ? p.price < 10 :
      priceRange === '₼10 – ₼30'  ? p.price >= 10 && p.price <= 30 :
      p.price > 30
    return matchCat && matchSpecies && matchSearch && matchPrice
  })

  if (sortBy === 'Price: Low to High') products = [...products].sort((a, b) => a.price - b.price)
  if (sortBy === 'Price: High to Low') products = [...products].sort((a, b) => b.price - a.price)
  if (sortBy === 'Top Rated')          products = [...products].sort((a, b) => b.rating - a.rating)

  return (
    <div className="shop2-page">

      <Navbar setPage={setPage} activePage="shop" />

      {/* ── SPECIES BAR ── */}
      <div className="shop2-species-bar">
        <div className="shop2-species-inner">
          {SPECIES_LIST.map((s) => (
            <button
              key={s.id}
              className={'shop2-species-btn' + (activeSpecies === s.id ? ' active' : '')}
              onClick={() => setActiveSpecies(s.id)}
            >
              <span className="shop2-species-icon">{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── FILTER BAR ── */}
      <div className="shop2-filterbar">
        <div className="shop2-filterbar-inner">

          <div className="shop2-filter-group">
            <label>Price Range</label>
            <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
              <option>All</option>
              <option>Under ₼10</option>
              <option>₼10 – ₼30</option>
              <option>Over ₼30</option>
            </select>
          </div>

          <div className="shop2-filter-group">
            <label>Special Offers</label>
            <select>
              <option>All</option>
              <option>On sale</option>
              <option>New arrivals</option>
              <option>Best sellers</option>
            </select>
          </div>

          <div className="shop2-filter-group">
            <label>Brands</label>
            <select>
              <option>All brands</option>
              <option>Royal Canin</option>
              <option>Kong</option>
              <option>Vitakraft</option>
              <option>Tetra</option>
              <option>Versele-Laga</option>
              <option>Ruffwear</option>
              <option>Zesty Paws</option>
            </select>
          </div>

          <div className="shop2-filter-group">
            <label>Sort by</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              {SORT_OPTIONS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>

          <div className="shop2-search-wrap">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search products, brands..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)', fontSize: '14px' }}
                onClick={() => setSearch('')}
              >
                ✕
              </button>
            )}
          </div>

        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="shop2-layout">

        {/* ── SIDEBAR ── */}
        <aside className="shop2-sidebar">

          <div className="shop2-sidebar-section">
            <h5>Category</h5>
            {CAT_LIST.map((c) => (
              <button
                key={c.id}
                className={'shop2-side-item' + (activeCat === c.id ? ' active' : '')}
                onClick={() => setActiveCat(c.id)}
              >
                <span>{c.icon} {c.id}</span>
              </button>
            ))}
          </div>

          <div className="shop2-sidebar-section" style={{ marginTop: '8px' }}>
            <h5>Pet Type</h5>
            {SPECIES_LIST.map((s) => (
              <button
                key={s.id}
                className={'shop2-side-item' + (activeSpecies === s.id ? ' active' : '')}
                onClick={() => setActiveSpecies(s.id)}
              >
                <span>{s.icon} {s.label}</span>
              </button>
            ))}
          </div>

          <div className="shop2-sidebar-section" style={{ marginTop: '8px' }}>
            <h5>Small Pets</h5>
            {['Rabbit', 'Hamster', 'Guinea Pig'].map((s) => (
              <button
                key={s}
                className={'shop2-side-item' + (activeSpecies === s ? ' active' : '')}
                onClick={() => setActiveSpecies(s)}
                style={{ paddingLeft: '20px', fontSize: '13px' }}
              >
                <span>
                  {s === 'Rabbit' ? '🐰' : s === 'Hamster' ? '🐹' : '🐾'} {s}
                </span>
              </button>
            ))}
          </div>

          {/* info card */}
          <div className="shop2-info-card">
            <p className="shop2-info-label">Important information</p>
            <h4>Every Purchase Feeds a Homeless Pet</h4>
            <p>Each of your purchases provides our little homeless friends with a bowl of food. Support their lives by shopping at Paws.az</p>
            <div className="shop2-info-counter">26,173</div>
            <p style={{ fontSize: '11px', color: 'var(--text-light)', marginTop: '6px' }}>pets helped so far</p>
          </div>

        </aside>

        {/* ── RIGHT ── */}
        <div className="shop2-right">

          {/* DEAL BANNER */}
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

          {/* active filters display */}
          {(activeCat !== 'All' || activeSpecies !== 'All' || priceRange !== 'All' || search) && (
            <div className="shop2-active-filters">
              <span style={{ fontSize: '13px', color: 'var(--text-mid)', fontWeight: 500 }}>Active filters:</span>
              {activeSpecies !== 'All' && (
                <span className="shop2-filter-tag">
                  {speciesIcon(activeSpecies)} {activeSpecies}
                  <button onClick={() => setActiveSpecies('All')}>✕</button>
                </span>
              )}
              {activeCat !== 'All' && (
                <span className="shop2-filter-tag">
                  {activeCat}
                  <button onClick={() => setActiveCat('All')}>✕</button>
                </span>
              )}
              {priceRange !== 'All' && (
                <span className="shop2-filter-tag">
                  {priceRange}
                  <button onClick={() => setPriceRange('All')}>✕</button>
                </span>
              )}
              {search && (
                <span className="shop2-filter-tag">
                  "{search}"
                  <button onClick={() => setSearch('')}>✕</button>
                </span>
              )}
              <button className="shop2-clear-btn" onClick={clearFilters}>Clear all</button>
            </div>
          )}

          {/* results bar */}
          <div className="shop2-results-bar">
            <p>
              Showing <strong>{products.length}</strong> of <strong>{ALL_PRODUCTS.length}</strong> products
            </p>
            {cart.length > 0 && (
              <div className="shop2-cart-pill">
                🛒 {cart.length} item{cart.length > 1 ? 's' : ''} in cart
              </div>
            )}
          </div>

          {/* GRID */}
          {products.length === 0 ? (
            <div className="shop2-empty">
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
              <h3>No products found</h3>
              <p>Try clearing your filters or searching something else.</p>
              <button className="btn-primary" style={{ marginTop: '14px' }} onClick={clearFilters}>
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="shop2-grid">
              {products.map((p) => (
                <div className="shop2-card" key={p.id}>
                  <div className="shop2-card-img">
                    <img src={p.img} alt={p.name} />
                    {p.badge && (
                      <span className="shop2-badge" style={{ background: p.badgeColor }}>
                        {p.badge}
                      </span>
                    )}
                    <button className="shop2-wish" onClick={() => toggleWish(p.id)}>
                      {wishlist.includes(p.id) ? '❤️' : '🤍'}
                    </button>
                  </div>
                  <div className="shop2-card-body">
                    <h4>{p.name}</h4>
                    <div className="shop2-card-meta">
                      <span className="shop2-species-tag">
                        {speciesIcon(p.species)} {p.species}
                      </span>
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
                      <button
                        className={'shop2-add-btn' + (added === p.id ? ' added' : '')}
                        onClick={() => addToCart(p.id)}
                      >
                        {added === p.id ? '✓ Added' : '🛒 Add'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ background: 'var(--text-dark)', padding: '40px clamp(20px,5vw,80px)', marginTop: '40px' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', fontWeight: 700, color: 'var(--green-300)' }}>
            🐾 Paws.az
          </div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
            © 2026 Paws.az. All rights reserved.
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