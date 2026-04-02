import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'

const ALL_RESULTS = [
  { id: 1,  type: 'Service', icon: '✂️', title: 'Full Grooming Package',      desc: 'Bath, haircut, nail trim and blow-dry by certified groomers.',         tag: 'Grooming',   price: '₼45', rating: 4.9, page: 'services' },
  { id: 2,  type: 'Service', icon: '🩺', title: 'Vet Consultation',            desc: 'General health check with experienced licensed veterinarians.',        tag: 'Veterinary', price: '₼35', rating: 5.0, page: 'services' },
  { id: 3,  type: 'Service', icon: '🐶', title: 'Puppy Starter Training',      desc: 'Foundation commands and socialisation for puppies 8–16 weeks.',       tag: 'Training',   price: '₼60', rating: 4.8, page: 'services' },
  { id: 4,  type: 'Service', icon: '🏨', title: 'Pet Hotel Stay',              desc: 'Cozy rooms and 24/7 supervision for your pet.',                       tag: 'Boarding',   price: '₼40', rating: 4.9, page: 'services' },
  { id: 5,  type: 'Service', icon: '🦮', title: 'Daily Dog Walking',           desc: 'Safe fun walks with experienced handlers in your neighbourhood.',      tag: 'Walking',    price: '₼20', rating: 4.8, page: 'services' },
  { id: 6,  type: 'Service', icon: '💉', title: 'Vaccination Package',         desc: 'Core and non-core vaccines tailored to your pet.',                    tag: 'Veterinary', price: '₼55', rating: 4.9, page: 'services' },
  { id: 7,  type: 'Service', icon: '🚗', title: 'Safe Pet Taxi',               desc: 'Climate-controlled transport anywhere in Baku.',                      tag: 'Transport',  price: '₼15', rating: 4.8, page: 'services' },
  { id: 8,  type: 'Service', icon: '🏠', title: 'In-home Cat Sitting',         desc: 'A trusted sitter comes to your home so your pet stays comfortable.',  tag: 'Sitting',    price: '₼25', rating: 4.7, page: 'services' },
  { id: 9,  type: 'Service', icon: '💊', title: 'Specialised Treatment',       desc: 'Diagnosis and care for skin, digestive and chronic conditions.',      tag: 'Veterinary', price: '₼65', rating: 5.0, page: 'services' },
  { id: 10, type: 'Service', icon: '💅', title: 'Nail Trim and File',          desc: 'Safe and stress-free nail trimming for cats and dogs.',               tag: 'Grooming',   price: '₼12', rating: 4.7, page: 'services' },
  { id: 11, type: 'Product', icon: '🍖', title: 'Royal Canin Kitten Food',     desc: 'Premium dry food for kittens aged 2–12 months.',                     tag: 'Cat Food',   price: '₼12', rating: 5.0, page: 'shop' },
  { id: 12, type: 'Product', icon: '🍖', title: 'Brit Care Dog Food',          desc: 'Sustainable grain-free food for adult dogs.',                         tag: 'Dog Food',   price: '₼21', rating: 4.9, page: 'shop' },
  { id: 13, type: 'Product', icon: '🎾', title: 'Kong Interactive Puzzle Toy', desc: 'Keep your dog mentally stimulated with this toy.',                   tag: 'Dog Toy',    price: '₼18', rating: 4.8, page: 'shop' },
  { id: 14, type: 'Product', icon: '✂️', title: 'Hertzko Slicker Brush',       desc: 'Self-cleaning brush suitable for all coat types.',                   tag: 'Grooming',   price: '₼20', rating: 4.9, page: 'shop' },
  { id: 15, type: 'Product', icon: '💊', title: 'Zesty Paws Omega-3',          desc: 'Fish oil supplement for coat and joint health.',                     tag: 'Health',     price: '₼28', rating: 4.9, page: 'shop' },
  { id: 16, type: 'Product', icon: '🐠', title: 'Tetra Goldfish Granules',     desc: 'Complete daily nutrition for goldfish and cold-water fish.',          tag: 'Fish Food',  price: '₼8',  rating: 4.7, page: 'shop' },
  { id: 17, type: 'Product', icon: '🐰', title: 'Padovan Grandmix Rabbit',     desc: 'Natural mix of seeds, grains and vegetables for rabbits.',           tag: 'Small Pets', price: '₼9',  rating: 4.7, page: 'shop' },
  { id: 18, type: 'Product', icon: '🐦', title: 'Premium Parrot Mix',          desc: 'Balanced seed blend for parrots and large parakeets.',               tag: 'Bird Food',  price: '₼14', rating: 4.8, page: 'shop' },
  { id: 19, type: 'Product', icon: '🐹', title: 'Vitakraft Hamster Mix',       desc: 'Natural mix specially formulated for hamsters.',                     tag: 'Small Pets', price: '₼7',  rating: 4.6, page: 'shop' },
  { id: 20, type: 'Product', icon: '🎀', title: 'Adjustable Dog Harness',      desc: 'Comfortable padded harness for dogs of all sizes.',                  tag: 'Accessory',  price: '₼55', rating: 5.0, page: 'shop' },
  { id: 21, type: 'Pet',     icon: '🐕', title: 'Buddy — Golden Retriever',    desc: 'Male · 2 years · Needs a loving home in Baku.',                     tag: 'Adopt',      price: 'Free', rating: null, page: 'care-donate' },
  { id: 22, type: 'Pet',     icon: '🐈', title: 'Luna — Siamese Cat',          desc: 'Female · 1 year · Playful and affectionate.',                       tag: 'Adopt',      price: 'Free', rating: null, page: 'care-donate' },
  { id: 23, type: 'Pet',     icon: '🐕', title: 'Max — Labrador Mix',          desc: 'Male · 3 years · Great with kids and other animals.',               tag: 'Adopt',      price: 'Free', rating: null, page: 'care-donate' },
]

