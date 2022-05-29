const express = require('express')
const router = express.Router()
const employeesController = require('../../Controllers/employeesController')
const ROLES_LIST = require('../../Configs/roles_list')
const verifyRoles = require('../../Middleware/verifyRoles')

const {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
} = employeesController

router
  .route('/')
  .get(getAllEmployees)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createEmployee)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateEmployee)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteEmployee)

router.route('/:id').get(getEmployee)

module.exports = router
