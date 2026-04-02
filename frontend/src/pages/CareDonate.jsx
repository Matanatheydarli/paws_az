import { useState } from 'react'
import Navbar from '../components/Navbar'

export default function CareDonate({ setPage }) {
  const [donationAmount, setDonationAmount] = useState('20')
  const [customAmount, setCustomAmount] = useState('')
  const [donated, setDonated] = useState(false)

  const pets = [
    {
      img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&q=80',
      name: 'Buddy', breed: 'Golden Retriever', age: '2 years', gender: '♂ Male',
      tag: 'Needs home', tagColor: '#5db87a',
    },
    {
      img: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&q=80',
      name: 'Luna', breed: 'Siamese Cat', age: '1 year', gender: '♀ Female',
      tag: 'Available', tagColor: '#7ab8e8',
    },
    {
      img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&q=80',
      name: 'Max', breed: 'Labrador Mix', age: '3 years', gender: '♂ Male',
      tag: 'Needs home', tagColor: '#5db87a',
    },
    {
      img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&q=80',
      name: 'Mochi', breed: 'Shiba Inu', age: '4 years', gender: '♀ Female',
      tag: 'Senior', tagColor: '#f5c842',
    },
    {
      img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&q=80',
      name: 'Cleo', breed: 'Tabby Cat', age: '6 months', gender: '♀ Female',
      tag: 'Kitten', tagColor: '#f0826a',
    },
    {
      img: 'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=500&q=80',
      name: 'Rocky', breed: 'Border Collie', age: '5 years', gender: '♂ Male',
      tag: 'Available', tagColor: '#7ab8e8',
    },
  ]

  const amounts = ['10', '20', '50', '100']

  const shelters = [
    { icon: '🏠', name: 'Baku Animal Rescue', desc: 'Caring for 200+ homeless animals in Baku since 2015.', raised: '₼12,400', goal: '₼20,000', pct: 62 },
    { icon: '🐕', name: 'Paws & Hope Shelter', desc: 'No-kill shelter providing medical care and rehoming services.', raised: '₼8,750', goal: '₼15,000', pct: 58 },
    { icon: '🐈', name: 'Cat Haven Baku', desc: 'Dedicated to rescuing, neutering and rehoming stray cats.', raised: '₼5,200', goal: '₼10,000', pct: 52 },
  ]

  return (
    <div className="cd-page">

      <Navbar setPage={setPage} activePage="care-donate" />

      {/* ── HERO ── */}
      <section className="cd-hero">
        <div className="cd-hero-content">
          <h1>Change a Life Today:<br />Adopt or Donate</h1>
          <p>
            Whether you welcome a pet into your home or support us with a
            donation, your kindness makes a world of difference.
          </p>
          <div className="cd-hero-btns">
            <button
              className="cd-btn-teal"
              onClick={() => document.getElementById('cd-adopt').scrollIntoView({ behavior: 'smooth' })}
            >
              Meet Our Pets ↗
            </button>
            <button
              className="cd-btn-yellow"
              onClick={() => document.getElementById('cd-donate').scrollIntoView({ behavior: 'smooth' })}
            >
              Donate now ↗
            </button>
          </div>
        </div>
        <div className="cd-hero-img">
          <img
            src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200&q=85"
            alt="Dog and cat"
          />
          <div className="cd-hero-overlay" />
        </div>
      </section>

      {/* ── IMPACT STATS ── */}
      <section className="cd-stats-bar">
        {[
          { num: '1,240+', label: 'Animals rescued' },
          { num: '890+',   label: 'Successful adoptions' },
          { num: '3',      label: 'Partner shelters' },
          { num: '₼48k+',  label: 'Donations raised' },
        ].map((s) => (
          <div className="cd-stat" key={s.label}>
            <h3>{s.num}</h3>
            <p>{s.label}</p>
          </div>
        ))}
      </section>

      {/* ── ADOPT ── */}
      <section className="cd-section cd-adopt-section" id="cd-adopt">
        <div className="cd-section-inner">
          <p className="section-eyebrow" style={{ textAlign: 'center' }}>Find your companion</p>
          <h2 className="cd-section-title">Pets waiting for a <em>home</em></h2>
          <div className="cd-pets-grid">
            {pets.map((pet) => (
              <div className="cd-pet-card" key={pet.name}>
                <div className="cd-pet-img">
                  <img src={pet.img} alt={pet.name} />
                  <span className="cd-pet-tag" style={{ background: pet.tagColor }}>
                    {pet.tag}
                  </span>
                  <button className="cd-pet-fav">🤍</button>
                </div>
                <div className="cd-pet-body">
                  <div className="cd-pet-header">
                    <h4>{pet.name}</h4>
                    <span className="cd-pet-gender">{pet.gender}</span>
                  </div>
                  <p className="cd-pet-breed">{pet.breed}</p>
                  <p className="cd-pet-age">🎂 {pet.age}</p>
                  <button className="cd-adopt-btn">Meet {pet.name} →</button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <button className="btn-outline" style={{ padding: '14px 36px', fontSize: '15px' }}>
              View all available pets →
            </button>
          </div>
        </div>
      </section>

      {/* ── HOW ADOPTION WORKS ── */}
      <section className="cd-section cd-how-section">
        <div className="cd-section-inner">
          <p className="section-eyebrow" style={{ textAlign: 'center' }}>Simple process</p>
          <h2 className="cd-section-title">How <em>adoption</em> works</h2>
          <div className="cd-how-steps">
            {[
              { icon: '🔍', step: '01', title: 'Browse profiles',  desc: 'Explore our available pets, filter by species, age, and size to find your perfect match.' },
              { icon: '📋', step: '02', title: 'Apply online',     desc: 'Fill out a short adoption application so we can match you with the right companion.' },
              { icon: '🤝', step: '03', title: 'Meet and greet',   desc: 'Schedule a visit to meet your potential pet and see if it is a good fit for your home.' },
              { icon: '🏠', step: '04', title: 'Welcome home',     desc: 'Complete the adoption paperwork and bring your new family member home!' },
            ].map((s) => (
              <div className="cd-how-step" key={s.step}>
                <div className="cd-how-icon">{s.icon}</div>
                <div className="cd-how-num">{s.step}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DONATE ── */}
      <section className="cd-section cd-donate-section" id="cd-donate">
        <div className="cd-section-inner cd-donate-grid">

          <div>
            <p className="section-eyebrow">Support shelters</p>
            <h2 className="cd-section-title" style={{ textAlign: 'left', marginBottom: '28px' }}>
              Where your money <em>goes</em>
            </h2>
            <div className="cd-shelters">
              {shelters.map((s) => (
                <div className="cd-shelter-card" key={s.name}>
                  <div className="cd-shelter-icon">{s.icon}</div>
                  <div className="cd-shelter-info">
                    <h4>{s.name}</h4>
                    <p>{s.desc}</p>
                    <div className="cd-progress-bar">
                      <div className="cd-progress-fill" style={{ width: s.pct + '%' }} />
                    </div>
                    <div className="cd-shelter-nums">
                      <span>{s.raised} raised</span>
                      <span>Goal: {s.goal}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="cd-donate-card">
              {!donated ? (
                <>
                  <h3>Make a donation</h3>
                  <p>Every manat helps feed, heal, and rehome an animal in need.</p>

                  <div className="cd-amount-grid">
                    {amounts.map((a) => (
                      <button
                        key={a}
                        className={'cd-amount-btn' + (donationAmount === a && !customAmount ? ' selected' : '')}
                        onClick={() => { setDonationAmount(a); setCustomAmount('') }}
                      >
                        ₼{a}
                      </button>
                    ))}
                  </div>

                  <div className="login-field" style={{ marginTop: '12px' }}>
                    <label>Or enter custom amount (₼)</label>
                    <input
                      type="number"
                      placeholder="e.g. 75"
                      value={customAmount}
                      onChange={(e) => { setCustomAmount(e.target.value); setDonationAmount('') }}
                    />
                  </div>

                  <div className="login-field">
                    <label>Donate to</label>
                    <select style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #d8e8dc', borderRadius: '8px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', background: 'white', outline: 'none' }}>
                      <option>Where it is needed most</option>
                      <option>Baku Animal Rescue</option>
                      <option>Paws and Hope Shelter</option>
                      <option>Cat Haven Baku</option>
                    </select>
                  </div>

                  <div className="login-field">
                    <label>Your name (optional)</label>
                    <input type="text" placeholder="Anonymous" />
                  </div>

                  <div className="login-field">
                    <label>Message (optional)</label>
                    <textarea
                      placeholder="Leave a kind word for the animals..."
                      style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #d8e8dc', borderRadius: '8px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', background: 'white', outline: 'none', minHeight: '80px', resize: 'vertical' }}
                    />
                  </div>

                  <button className="cd-donate-submit" onClick={() => setDonated(true)}>
                    Donate ₼{customAmount || donationAmount} now 💚
                  </button>

                  <p className="cd-secure-note">🔒 Secure payment · 100% goes to shelters</p>
                </>
              ) : (
                <div className="cd-donate-success">
                  <div style={{ fontSize: '60px', marginBottom: '16px' }}>💚</div>
                  <h3>Thank you so much!</h3>
                  <p>
                    Your donation of <strong>₼{customAmount || donationAmount}</strong> will
                    make a real difference for animals in need across Azerbaijan.
                  </p>
                  <button className="cd-donate-submit" onClick={() => { setDonated(false); setCustomAmount('') }}>
                    Donate again
                  </button>
                  <button
                    className="btn-outline"
                    style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
                    onClick={() => setPage('home')}
                  >
                    Back to home
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ── VOLUNTEER ── */}
      <section className="cd-section cd-volunteer-section">
        <div className="cd-section-inner">
          <div className="cd-volunteer-card">
            <div className="cd-volunteer-text">
              <p className="section-eyebrow">Get involved</p>
              <h2>Can't adopt? <em>Volunteer</em> or foster!</h2>
              <p>
                You do not need to adopt to make a difference. Foster a pet temporarily,
                volunteer at a shelter, or help spread the word. Every act of kindness counts.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '24px' }}>
                <button className="btn-primary" style={{ padding: '14px 28px' }}>Become a volunteer</button>
                <button className="btn-outline" style={{ padding: '14px 28px' }}>Foster a pet</button>
              </div>
            </div>
            <div className="cd-volunteer-img">
              <img
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80"
                alt="Volunteer with dog"
              />
            </div>
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