import Navbar from '../components/Navbar'

export default function Cart({ setPage, cart = [], allProducts = [], onRemove, onUpdateQty, wishlistCount = 0 }) {

  const cartItems = cart.map((item) => ({
    ...item,
    product: allProducts.find((p) => p.id === item.id),
  })).filter((i) => i.product)

  const subtotal = cartItems.reduce((sum, i) => sum + i.product.price * i.qty, 0)
  const shipping = subtotal > 50 ? 0 : 4.99
  const total    = subtotal + shipping

  function speciesIcon(s) {
    const map = { Dogs:'🐶', Cats:'🐱', Rabbit:'🐰', Hamster:'🐹', 'Guinea Pig':'🐾', Birds:'🐦', Fish:'🐠' }
    return map[s] || '🐾'
  }

  return (
    <div className="cart-page">
      <Navbar setPage={setPage} activePage="cart" wishlistCount={wishlistCount} cartCount={cart.reduce((s,i)=>s+i.qty,0)} />

      <div className="cart-hero">
        <div className="cart-hero-inner">
          <div className="cart-hero-icon">🛒</div>
          <h1>Shopping Bag</h1>
          <p>{cartItems.length === 0 ? 'Your bag is empty' : `${cart.reduce((s,i)=>s+i.qty,0)} item${cart.reduce((s,i)=>s+i.qty,0)!==1?'s':''} in your bag`}</p>
        </div>
      </div>

      <div className="cart-content">
        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🛍️</div>
            <h2>Your bag is empty</h2>
            <p>Looks like you haven't added anything yet. Head to the shop and treat your pet!</p>
            <div className="cart-empty-actions">
              <button className="btn-primary" onClick={() => setPage('shop')}>Browse Shop</button>
              <button className="btn-outline" onClick={() => setPage('home')}>Go Home</button>
            </div>
          </div>
        ) : (
          <div className="cart-layout">

            <div className="cart-items">
              <div className="cart-items-header">
                <span>Product</span>
                <span>Qty</span>
                <span>Price</span>
              </div>

              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-img">
                    <img src={item.product.img} alt={item.product.name} />
                  </div>
                  <div className="cart-item-info">
                    <h4>{item.product.name}</h4>
                    <p className="cart-item-brand">{item.product.brand}</p>
                    <span className="cart-item-species">{speciesIcon(item.product.species)} {item.product.species}</span>
                    <span className="cart-item-unit">{item.product.unit}</span>
                  </div>
                  <div className="cart-item-qty">
                    <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.qty - 1)}>−</button>
                    <span>{item.qty}</span>
                    <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.qty + 1)}>+</button>
                  </div>
                  <div className="cart-item-price">
                    <strong>{(item.product.price * item.qty).toFixed(2)} AZN</strong>
                    <span>{item.product.price} AZN each</span>
                  </div>
                  <button className="cart-item-remove" onClick={() => onRemove(item.id)} title="Remove">✕</button>
                </div>
              ))}

              <div className="cart-continue">
                <button className="btn-outline" onClick={() => setPage('shop')}>← Continue Shopping</button>
              </div>
            </div>

            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="cart-summary-rows">
                <div className="cart-summary-row">
                  <span>Subtotal ({cart.reduce((s,i)=>s+i.qty,0)} items)</span>
                  <span>{subtotal.toFixed(2)} AZN</span>
                </div>
                <div className="cart-summary-row">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'free-ship' : ''}>{shipping === 0 ? 'FREE' : `${shipping.toFixed(2)} AZN`}</span>
                </div>
                {shipping > 0 && (
                  <div className="cart-free-ship-note">
                    Add <strong>{(50 - subtotal).toFixed(2)} AZN</strong> more for free shipping!
                  </div>
                )}
                <div className="cart-summary-divider" />
                <div className="cart-summary-row total">
                  <span>Total</span>
                  <span>{total.toFixed(2)} AZN</span>
                </div>
              </div>
              <button className="btn-primary cart-checkout-btn">Proceed to Checkout →</button>
              <div className="cart-badges">
                <span>🔒 Secure checkout</span>
                <span>🚚 Fast delivery</span>
                <span>↩️ Easy returns</span>
              </div>
            </div>

          </div>
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