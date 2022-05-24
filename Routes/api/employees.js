const express = require('express')
const router = express.Router()
const employeesController = require('../../Controllers/employeesController')

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
  .post(createEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee)

router.route('/:id').get(getEmployee)

module.exports = router
