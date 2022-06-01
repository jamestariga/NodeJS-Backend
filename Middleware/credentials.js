const allowedOrigins = require('../Configs/allowedOrigins')

const credentials = (req, res, next) => {
  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Credentials', true)
  }
  next()
}

module.exports = credentials
