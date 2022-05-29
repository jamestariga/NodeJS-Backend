const JWT = require('jsonwebtoken')
require('dotenv').config()

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization

  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401)
  const token = authHeader.split(' ')[1]
  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403) // INVALID TOKEN
    req.user = decoded.UserInfo.username
    req.roles = decoded.UserInfo.roles
    next()
  })
}

module.exports = verifyJWT
