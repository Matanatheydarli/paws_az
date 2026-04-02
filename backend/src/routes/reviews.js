const express  = require('express')
const router   = express.Router()
const { store } = require('../db/store')
const { protect, authorize } = require('../middleware/auth')

// GET /api/reviews/provider/:providerId
router.get('/provider/:providerId', (req, res) => {
  const reviews = store.find('reviews', (r) => r.provider === req.params.providerId)
    .map((r) => {
      const user = store.findById('users', r.user)
      return { ...r, user: user ? { _id: user._id, name: user.name, avatar: user.avatar } : null }
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  res.status(200).json({ success: true, count: reviews.length, data: reviews })
})

// POST /api/reviews
router.post('/', protect, authorize('user'), (req, res) => {
  const booking = store.findById('bookings', req.body.booking)
  if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' })
  if (booking.user !== req.user._id) return res.status(403).json({ success: false, message: 'Not authorized' })
  if (booking.status !== 'Completed') return res.status(400).json({ success: false, message: 'Can only review completed bookings' })

  const existing = store.findOne('reviews', (r) => r.user === req.user._id && r.booking === req.body.booking)
  if (existing) return res.status(400).json({ success: false, message: 'Already reviewed' })

  const review = store.create('reviews', {
    user:     req.user._id,
    provider: booking.provider,
    service:  booking.service,
    booking:  booking._id,
    rating:   req.body.rating,
    comment:  req.body.comment || '',
  })

  // recalc provider rating
  const allReviews = store.find('reviews', (r) => r.provider === booking.provider)
  const avg = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
  store.update('providers', booking.provider, { rating: Math.round(avg * 10) / 10, totalReviews: allReviews.length })

  res.status(201).json({ success: true, data: review })
})

// DELETE /api/reviews/:id
router.delete('/:id', protect, (req, res) => {
  const review = store.findById('reviews', req.params.id)
  if (!review) return res.status(404).json({ success: false, message: 'Review not found' })
  if (review.user !== req.user._id && req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Not authorized' })
  }
  store.delete('reviews', req.params.id)
  res.status(200).json({ success: true, message: 'Review deleted' })
})

module.exports = router