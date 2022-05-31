const User = require('../Model/User')

const getAllUsers = async (req, res) => {
  const users = await User.find()
  if (!users) return res.status(204).json({ message: 'No user found' })
  res.json(users)
}

const deleteUsers = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: 'ID parameter is required' })
  }

  const users = await users.findOne({ _id: req.body.id }).exec()

  if (!users) {
    return res.status(204).json({
      message: `No users matches ID: ${req.body.id}.`,
    })
  }

  const result = await User.deleteOne({ _id: req.body.id })

  res.json(result)
}

const getUsers = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: 'ID parameter is required' })
  }

  const users = await User.findOne({ _id: req.params.id }).exec()

  if (!users) {
    return res.status(204).json({
      message: `No users matches ID: ${req.params.id}.`,
    })
  }

  res.json(users)
}

module.exports = {
  getAllUsers,
  deleteUsers,
  getUsers,
}
