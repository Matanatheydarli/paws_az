const jwt   = require('jsonwebtoken')
const { store } = require('../db/store')

exports.protect = (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user    = store.findById('users', decoded.id)
    if (!user) return res.status(401).json({ success: false, message: 'User not found' })
    req.user = user
    next()
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Not authorized, token failed' })
  }
}

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: `Role '${req.user.role}' is not authorized` })
    }
    next()
  }
}