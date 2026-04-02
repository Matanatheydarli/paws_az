const express  = require('express')
const router   = express.Router()
const { store } = require('../db/store')
const { protect } = require('../middleware/auth')

router.use(protect)

// GET /api/notifications
router.get('/', (req, res) => {
  const notifications = store.find('notifications', (n) => n.recipient === req.user._id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 50)
  const unreadCount = notifications.filter((n) => !n.isRead).length
  res.status(200).json({ success: true, unreadCount, data: notifications })
})

// PUT /api/notifications/read-all
router.put('/read-all', (req, res) => {
  store.find('notifications', (n) => n.recipient === req.user._id && !n.isRead)
    .forEach((n) => store.update('notifications', n._id, { isRead: true }))
  res.status(200).json({ success: true, message: 'All marked as read' })
})

// PUT /api/notifications/:id/read
router.put('/:id/read', (req, res) => {
  const notif = store.findById('notifications', req.params.id)
  if (!notif || notif.recipient !== req.user._id) {
    return res.status(404).json({ success: false, message: 'Not found' })
  }
  store.update('notifications', req.params.id, { isRead: true })
  res.status(200).json({ success: true, message: 'Marked as read' })
})

// DELETE /api/notifications/:id
router.delete('/:id', (req, res) => {
  const notif = store.findById('notifications', req.params.id)
  if (!notif || notif.recipient !== req.user._id) {
    return res.status(404).json({ success: false, message: 'Not found' })
  }
  store.delete('notifications', req.params.id)
  res.status(200).json({ success: true, message: 'Deleted' })
})

module.exports = router