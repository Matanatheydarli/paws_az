const express = require('express')
const router  = express.Router()
const bcrypt  = require('bcryptjs')
const jwt     = require('jsonwebtoken')
const { store } = require('../db/store')
const { protect } = require('../middleware/auth')

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '7d' })
}

function sendToken(user, status, res) {
  const token = signToken(user._id)
  const { password, ...safeUser } = user
  res.status(status)
    .cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) })
    .json({ success: true, token, user: safeUser })
}

// POST /api/auth/register
router.post('/register', (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required' })
    }
    const existing = store.findOne('users', (u) => u.email === email.toLowerCase())
    if (existing) return res.status(400).json({ success: false, message: 'Email already registered' })

    const hashed = bcrypt.hashSync(password, 10)
    const user   = store.create('users', {
      name, email: email.toLowerCase(), password: hashed,
      phone: phone || '', role: role || 'user',
      avatar: '', isActive: true, wishlist: [], pets: [],
    })
    sendToken(user, 201, res)
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// POST /api/auth/login
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' })
    }
    const user = store.findOne('users', (u) => u.email === email.toLowerCase())
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' })

    const isMatch = bcrypt.compareSync(password, user.password)
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' })

    if (!user.isActive) return res.status(403).json({ success: false, message: 'Account deactivated' })

    sendToken(user, 200, res)
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.cookie('token', 'none', { expires: new Date(Date.now() + 10 * 1000), httpOnly: true })
  res.status(200).json({ success: true, message: 'Logged out' })
})

// GET /api/auth/me
router.get('/me', protect, (req, res) => {
  const { password, ...safeUser } = req.user
  const provider = store.findOne('providers', (p) => p.user === req.user._id)
  res.status(200).json({ success: true, user: safeUser, provider: provider || null })
})

// PUT /api/auth/updatepassword
router.put('/updatepassword', protect, (req, res) => {
  try {
    const user    = store.findById('users', req.user._id)
    const isMatch = bcrypt.compareSync(req.body.currentPassword, user.password)
    if (!isMatch) return res.status(401).json({ success: false, message: 'Current password incorrect' })

    const hashed = bcrypt.hashSync(req.body.newPassword, 10)
    store.update('users', user._id, { password: hashed })
    res.status(200).json({ success: true, message: 'Password updated' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router