const usersDB = {
  users: require('../Model/users.json'),
  setUsers: function (data) {
    this.users = data
  },
}

const bcrypt = require('bcrypt')

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
    res.json({ success: `User ${user} is logged in!` })
  } else {
    res.sendStatus(401)
  }
}

module.exports = { handleLogin }
