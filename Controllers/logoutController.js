const User = require('../Model/User')

const handleLogout = async (req, res) => {
  // On client side, also delete the accessToken

  const cookies = req.cookies

  if (!cookies?.JWT) return res.sendStatus(204)
  const refreshToken = cookies.JWT

  // Is refresh token in the database?
  const foundUser = await User.findOne({ refreshToken }).exec()

  if (!foundUser) {
    res.clearCookie('JWT', {
      httpOnly: true,
      sameSite: 'None',
      /*secure: true*/
    }) // Add secure: true for production but not for development
    return res.sendStatus(204)
  }

  // Remove the refresh token from the database
  foundUser.refreshToken = ''
  const result = await foundUser.save()
  console.log(result)

  res.clearCookie('JWT', {
    httpOnly: true,
    sameSite: 'None',
    /*secure: true*/
  }) // Add secure: true for production but not for development
  res.sendStatus(204)
}

module.exports = { handleLogout }
