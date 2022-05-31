const express = require('express')
const router = express.Router()
const userController = require('../../Controllers/userController')
const ROLES_LIST = require('../../Configs/roles_list')
const verifyRoles = require('../../Middleware/verifyRoles')

const { getAllUsers, deleteUsers, getUsers } = userController

router
  .route('/')
  .get(verifyRoles(ROLES_LIST.Admin), getAllUsers)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteUsers)

router.route('/:id').get(verifyRoles(ROLES_LIST.Admin), getUsers)

module.exports = router