const TYPE_FILTERS = ['All', 'Service', 'Product', 'Pet']

export default function Search({ setPage, query, goSearch, cartCount = 0, wishlistCount = 0 }) {
  const [input,      setInput]      = useState(query || '')
  const [activeType, setActiveType] = useState('All')
  const [sortBy,     setSortBy]     = useState('Relevance')

  useEffect(() => {
    setInput(query || '')
  }, [query])

  const q = input.toLowerCase().trim()

  let results = ALL_RESULTS.filter((r) => {
    const matchQuery = q === '' ||
      r.title.toLowerCase().includes(q) ||
      r.desc.toLowerCase().includes(q) ||
      r.tag.toLowerCase().includes(q)
    const matchType = activeType === 'All' || r.type === activeType
    return matchQuery && matchType
  })

  if (sortBy === 'Price: Low to High') {
    results = [...results].sort((a, b) => parseFloat(a.price.replace('₼', '')) - parseFloat(b.price.replace('₼', '')))
  }
  if (sortBy === 'Top Rated') {
    results = [...results].sort((a, b) => (b.rating || 0) - (a.rating || 0))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (goSearch && input.trim()) goSearch(input.trim())
  }

  const serviceCount = results.filter((r) => r.type === 'Service').length
  const productCount = results.filter((r) => r.type === 'Product').length
  const petCount     = results.filter((r) => r.type === 'Pet').length

  return (
    <div className="search-page">

      <Navbar
        setPage={setPage}
        activePage="search"
        goSearch={goSearch}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />

      {/* ── SEARCH HERO ── */}
      <div className="search-hero">
        <div className="search-hero-inner">
          <h1>Search <em>Paws.az</em></h1>
          <form onSubmit={handleSubmit} className="search-hero-form">
            <div className="search-hero-input-wrap">
              <span>🔍</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search services, products, pets..."
                autoFocus
              />
              {input && (
                <button type="button" className="search-hero-clear" onClick={() => setInput('')}>✕</button>
              )}
              <button type="submit" className="btn-primary" style={{ borderRadius: '12px', padding: '12px 24px' }}>
                Search
              </button>
            </div>
          </form>

          {/* popular tags */}
          <div className="search-popular">
            <span>Popular:</span>
            {['Grooming', 'Vet', 'Dog food', 'Cat food', 'Adopt', 'Training', 'Bird toys'].map((t) => (
              <button
                key={t}
                className="search-popular-tag"
                onClick={() => { setInput(t); if (goSearch) goSearch(t) }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── RESULTS ── */}
      <div className="search-body">

        {/* toolbar */}
        <div className="search-toolbar">
          <div className="search-type-filters">
            {TYPE_FILTERS.map((f) => (
              <button
                key={f}
                className={'search-type-btn' + (activeType === f ? ' active' : '')}
                onClick={() => setActiveType(f)}
              >
                {f}
                {f === 'All'     && <span className="search-type-count">{results.length}</span>}
                {f === 'Service' && <span className="search-type-count">{activeType === 'All' ? serviceCount : results.length}</span>}
                {f === 'Product' && <span className="search-type-count">{activeType === 'All' ? productCount : results.length}</span>}
                {f === 'Pet'     && <span className="search-type-count">{activeType === 'All' ? petCount     : results.length}</span>}
              </button>
            ))}
          </div>

          <div className="search-sort">
            <label>Sort:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option>Relevance</option>
              <option>Price: Low to High</option>
              <option>Top Rated</option>
            </select>
          </div>
        </div>

        {/* result count */}
        {q && (
          <p className="search-result-count">
            {results.length > 0
              ? <>Found <strong>{results.length}</strong> results for "<strong>{q}</strong>"</>
              : <>No results found for "<strong>{q}</strong>"</>
            }
          </p>
        )}

        {/* empty state */}
        {results.length === 0 && (
          <div className="search-empty">
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
            <h3>Nothing found</h3>
            <p>Try a different keyword or browse our categories below.</p>
            <div className="search-empty-links">
              <button className="btn-primary" onClick={() => setPage('services')}>🩺 Browse Services</button>
              <button className="btn-outline" onClick={() => setPage('shop')}>🛒 Visit Shop</button>
              <button className="btn-outline" onClick={() => setPage('care-donate')}>🐾 Adopt a Pet</button>
            </div>
          </div>
        )}

        {/* results grid */}
        {results.length > 0 && (
          <div className="search-results-grid">
            {results.map((r) => (
              <div
                className="search-result-card"
                key={r.id}
                onClick={() => setPage(r.page)}
              >
                <div className={'search-result-icon-wrap search-icon-' + r.type.toLowerCase()}>
                  <span>{r.icon}</span>
                </div>
                <div className="search-result-body">
                  <div className="search-result-top">
                    <span className={'search-result-type search-type-' + r.type.toLowerCase()}>
                      {r.type}
                    </span>
                    <span className="search-result-tag">{r.tag}</span>
                  </div>
                  <h4>{r.title}</h4>
                  <p>{r.desc}</p>
                  <div className="search-result-footer">
                    <span className="search-result-price">{r.price}</span>
                    {r.rating && (
                      <span className="search-result-rating">⭐ {r.rating}</span>
                    )}
                    <button
                      className="search-result-btn"
                      onClick={(e) => { e.stopPropagation(); setPage(r.page) }}
                    >
                      {r.type === 'Service' ? 'Book →' : r.type === 'Pet' ? 'Meet →' : 'View →'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  )
}