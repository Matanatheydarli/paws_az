const express  = require('express')
const router   = express.Router()
const { store } = require('../db/store')
const { protect, authorize } = require('../middleware/auth')

function populateService(service) {
  const provider = store.findById('providers', service.provider)
  return {
    ...service,
    provider: provider
      ? { _id: provider._id, businessName: provider.businessName, city: provider.city, rating: provider.rating, logo: provider.logo }
      : null,
  }
}

// GET /api/services
router.get('/', (req, res) => {
  const { category, search } = req.query
  let services = store.find('services', (s) => s.isActive)
  if (category) services = services.filter((s) => s.category === category)
  if (search)   services = services.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
  res.status(200).json({ success: true, count: services.length, data: services.map(populateService) })
})

// GET /api/services/my
router.get('/my', protect, authorize('provider'), (req, res) => {
  const provider = store.findOne('providers', (p) => p.user === req.user._id)
  if (!provider) return res.status(404).json({ success: false, message: 'Provider not found' })
  const services = store.find('services', (s) => s.provider === provider._id)
  res.status(200).json({ success: true, count: services.length, data: services })
})

// GET /api/services/:id
router.get('/:id', (req, res) => {
  const service = store.findById('services', req.params.id)
  if (!service) return res.status(404).json({ success: false, message: 'Service not found' })
  res.status(200).json({ success: true, data: populateService(service) })
})

// POST /api/services
router.post('/', protect, authorize('provider'), (req, res) => {
  const provider = store.findOne('providers', (p) => p.user === req.user._id)
  if (!provider) return res.status(404).json({ success: false, message: 'Provider not found' })
  const service  = store.create('services', { provider: provider._id, ...req.body, totalBookings: 0, rating: 0 })
  res.status(201).json({ success: true, data: service })
})

// PUT /api/services/:id
router.put('/:id', protect, authorize('provider'), (req, res) => {
  const provider = store.findOne('providers', (p) => p.user === req.user._id)
  const service  = store.findById('services', req.params.id)
  if (!service)  return res.status(404).json({ success: false, message: 'Service not found' })
  if (service.provider !== provider._id) return res.status(403).json({ success: false, message: 'Not authorized' })
  const updated  = store.update('services', req.params.id, req.body)
  res.status(200).json({ success: true, data: updated })
})

// DELETE /api/services/:id
router.delete('/:id', protect, authorize('provider'), (req, res) => {
  const provider = store.findOne('providers', (p) => p.user === req.user._id)
  const service  = store.findById('services', req.params.id)
  if (!service)  return res.status(404).json({ success: false, message: 'Service not found' })
  if (service.provider !== provider._id) return res.status(403).json({ success: false, message: 'Not authorized' })
  store.delete('services', req.params.id)
  res.status(200).json({ success: true, message: 'Service deleted' })
})

module.exports = router