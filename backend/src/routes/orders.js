const express  = require('express')
const router   = express.Router()
const { store } = require('../db/store')
const { protect, authorize } = require('../middleware/auth')

router.use(protect)

// POST /api/orders
router.post('/', authorize('user'), (req, res) => {
  const { items, shippingAddress, paymentMethod, notes } = req.body

  let totalAmount = 0
  const orderItems = []

  for (const item of items) {
    const product = store.findById('products', item.product)
    if (!product) return res.status(404).json({ success: false, message: `Product ${item.product} not found` })
    orderItems.push({ product: product._id, qty: item.qty, price: product.price })
    totalAmount += product.price * item.qty
  }

  const order = store.create('orders', {
    user: req.user._id, items: orderItems,
    totalAmount, shippingAddress, paymentMethod: paymentMethod || 'cash',
    notes: notes || '', status: 'Pending', isPaid: false, isDelivered: false,
  })

  res.status(201).json({ success: true, data: order })
})

// GET /api/orders/my
router.get('/my', authorize('user'), (req, res) => {
  const orders = store.find('orders', (o) => o.user === req.user._id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((order) => ({
      ...order,
      items: order.items.map((item) => ({
        ...item,
        product: store.findById('products', item.product) || item.product,
      })),
    }))
  res.status(200).json({ success: true, count: orders.length, data: orders })
})

// GET /api/orders/all  (admin)
router.get('/all', authorize('admin'), (req, res) => {
  const orders = store.find('orders')
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  res.status(200).json({ success: true, count: orders.length, data: orders })
})

// GET /api/orders/:id
router.get('/:id', (req, res) => {
  const order = store.findById('orders', req.params.id)
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' })
  if (order.user !== req.user._id && req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Not authorized' })
  }
  res.status(200).json({ success: true, data: order })
})

// PUT /api/orders/:id/status  (admin)
router.put('/:id/status', authorize('admin'), (req, res) => {
  const order = store.findById('orders', req.params.id)
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' })
  const updated = store.update('orders', req.params.id, { status: req.body.status })
  res.status(200).json({ success: true, data: updated })
})

module.exports = router