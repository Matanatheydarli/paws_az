const express  = require('express')
const router   = express.Router()
const { store } = require('../db/store')
const { protect, authorize } = require('../middleware/auth')

function populateBooking(booking) {
  const user     = store.findById('users',     booking.user)
  const service  = store.findById('services',  booking.service)
  const provider = store.findById('providers', booking.provider)
  return {
    ...booking,
    user:     user     ? { _id: user._id,     name: user.name,                 email: user.email,     phone: user.phone }     : null,
    service:  service  ? { _id: service._id,  name: service.name,              price: service.price,  duration: service.duration } : null,
    provider: provider ? { _id: provider._id, businessName: provider.businessName, city: provider.city, logo: provider.logo }   : null,
  }
}

function notifyUser(recipientId, type, title, message) {
  store.create('notifications', { recipient: recipientId, type, title, message, isRead: false })
}

// POST /api/bookings
router.post('/', protect, authorize('user'), (req, res) => {
  const service  = store.findById('services',  req.body.service)
  const provider = store.findById('providers', req.body.provider)
  if (!service)  return res.status(404).json({ success: false, message: 'Service not found' })
  if (!provider) return res.status(404).json({ success: false, message: 'Provider not found' })

  const booking = store.create('bookings', {
    user:     req.user._id,
    provider: provider._id,
    service:  service._id,
    price:    service.price,
    duration: service.duration,
    status:   'Pending',
    ...req.body,
  })

  // notify provider
  const provUser = store.findById('users', provider.user)
  if (provUser) {
    notifyUser(provUser._id, 'booking', 'New Booking Request',
      `New booking from ${req.user.name} for ${service.name}`)
  }

  res.status(201).json({ success: true, data: populateBooking(booking) })
})

// GET /api/bookings/my
router.get('/my', protect, authorize('user'), (req, res) => {
  const { status } = req.query
  let bookings = store.find('bookings', (b) => b.user === req.user._id)
  if (status) bookings = bookings.filter((b) => b.status === status)
  bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  res.status(200).json({ success: true, count: bookings.length, data: bookings.map(populateBooking) })
})

// GET /api/bookings/provider
router.get('/provider', protect, authorize('provider'), (req, res) => {
  const provider = store.findOne('providers', (p) => p.user === req.user._id)
  if (!provider) return res.status(404).json({ success: false, message: 'Provider not found' })

  const { status } = req.query
  let bookings = store.find('bookings', (b) => b.provider === provider._id)
  if (status) bookings = bookings.filter((b) => b.status === status)
  bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  res.status(200).json({ success: true, count: bookings.length, total: bookings.length, data: bookings.map(populateBooking) })
})

// GET /api/bookings/:id
router.get('/:id', protect, (req, res) => {
  const booking  = store.findById('bookings', req.params.id)
  if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' })

  const provider = store.findOne('providers', (p) => p.user === req.user._id)
  const isOwner  = booking.user === req.user._id
  const isProv   = provider && booking.provider === provider._id

  if (!isOwner && !isProv && req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Not authorized' })
  }
  res.status(200).json({ success: true, data: populateBooking(booking) })
})

// PUT /api/bookings/:id/status  (provider)
router.put('/:id/status', protect, authorize('provider'), (req, res) => {
  const { status, reason } = req.body
  const provider = store.findOne('providers', (p) => p.user === req.user._id)
  if (!provider) return res.status(404).json({ success: false, message: 'Provider not found' })

  const booking = store.findById('bookings', req.params.id)
  if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' })
  if (booking.provider !== provider._id) return res.status(403).json({ success: false, message: 'Not authorized' })

  const valid = {
    Pending:   ['Confirmed', 'Rejected'],
    Confirmed: ['Completed', 'Cancelled'],
  }
  if (!valid[booking.status]?.includes(status)) {
    return res.status(400).json({ success: false, message: `Cannot change from ${booking.status} to ${status}` })
  }

  const updates = { status }
  if (status === 'Confirmed')  updates.confirmedAt  = new Date()
  if (status === 'Completed')  updates.completedAt  = new Date()
  if (status === 'Rejected')   updates.rejectionReason   = reason || ''
  if (status === 'Cancelled')  updates.cancellationReason = reason || ''

  const updated = store.update('bookings', req.params.id, updates)

  const msgs = {
    Confirmed: ['booking',      'Booking Confirmed!',  'Your booking has been confirmed.'],
    Completed: ['completed',    'Booking Completed',   'Your booking is marked as completed.'],
    Rejected:  ['cancellation', 'Booking Rejected',    'Your booking request was rejected.'],
    Cancelled: ['cancellation', 'Booking Cancelled',   'Your booking was cancelled by the provider.'],
  }
  const m = msgs[status]
  if (m) notifyUser(booking.user, m[0], m[1], m[2])

  res.status(200).json({ success: true, data: populateBooking(updated) })
})

// PUT /api/bookings/:id/cancel  (user)
router.put('/:id/cancel', protect, authorize('user'), (req, res) => {
  const booking = store.findById('bookings', req.params.id)
  if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' })
  if (booking.user !== req.user._id) return res.status(403).json({ success: false, message: 'Not authorized' })
  if (!['Pending', 'Confirmed'].includes(booking.status)) {
    return res.status(400).json({ success: false, message: 'Cannot cancel this booking' })
  }

  const updated = store.update('bookings', req.params.id, {
    status: 'Cancelled',
    cancellationReason: req.body.reason || 'Cancelled by user',
    cancelledAt: new Date(),
  })

  const provider = store.findById('providers', booking.provider)
  if (provider) {
    const provUser = store.findById('users', provider.user)
    if (provUser) notifyUser(provUser._id, 'cancellation', 'Booking Cancelled', 'A booking was cancelled by the customer.')
  }

  res.status(200).json({ success: true, data: populateBooking(updated) })
})

module.exports = router