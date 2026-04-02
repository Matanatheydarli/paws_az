/* ─────────────────────────────────────────
   All homepage sections below the hero:
   Recommendations · Did You Know · Vet
   Grooming · Training · Boarding · Help · Blog
───────────────────────────────────────── */

/* ── tiny sub-components ── */
function ProductCard({ img, title, rating, reviews, time, price, cta = 'Book now' }) {
  return (
    <div className="product-card">
      <div className="product-card-img">
        <img src={img} alt={title} />
        <div className="product-card-fav">🤍</div>
      </div>
      <div className="product-card-body">
        <h4>{title}</h4>
        <div className="card-meta">
          <span className="card-rating">⭐ {rating} <span style={{ color: 'var(--text-light)' }}>({reviews})</span></span>
          <span className="card-time">🕐 {time}</span>
        </div>
        <div className="card-bottom">
          <div className="card-price">₼{price}</div>
          <button className="btn-add">{cta}</button>
        </div>
      </div>
    </div>
  )
}

function ServiceCard({ img, tag, title, desc, price, unit, cta = 'Book →' }) {
  return (
    <div className="service-card">
      <div className="service-card-img">
        <img src={img} alt={title} />
        <span className="service-tag">{tag}</span>
      </div>
      <div className="service-card-body">
        <h4>{title}</h4>
        <p>{desc}</p>
        <div className="service-footer">
          <div className="service-price">₼{price} <span>/ {unit}</span></div>
          <button className="btn-add">{cta}</button>
        </div>
      </div>
    </div>
  )
}

function VetCard({ img, badge, title, desc, doctor, exp, rating }) {
  return (
    <div className="vet-card">
      <div className="vet-card-img"><img src={img} alt={title} /></div>
      <div className="vet-card-body">
        <span className="vet-badge">{badge}</span>
        <h3>{title}</h3>
        <p>{desc}</p>
        <div className="vet-doctor">
          <div className="vet-avatar">👩‍⚕️</div>
          <div className="vet-doc-info">
            <h5>{doctor}</h5>
            <p>{exp} · {rating} ⭐</p>
          </div>
        </div>
        <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
          Book appointment →
        </button>
      </div>
    </div>
  )
}

