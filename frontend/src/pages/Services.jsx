import { useState } from 'react'
import Navbar from '../components/Navbar'

const allServices = [
  {
    img: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=500&q=80',
    tag: '🩺 Veterinary', title: 'General Check-up',
    desc: 'Full health assessment with physical exam and personalised recommendations.',
    price: '35', unit: '30 min', rating: '5.0', reviews: '213',
  },
  {
    img: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=500&q=80',
    tag: '✂️ Grooming', title: 'Full Grooming Package',
    desc: 'Bath, breed-specific haircut, nail trim, ear clean and blow-dry.',
    price: '45', unit: '60 min', rating: '4.9', reviews: '127',
  },
  {
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&q=80',
    tag: '🐶 Training', title: 'Puppy Starter Training',
    desc: 'Foundation commands and socialisation for puppies 8–16 weeks.',
    price: '60', unit: '4 sessions', rating: '4.8', reviews: '89',
  },
  {
    img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&q=80',
    tag: '🦮 Walking', title: 'Daily Dog Walking',
    desc: 'Safe, fun walks with experienced handlers in your neighbourhood.',
    price: '20', unit: '45 min', rating: '4.8', reviews: '94',
  },
  {
    img: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&q=80',
    tag: '🏠 Sitting', title: 'Cat Sitting',
    desc: 'In-home care so your cat stays relaxed in their own environment.',
    price: '30', unit: 'full day', rating: '4.7', reviews: '58',
  },
  {
    img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&q=80',
    tag: '💉 Vaccination', title: 'Vaccine Package',
    desc: 'Core and non-core vaccines tailored to age, breed, and lifestyle.',
    price: '55', unit: '20 min', rating: '4.9', reviews: '176',
  },
  {
    img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&q=80',
    tag: '🏨 Boarding', title: 'Pet Hotel Stay',
    desc: 'Cozy rooms, daily play sessions and 24/7 supervision for your pet.',
    price: '40', unit: 'per night', rating: '4.9', reviews: '102',
  },
  {
    img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&q=80',
    tag: '🧠 Behavior', title: 'Behavior Correction',
    desc: 'Address aggression, anxiety and destructive habits positively.',
    price: '80', unit: 'package', rating: '4.8', reviews: '67',
  },
  {
    img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&q=80',
    tag: '💅 Nail care', title: 'Nail Trim & File',
    desc: 'Safe and stress-free nail trimming for cats and dogs of all sizes.',
    price: '12', unit: 'session', rating: '4.7', reviews: '143',
  },
  {
    img: 'https://images.unsplash.com/photo-1597633425046-08f5110420b5?w=500&q=80',
    tag: '💊 Treatment', title: 'Specialised Treatment',
    desc: 'Diagnosis and care for skin, digestive, orthopedic, and chronic conditions.',
    price: '65', unit: 'session', rating: '5.0', reviews: '88',
  },
  {
    img: 'https://images.unsplash.com/photo-1604916851289-390068e23f08?w=500&q=80',
    tag: '🚗 Transport', title: 'Safe Pet Taxi',
    desc: 'Climate-controlled transport to vets, groomers, or anywhere in Baku.',
    price: '15', unit: 'per trip', rating: '4.8', reviews: '55',
  },
  {
    img: 'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=500&q=80',
    tag: '🎯 Training', title: '1-on-1 Private Sessions',
    desc: 'Personalised programs for advanced commands and sport preparation.',
    price: '50', unit: 'session', rating: '5.0', reviews: '41',
  },
]

const filters = ['All', '🩺 Veterinary', '✂️ Grooming', '🐶 Training', '🏨 Boarding', '🚗 Transport']

export default function Services({ setPage }) {
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? allServices
    : allServices.filter((s) => s.tag.includes(active.slice(3)))

  return (
    <div style={{ background: 'var(--warm-white)', minHeight: '100vh' }}>

      <Navbar setPage={setPage} activePage="services" />

      <div className="services-page-hero">
        <div className="services-page-hero-inner">
          <p className="section-eyebrow" style={{ textAlign: 'center' }}>Everything your pet needs</p>
          <h1>All <em>services</em></h1>
          <p>Explore every way Paws.az helps you care for your beloved companion.</p>
          <div className="services-search-bar">
            <span>🔍</span>
            <input type="text" placeholder="Search services, providers..." />
            <button className="btn-primary">Search</button>
          </div>
        </div>
      </div>

      <div className="services-all">
        <div className="section-max">

          <div className="services-stats-row">
            <div className="services-stat-pill">🐾 {allServices.length} services available</div>
            <div className="services-stat-pill">⭐ 4.8 average rating</div>
            <div className="services-stat-pill">👩‍⚕️ 320+ verified providers</div>
            <div className="services-stat-pill">🇦🇿 Baku and nearby areas</div>
          </div>

          <div className="services-filter-row">
            {filters.map((f) => (
              <button
                key={f}
                className={'filter-btn' + (active === f ? ' active' : '')}
                onClick={() => setActive(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="services-page-grid">
            {filtered.map((s) => (
              <div className="product-card" key={s.title} onClick={() => setPage('login')}>
                <div className="product-card-img">
                  <img src={s.img} alt={s.title} />
                  <div className="product-card-fav">🤍</div>
                  <div className="service-tag">{s.tag}</div>
                </div>
                <div className="product-card-body">
                  <h4>{s.title}</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-light)', marginBottom: '10px', lineHeight: '1.5' }}>
                    {s.desc}
                  </p>
                  <div className="card-meta">
                    <span className="card-rating">
                      ⭐ {s.rating}
                      <span style={{ color: 'var(--text-light)' }}> ({s.reviews})</span>
                    </span>
                    <span className="card-time">🕐 {s.unit}</span>
                  </div>
                  <div className="card-bottom">
                    <div className="card-price">₼{s.price}</div>
                    <button
                      className="btn-add"
                      onClick={(e) => { e.stopPropagation(); setPage('login') }}
                    >
                      Book now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}