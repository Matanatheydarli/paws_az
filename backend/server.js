const express      = require('express')
const dotenv       = require('dotenv')
const cors         = require('cors')
const helmet       = require('helmet')
const morgan       = require('morgan')
const cookieParser = require('cookie-parser')
const rateLimit    = require('express-rate-limit')

dotenv.config()

const app  = express()
const PORT = process.env.PORT || 5000

app.use(helmet())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, message: 'Too many requests' },
})
app.use('/api', limiter)

// ── routes ──
app.use('/api/auth',          require('./src/routes/auth'))
app.use('/api/users',         require('./src/routes/users'))
app.use('/api/providers',     require('./src/routes/providers'))
app.use('/api/services',      require('./src/routes/services'))
app.use('/api/bookings',      require('./src/routes/bookings'))
app.use('/api/notifications', require('./src/routes/notifications'))
app.use('/api/reviews',       require('./src/routes/reviews'))
app.use('/api/products',      require('./src/routes/products'))
app.use('/api/orders',        require('./src/routes/orders'))

// ── health check ──
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Paws.az API running 🐾', storage: 'in-memory' })
})

// ── 404 ──
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` })
})

// ── error handler ──
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.statusCode || 500).json({ success: false, message: err.message || 'Server error' })
})

app.listen(PORT, () => {
  console.log(`🚀 Paws.az API running on http://localhost:${PORT}`)
  console.log(`📦 Using in-memory storage (no database required)`)
})