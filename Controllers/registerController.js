const User = require('../Model/User')
const bcrypt = require('bcrypt')

const handleNewUser = async (req, res) => {
  const { user, password } = req.body

  if (!user || !password) {
    return res.status(400).json({ message: 'Missing user or password' })
  }

  // Check for duplicate user in DB
  const duplicate = await User.findOne({ username: user }).exec()

  if (duplicate) return res.status(409).json({ message: 'User already exists' })

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create and store the new user to the database
    const result = await User.create({
      username: user,
      password: hashedPassword,
    })

    console.log(result)

    res.status(201).json({ success: `New user ${user} created!` })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { handleNewUser }
