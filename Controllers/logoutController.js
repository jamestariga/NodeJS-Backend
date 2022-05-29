const usersDB = {
  users: require('../Model/users.json'),
  setUsers: function (data) {
    this.users = data
  },
}

const fsPromises = require('fs').promises
const path = require('path')

const handleLogout = async (req, res) => {
  // On client side, also delete the accessToken

  const cookies = req.cookies

  if (!cookies?.JWT) return res.sendStatus(204)
  const refreshToken = cookies.JWT

  // Is refresh token in the database?
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  )

  if (!foundUser) {
    res.clearCookie('JWT', {
      httpOnly: true,
      // sameSite: 'None' /*secure: true*/,
    }) // Add secure: true for production but not for development
    return res.sendStatus(204)
  }

  // Remove the refresh token from the database
  const otherUsers = usersDB.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken
  )

  const currentUser = { ...foundUser, refreshToken: '' }

  usersDB.setUsers([...otherUsers, currentUser])

  await fsPromises.writeFile(
    path.join(__dirname, '..', 'Model', 'users.json'),
    JSON.stringify(usersDB.users)
  )

  res.clearCookie('JWT', {
    httpOnly: true /*sameSite: 'None'*/ /*secure: true*/,
  }) // Add secure: true for production but not for development
  res.sendStatus(204)
}

module.exports = { handleLogout }
