import React from 'react'

export default function ServiceDetail() {
  return (
    <div className="page page-detail active" style={{ background: 'var(--warm-white)' }}>
      <div className="detail-layout">
        <div>
          <div className="detail-images">
            <div className="main-img">
              <img src="https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=900&q=80" alt="Service" />
            </div>
            <div className="detail-thumb-row">
              <div className="detail-thumb">
                <img src="https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=300&q=80" alt="" />
              </div>
              <div className="detail-thumb">
                <img src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=300&q=80" alt="" />
              </div>
              <div className="detail-thumb">
                <img src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=300&q=80" alt="" />
              </div>
            </div>
          </div>

          <div style={{ marginTop: 36, background: 'white', padding: 32, borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-soft)' }}>
            <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 22, marginBottom: 16, letterSpacing: '-0.5px' }}>About this service</h3>
            <p style={{ fontSize: 15, color: 'var(--text-mid)', lineHeight: 1.8, marginBottom: 20 }}>
              Our Full Grooming Package includes a thorough bath with organic shampoo,
              professional haircut tailored to your dog's breed standard, nail trim and file,
              ear cleaning, and a luxurious blow-dry and brush-out. Your pet will leave
              looking and feeling their absolute best.
            </p>
            <p style={{ fontSize: 15, color: 'var(--text-mid)', lineHeight: 1.8 }}>
              All our groomers are certified professionals with years of experience handling
              all breeds and sizes. We use only pet-safe, hypoallergenic products and maintain
              the highest standards of hygiene in our salon.
            </p>
            <div style={{ display: 'flex', gap: 20, marginTop: 24, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-mid)' }}><span>✅</span> All breeds welcome</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-mid)' }}><span>✅</span> Organic products</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-mid)' }}><span>✅</span> Anxiety-free environment</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-mid)' }}><span>✅</span> Photo updates</div>
            </div>
          </div>
        </div>

        <div className="detail-info">
          <span className="detail-badge">✂️ Grooming</span>
          <h1>Full Grooming Package</h1>
          <div className="detail-rating">
            <span className="stars">★★★★★</span>
            <span style={{ fontSize: 16, fontWeight: 600 }}>4.9</span>
            <span className="rating-count">(127 reviews)</span>
          </div>
          <p>
            A complete grooming experience for your dog — from bath to blowout, nails to ears.
            Premium care, premium results, happy pup guaranteed.
          </p>

          <div className="booking-card">
            <h4>Book this service</h4>
            <div className="price-row">
              <span className="price-big">₼45</span>
              <span className="price-unit">per session</span>
            </div>
            <div className="form-field">
              <label>Select date</label>
              <input type="date" />
            </div>
            <div className="form-field">
              <label>Select time</label>
              <select>
                <option>10:00 AM</option>
                <option>11:30 AM</option>
                <option>2:00 PM</option>
                <option>3:30 PM</option>
                <option>5:00 PM</option>
              </select>
            </div>
            <div className="form-field">
              <label>Pet name</label>
              <input type="text" placeholder="e.g. Max" />
            </div>
            <div className="form-field">
              <label>Breed / size</label>
              <select>
                <option>Small (under 10kg)</option>
                <option>Medium (10–25kg)</option>
                <option>Large (25kg+)</option>
              </select>
            </div>
            <button className="btn-primary book-btn" type="button">Confirm booking 🐾</button>
          </div>

          <div style={{ background: 'var(--green-100)', borderRadius: 'var(--radius-md)', padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div className="vet-avatar">✂️</div>
            <div>
              <h5 style={{ fontSize: 14, fontWeight: 600 }}>Aynur Ismayilova</h5>
              <p style={{ fontSize: 12, color: 'var(--text-light)' }}>Certified Master Groomer • 8 years exp. • Paws Salon, Baku</p>
            </div>
            <div style={{ marginLeft: 'auto', fontWeight: 700, fontFamily: "'Fraunces',serif", color: 'var(--green-500)' }}>⭐ 4.9</div>
          </div>
        </div>
      </div>
    </div>
  )
}