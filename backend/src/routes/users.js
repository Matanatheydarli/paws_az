const express  = require('express')
const router   = express.Router()
const { store, makeId } = require('../db/store')
const { protect, authorize } = require('../middleware/auth')

router.use(protect)

// GET /api/users/me
router.get('/me', (req, res) => {
  const { password, ...safeUser } = req.user
  res.status(200).json({ success: true, data: safeUser })
})

// PUT /api/users/me
router.put('/me', (req, res) => {
  const allowed = ['name', 'phone', 'avatar']
  const updates = {}
  allowed.forEach((f) => { if (req.body[f] !== undefined) updates[f] = req.body[f] })
  const user = store.update('users', req.user._id, updates)
  const { password, ...safeUser } = user
  res.status(200).json({ success: true, data: safeUser })
})

// POST /api/users/me/pets
router.post('/me/pets', (req, res) => {
  const user = store.findById('users', req.user._id)
  const pet  = { _id: makeId(), ...req.body }
  user.pets  = [...(user.pets || []), pet]
  store.update('users', user._id, { pets: user.pets })
  res.status(200).json({ success: true, data: user.pets })
})

// DELETE /api/users/me/pets/:petId
router.delete('/me/pets/:petId', (req, res) => {
  const user = store.findById('users', req.user._id)
  user.pets  = (user.pets || []).filter((p) => p._id !== req.params.petId)
  store.update('users', user._id, { pets: user.pets })
  res.status(200).json({ success: true, data: user.pets })
})

// PUT /api/users/wishlist/:productId
router.put('/wishlist/:productId', (req, res) => {
  const user       = store.findById('users', req.user._id)
  const productId  = req.params.productId
  const isWished   = (user.wishlist || []).includes(productId)
  const wishlist   = isWished
    ? user.wishlist.filter((id) => id !== productId)
    : [...(user.wishlist || []), productId]
  store.update('users', user._id, { wishlist })
  res.status(200).json({ success: true, data: wishlist })
})

// GET /api/users (admin)
router.get('/', authorize('admin'), (req, res) => {
  const users = store.find('users').map(({ password, ...u }) => u)
  res.status(200).json({ success: true, count: users.length, data: users })
})

module.exports = router