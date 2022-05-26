const usersDB = {
  users: require('../Model/users.json'),
  setUsers: function (data) {
    this.users = data
  },
}

// Dependency injection
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
require('dotenv').config()
const fsPromises = require('fs').promises
const path = require('path')

const handleLogin = async (req, res) => {
  const { user, password } = req.body

  if (!user || !password) {
    return res.status(400).json({ message: 'Missing user or password' })
  }

  const foundUser = usersDB.users.find((person) => person.username === user)

  if (!foundUser) return res.sendStatus(401)

  // Evaluate the password
  const match = await bcrypt.compare(password, foundUser.password)

  if (match) {
    // This is where JWTs would be created
    const accessToken = JWT.sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }
    )

    const refreshToken = JWT.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    )

    // Saving the refresh token to the database
    const otherUsers = usersDB.users.filter(
      (person) => person.username !== foundUser.username
    )

    const currentUser = { ...foundUser, refreshToken }

    usersDB.setUsers([...otherUsers, currentUser])

    await fsPromises.writeFile(
      path.join(__dirname, '..', 'Model', 'users.json'),
      JSON.stringify(usersDB.users)
    )

    // Add secure: true for production but not for development
    res.cookie('JWT', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 1000 * 60 * 60 * 24,
    })

    res.json({ accessToken })
  } else {
    res.sendStatus(401)
  }
}

module.exports = { handleLogin }
