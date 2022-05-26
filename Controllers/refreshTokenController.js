const usersDB = {
  users: require('../Model/users.json'),
  setUsers: function (data) {
    this.users = data
  },
}

// Dependency injection
const JWT = require('jsonwebtoken')
require('dotenv').config()

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies

  if (!cookies?.JWT) return res.sendStatus(401)

  console.log(cookies.JWT)

  const refreshToken = cookies.JWT

  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  )

  if (!foundUser) return res.sendStatus(403)

  // Evaluate the JWT
  JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) {
      return res.sendStatus(403) // INVALID TOKEN
    }
    const accessToken = JWT.sign(
      { username: decoded.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' } // Change this to longer for production
    )
    res.json({ accessToken })
  })
}

module.exports = { handleRefreshToken }