/* ── main export ── */
export default function Services() {
  return (
    <>
      {/* ── RECOMMENDATIONS ── */}
      <section className="reco-section section-pad">
        <div className="section-max">
          <div className="section-header">
            <div>
              <p className="section-eyebrow">Featured for you</p>
              <h2>Top picks this <em>week</em></h2>
            </div>
            <a className="btn-outline" href="#">View all →</a>
          </div>
          <div className="cards-grid">
            <ProductCard
              img="https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=500&q=80"
              title="Full Grooming Package" rating="4.9" reviews="127" time="60 min" price="45"
            />
            <ProductCard
              img="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&q=80"
              title="Daily Dog Walking" rating="4.8" reviews="94" time="45 min" price="20"
            />
            <ProductCard
              img="https://images.unsplash.com/photo-1599443015574-be5fe8a05783?w=500&q=80"
              title="Vet Consultation" rating="5.0" reviews="213" time="30 min" price="35"
            />
            <ProductCard
              img="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&q=80"
              title="Cat Sitting (per day)" rating="4.7" reviews="58" time="Full day" price="30"
            />
          </div>
        </div>
      </section>

      {/* ── DID YOU KNOW ── */}
      <div className="dyk-wrapper">
        <div className="did-you-know">
          <div className="dyk-content">
            <h2>Did you know? 🐾</h2>
            <p>
              Pets with regular vet check-ups live up to 3 years longer on average.
              Stay on top of your companion's health with Paws.az scheduled reminders and expert care.
            </p>
            <button className="btn-primary">Learn more</button>
          </div>
          <div className="dyk-tips">
            <div className="tip-card">
              <span className="tip-icon">💧</span>
              <div className="tip-text">
                <h5>Hydration matters</h5>
                <p>Dogs need 30 ml of water per kg of body weight daily.</p>
              </div>
            </div>
            <div className="tip-card">
              <span className="tip-icon">🦷</span>
              <div className="tip-text">
                <h5>Dental hygiene</h5>
                <p>Brush your pet's teeth 2–3 times a week to prevent gum disease.</p>
              </div>
            </div>
            <div className="tip-card">
              <span className="tip-icon">🏃</span>
              <div className="tip-text">
                <h5>Daily exercise</h5>
                <p>Most dogs need at least 30 minutes of activity per day.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── VET SERVICES ── */}
      <section className="vet-section section-pad">
        <div className="section-max">
          <div className="section-header">
            <div>
              <p className="section-eyebrow">Healthcare</p>
              <h2>Veterinary <em>services</em></h2>
            </div>
            <a className="btn-outline" href="#">All health services →</a>
          </div>
          <div className="vet-grid">
            <VetCard
              img="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=600&q=80"
              badge="🩺 Consultation" title="General Check-up"
              desc="Complete health assessment with physical exam, weight check, and personalised recommendations."
              doctor="Dr. Nigar Aliyeva" exp="7 years" rating="4.9"
            />
            <VetCard
              img="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80"
              badge="💉 Vaccination" title="Vaccine Package"
              desc="Core and non-core vaccines tailored to your pet's age, breed, and lifestyle."
              doctor="Dr. Eldar Mammadov" exp="12 years" rating="4.8"
            />
            <VetCard
              img="https://images.unsplash.com/photo-1597633425046-08f5110420b5?w=600&q=80"
              badge="💊 Treatment" title="Specialised Care"
              desc="Diagnosis and treatment for skin conditions, digestive issues, orthopedics, and chronic illness."
              doctor="Dr. Sevinj Hasanova" exp="9 years" rating="5.0"
            />
          </div>
        </div>
      </section>

      {/* ── GROOMING ── */}
      <section className="service-section-green section-pad">
        <div className="section-max">
          <div className="section-header">
            <div>
              <p className="section-eyebrow">Beauty & care</p>
              <h2>Grooming <em>services</em></h2>
            </div>
          </div>
          <div className="service-grid-3">
            <ServiceCard
              img="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=500&q=80"
              tag="✂️ Haircut" title="Full Haircut & Style"
              desc="Breed-specific cuts by certified groomers using premium tools."
              price="35" unit="session"
            />
            <ServiceCard
              img="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&q=80"
              tag="💅 Nail care" title="Nail Trim & File"
              desc="Safe and stress-free nail trimming for cats and dogs."
              price="12" unit="session"
            />
            <ServiceCard
              img="https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=500&q=80"
              tag="🛁 Washing" title="Spa Bath & Blow-dry"
              desc="Medicated or organic shampoos with deep conditioning treatment."
              price="25" unit="session"
            />
          </div>
        </div>
      </section>

      {/* ── TRAINING ── */}
      <section className="service-section-white section-pad">
        <div className="section-max">
          <div className="section-header">
            <div>
              <p className="section-eyebrow">Education</p>
              <h2>Training & <em>behavior</em></h2>
            </div>
          </div>
          <div className="service-grid-3">
            <ServiceCard
              img="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&q=80"
              tag="🐶 Puppy" title="Puppy Starter Training"
              desc="Foundation commands, socialisation, and confidence building for puppies 8–16 weeks."
              price="60" unit="4 sessions" cta="Enroll →"
            />
            <ServiceCard
              img="https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&q=80"
              tag="🧠 Behavior" title="Behavior Correction"
              desc="Address aggression, anxiety, and destructive habits with positive reinforcement."
              price="80" unit="package" cta="Enroll →"
            />
            <ServiceCard
              img="https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=500&q=80"
              tag="🎯 Individual" title="1-on-1 Private Sessions"
              desc="Personalised training programs for advanced commands and sport preparation."
              price="50" unit="session" cta="Enroll →"
            />
          </div>
        </div>
      </section>

      {/* ── BOARDING ── */}
      <section className="service-section-green section-pad">
        <div className="section-max">
          <div className="section-header">
            <div>
              <p className="section-eyebrow">Care & stay</p>
              <h2>Sitting & <em>boarding</em></h2>
            </div>
          </div>
          <div className="service-grid-3">
            <ServiceCard
              img="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&q=80"
              tag="🏨 Hotel" title="Pet Hotel Stay"
              desc="Cozy rooms, daily play sessions, and round-the-clock supervision."
              price="40" unit="night" cta="Reserve →"
            />
            <ServiceCard
              img="https://images.unsplash.com/photo-1601758064224-1c6d9e4f9b8f?w=500&q=80"
              tag="🚗 Taxi" title="Safe Pet Taxi"
              desc="Climate-controlled transport to vets, groomers, or anywhere in Baku."
              price="15" unit="trip"
            />
            <ServiceCard
              img="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&q=80"
              tag="🏠 Home sit" title="In-home Pet Sitting"
              desc="A trusted sitter comes to your home so your pet stays comfortable."
              price="25" unit="day"
            />
          </div>
        </div>
      </section>

      {/* ── HOW TO HELP ── */}
      <section className="help-section section-pad">
        <div className="section-max">
          <div className="section-header">
            <div>
              <p className="section-eyebrow">Community</p>
              <h2>How you can <em>help</em></h2>
            </div>
          </div>
          <div className="help-grid">
            {[
              { icon: '🎪', title: 'Pet Events',  text: 'Join local meetups, adoption fairs, and pet-friendly community events across Baku.', link: 'See events' },
              { icon: '🤝', title: 'Partners',    text: 'Become a verified service provider and reach thousands of pet owners on our platform.', link: 'Join us' },
              { icon: '🐈', title: 'Adoption',    text: 'Give a shelter animal a forever home. Browse adoptable pets in your area.', link: 'Meet them' },
              { icon: '💚', title: 'Donate',      text: 'Support local shelters and rescue organisations with food, supplies, and medical care.', link: 'Donate now' },
            ].map(({ icon, title, text, link }) => (
              <div className="help-card" key={title}>
                <span className="help-icon">{icon}</span>
                <h4>{title}</h4>
                <p>{text}</p>
                <a className="help-link" href="#">{link} →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG ── */}
      <section className="blog-section section-pad">
        <div className="section-max">
          <div className="section-header">
            <div>
              <p className="section-eyebrow">Knowledge</p>
              <h2>From the <em>blog</em></h2>
            </div>
            <a className="btn-outline" href="#">All articles →</a>
          </div>
          <div className="blog-grid">
            {[
              {
                img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80',
                cat: '🐾 Pet Health',
                title: '10 Signs Your Dog Needs a Vet Visit Right Away',
                desc: 'Learn to recognise the warning signs that require immediate veterinary attention — from unusual lethargy to changes in appetite and behaviour.',
                author: 'Leyla H.', date: 'Mar 15', read: '6 min',
              },
              {
                img: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&q=80',
                cat: '😺 Cat Care',
                title: 'Why Indoor Cats Still Need Regular Vet Check-ups',
                desc: 'Even cats that never go outside can develop serious health issues. Here is what to watch for.',
                author: 'Nigar R.', date: 'Mar 10', read: '4 min',
              },
              {
                img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&q=80',
                cat: '🎓 Training',
                title: 'Positive Reinforcement: The Science of Happy Training',
                desc: 'Modern dog training has moved away from dominance theories. Here is what research says actually works.',
                author: 'Orxan M.', date: 'Mar 5', read: '5 min',
              },
            ].map(({ img, cat, title, desc, author, date, read }) => (
              <div className="blog-card" key={title}>
                <div className="blog-card-img"><img src={img} alt={title} /></div>
                <div className="blog-card-body">
                  <p className="blog-category">{cat}</p>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <div className="blog-meta">
                    <strong>{author}</strong> · {date} · {read} read
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}