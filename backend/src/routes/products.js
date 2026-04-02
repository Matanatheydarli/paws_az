const express  = require('express')
const router   = express.Router()
const { store } = require('../db/store')
const { protect, authorize } = require('../middleware/auth')

// GET /api/products
router.get('/', (req, res) => {
  const { category, species, search, sort } = req.query
  let products = store.find('products', (p) => p.isActive)

  if (category) products = products.filter((p) => p.category === category)
  if (species && species !== 'All') products = products.filter((p) => p.species === species || p.species === 'All')
  if (search)   products = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  )

  if (sort === 'price_asc')  products.sort((a, b) => a.price - b.price)
  if (sort === 'price_desc') products.sort((a, b) => b.price - a.price)
  if (sort === 'rating')     products.sort((a, b) => b.rating - a.rating)

  res.status(200).json({ success: true, count: products.length, total: products.length, data: products })
})

// GET /api/products/:id
router.get('/:id', (req, res) => {
  const product = store.findById('products', req.params.id)
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' })
  res.status(200).json({ success: true, data: product })
})

// POST /api/products  (admin)
router.post('/', protect, authorize('admin'), (req, res) => {
  const product = store.create('products', { ...req.body, rating: 0, totalReviews: 0, isActive: true })
  res.status(201).json({ success: true, data: product })
})

// PUT /api/products/:id  (admin)
router.put('/:id', protect, authorize('admin'), (req, res) => {
  const product = store.findById('products', req.params.id)
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' })
  const updated = store.update('products', req.params.id, req.body)
  res.status(200).json({ success: true, data: updated })
})

// DELETE /api/products/:id  (admin)
router.delete('/:id', protect, authorize('admin'), (req, res) => {
  store.delete('products', req.params.id)
  res.status(200).json({ success: true, message: 'Product deleted' })
})

module.exports = router