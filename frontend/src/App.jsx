import { useState } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Services from './pages/Services'
import Dashboard from './pages/Dashboard'
import BecomeProvider from './pages/BecomeProvider'
import CareDonate from './pages/CareDonate'
import Shop from './pages/Shop'
import Contact from './pages/Contact'
import Favourites from './pages/Favourites'
import Cart from './pages/Cart'
import Search from './pages/Search'
import Blog from './pages/Blog'
import ProviderApp from './provider/ProviderApp'
import { ALL_PRODUCTS } from './data/products'

export default function App() {
  const [page,        setPage]        = useState('provider')
  const [wishlist,    setWishlist]    = useState([])
  const [cart,        setCart]        = useState([])
  const [addedId,     setAddedId]     = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  function toggleFav(id) {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  function addToCart(id) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id)
      if (existing) return prev.map((i) => i.id === id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { id, qty: 1 }]
    })
    setAddedId(id)
    setTimeout(() => setAddedId(null), 1500)
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((i) => i.id !== id))
  }

  function updateQty(id, qty) {
    if (qty <= 0) return removeFromCart(id)
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, qty } : i))
  }

  function goSearch(query) {
    setSearchQuery(query)
    setPage('search')
  }

  const cartCount     = cart.reduce((s, i) => s + i.qty, 0)
  const wishlistCount = wishlist.length
  const shared = { setPage, wishlist, toggleFav, cart, addToCart, addedId, cartCount, wishlistCount }

  // Provider panel — completely separate
  if (page === 'provider') return <ProviderApp setPage={setPage} />

  if (page === 'login')           return <Login          setPage={setPage} />
  if (page === 'services')        return <Services       setPage={setPage} />
  if (page === 'dashboard')       return <Dashboard      setPage={setPage} />
  if (page === 'become-provider') return <BecomeProvider setPage={setPage} />
  if (page === 'care-donate')     return <CareDonate     setPage={setPage} />
  if (page === 'shop')            return <Shop           {...shared} />
  if (page === 'contact')         return <Contact        setPage={setPage} />
  if (page === 'blog')            return <Blog           setPage={setPage} />
  if (page === 'search')          return <Search         setPage={setPage} query={searchQuery} goSearch={goSearch} cartCount={cartCount} wishlistCount={wishlistCount} />
  if (page === 'favourites')      return (
    <Favourites
      setPage={setPage}
      favourites={wishlist}
      allProducts={ALL_PRODUCTS}
      onToggleFav={toggleFav}
      onAddToCart={addToCart}
      addedId={addedId}
      wishlistCount={wishlistCount}
      cartCount={cartCount}
    />
  )
  if (page === 'cart') return (
    <Cart
      setPage={setPage}
      cart={cart}
      allProducts={ALL_PRODUCTS}
      onRemove={removeFromCart}
      onUpdateQty={updateQty}
      wishlistCount={wishlistCount}
    />
  )
  return <Home setPage={setPage} goSearch={goSearch} wishlistCount={wishlistCount} cartCount={cartCount} />
}