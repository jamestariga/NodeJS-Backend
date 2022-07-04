const User = require('../Model/User')

// Dependency injection
const JWT = require('jsonwebtoken')

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies

  if (!cookies?.JWT) return res.sendStatus(401)

  const refreshToken = cookies.JWT

  const foundUser = await User.findOne({ refreshToken }).exec()

  if (!foundUser) return res.sendStatus(403)

  // Evaluate the JWT
  JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) {
      return res.sendStatus(403) // INVALID TOKEN
    }
    const roles = Object.values(foundUser.roles)
    const accessToken = JWT.sign(
      {
        UserInfo: {
          username: decoded.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '90s' } // Change this to longer for production
    )
    res.json({ roles, accessToken })
  })
}

module.exports = { handleRefreshToken }
