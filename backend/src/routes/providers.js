const express  = require('express')
const router   = express.Router()
const { store } = require('../db/store')
const { protect, authorize } = require('../middleware/auth')

function populateProvider(provider) {
  const user = store.findById('users', provider.user)
  const services = store.find('services', (s) => s.provider === provider._id)
  return {
    ...provider,
    user: user ? { _id: user._id, name: user.name, email: user.email, avatar: user.avatar } : null,
    services,
  }
}

// GET /api/providers
router.get('/', (req, res) => {
  const { category, city, search } = req.query
  let providers = store.find('providers', (p) => p.status === 'approved' && p.isActive)

  if (category) providers = providers.filter((p) => p.category === category)
  if (city)     providers = providers.filter((p) => p.city === city)
  if (search)   providers = providers.filter((p) => p.businessName.toLowerCase().includes(search.toLowerCase()))

  res.status(200).json({ success: true, count: providers.length, data: providers.map(populateProvider) })
})

// GET /api/providers/me
router.get('/me', protect, authorize('provider', 'admin'), (req, res) => {
  const provider = store.findOne('providers', (p) => p.user === req.user._id)
  if (!provider) return res.status(404).json({ success: false, message: 'Provider profile not found' })
  res.status(200).json({ success: true, data: populateProvider(provider) })
})

// GET /api/providers/me/stats
router.get('/me/stats', protect, authorize('provider', 'admin'), (req, res) => {
  const provider = store.findOne('providers', (p) => p.user === req.user._id)
  if (!provider) return res.status(404).json({ success: false, message: 'Not found' })

  const bookings = store.find('bookings', (b) => b.provider === provider._id)
  const result   = { total: bookings.length, pending: 0, confirmed: 0, completed: 0, rejected: 0, cancelled: 0, revenue: 0 }

  bookings.forEach((b) => {
    const key = b.status.toLowerCase()
    if (result[key] !== undefined) result[key]++
    if (b.status === 'Completed') result.revenue += b.price
  })

  res.status(200).json({ success: true, data: result })
})

// GET /api/providers/:id
router.get('/:id', (req, res) => {
  const provider = store.findById('providers', req.params.id)
  if (!provider) return res.status(404).json({ success: false, message: 'Provider not found' })
  res.status(200).json({ success: true, data: populateProvider(provider) })
})

// POST /api/providers/register
router.post('/register', protect, (req, res) => {
  const existing = store.findOne('providers', (p) => p.user === req.user._id)
  if (existing) return res.status(400).json({ success: false, message: 'Provider profile already exists' })

  const provider = store.create('providers', {
    user: req.user._id,
    ...req.body,
    rating: 0, totalReviews: 0,
    isVerified: false, isActive: true, status: 'pending',
    gallery: [], breaks: [], unavailableDates: [],
  })

  store.update('users', req.user._id, { role: 'provider' })
  res.status(201).json({ success: true, data: provider })
})

// PUT /api/providers/me
router.put('/me', protect, authorize('provider', 'admin'), (req, res) => {
  const provider = store.findOne('providers', (p) => p.user === req.user._id)
  if (!provider) return res.status(404).json({ success: false, message: 'Not found' })
  const updated = store.update('providers', provider._id, req.body)
  res.status(200).json({ success: true, data: updated })
})

// PUT /api/providers/me/schedule
router.put('/me/schedule', protect, authorize('provider', 'admin'), (req, res) => {
  const provider = store.findOne('providers', (p) => p.user === req.user._id)
  if (!provider) return res.status(404).json({ success: false, message: 'Not found' })
  const { workingHours, breaks, unavailableDates } = req.body
  const updated = store.update('providers', provider._id, { workingHours, breaks, unavailableDates })
  res.status(200).json({ success: true, data: updated })
})

module.exports = router