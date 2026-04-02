import Navbar from '../components/Navbar'

export default function Favourites({ setPage, favourites = [], allProducts = [], onToggleFav, onAddToCart, addedId }) {
  const favProducts = allProducts.filter((p) => favourites.includes(p.id))

  function speciesIcon(s) {
    const map = { Dogs: '🐶', Cats: '🐱', Rabbit: '🐰', Hamster: '🐹', 'Guinea Pig': '🐾', Birds: '🐦', Fish: '🐠' }
    return map[s] || '🐾'
  }

  return (
    <div className="fav-page">
      <Navbar setPage={setPage} activePage="favourites" wishlistCount={favourites.length} />

      <div className="fav-hero">
        <div className="fav-hero-inner">
          <div className="fav-hero-icon">❤️</div>
          <h1>My Favourites</h1>
          <p>
            {favProducts.length === 0
              ? "You haven't saved anything yet."
              : `${favProducts.length} item${favProducts.length > 1 ? 's' : ''} saved`}
          </p>
        </div>
      </div>

      <div className="fav-content">
        {favProducts.length === 0 ? (
          <div className="fav-empty">
            <div className="fav-empty-icon">🤍</div>
            <h2>Nothing saved yet</h2>
            <p>Tap the heart icon on any product to save it here for later.</p>
            <div className="fav-empty-actions">
              <button className="btn-primary" onClick={() => setPage('shop')}>Browse Shop</button>
              <button className="btn-outline" onClick={() => setPage('home')}>Go Home</button>
            </div>
          </div>
        ) : (
          <>
            <div className="fav-toolbar">
              <span className="fav-count">{favProducts.length} saved item{favProducts.length > 1 ? 's' : ''}</span>
              <button className="btn-outline fav-shop-btn" onClick={() => setPage('shop')}>← Keep shopping</button>
            </div>

            <div className="fav-grid">
              {favProducts.map((p) => (
                <div className="fav-card" key={p.id}>
                  <div className="fav-card-img">
                    <img src={p.img} alt={p.name} />
                    {p.badge && (
                      <span className="fav-badge" style={{ background: p.badgeColor }}>{p.badge}</span>
                    )}
                    <button
                      className="fav-heart-btn"
                      onClick={() => onToggleFav && onToggleFav(p.id)}
                      title="Remove from favourites"
                    >
                      ❤️
                    </button>
                  </div>

                  <div className="fav-card-body">
                    <div className="fav-card-meta-top">
                      <span className="fav-species-tag">{speciesIcon(p.species)} {p.species}</span>
                      <span className="fav-rating">★ {p.rating}</span>
                    </div>
                    <h4>{p.name}</h4>
                    <p className="fav-brand">{p.brand}</p>
                    <div className="fav-card-footer">
                      <div className="fav-price">
                        <strong>{p.price} AZN</strong>
                        <span>{p.unit}</span>
                      </div>
                      <button
                        className={'fav-add-btn' + (addedId === p.id ? ' added' : '')}
                        onClick={() => onAddToCart && onAddToCart(p.id)}
                      >
                        {addedId === p.id ? '✓ Added' : '🛒 Add to cart'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <footer style={{ background: 'var(--text-dark)', padding: '40px clamp(20px,5vw,80px)', marginTop: '60px' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', fontWeight: 700, color: 'var(--green-300)' }}>🐾 Paws.az</div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>© 2026 Paws.az. All rights reserved.</p>
          <button className="btn-outline" style={{ borderColor: 'var(--green-400)', color: 'var(--green-300)' }} onClick={() => setPage('home')}>Back to home</button>
        </div>
      </footer>
    </div>
  )
}