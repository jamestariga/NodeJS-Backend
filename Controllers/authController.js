const User = require('../Model/User')

// Dependency injection
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

const handleLogin = async (req, res) => {
  const { user, password } = req.body

  if (!user || !password) {
    return res.status(400).json({ message: 'Missing user or password' })
  }

  const foundUser = await User.findOne({ username: user }).exec()

  if (!foundUser) return res.sendStatus(401)

  // Evaluate the password
  const match = await bcrypt.compare(password, foundUser.password)

  if (match) {
    const roles = Object.values(foundUser.roles).filter(Boolean)
    // This is where JWTs would be created
    const accessToken = JWT.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '60s' }
    )

    const refreshToken = JWT.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    )

    // Saving the refresh token to the database
    foundUser.refreshToken = refreshToken
    const result = await foundUser.save()
    console.log(result)

    // Add secure: true for production but not for development
    res.cookie('JWT', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 1000 * 60 * 60 * 24,
    })

    res.json({ user, password, roles, accessToken })
  } else {
    res.sendStatus(401)
  }
}

module.exports = { handleLogin }
