const data = {
  employees: require('../Model/employees.json'),
  /* A function that takes in data and sets the employees to that data. */
  setEmployees: function (data) {
    this.employees = data
  },
}

const getAllEmployees = (req, res) => {
  res.json(data.employees)
}

const createEmployee = (req, res) => {
  const newEmployee = {
    /* Checking if the employees array is empty. If it is, it will return 1. If it is not, it will
    return the last employee's id + 1. */
    id: data.employees?.length
      ? data.employees[data.employees.length - 1].id + 1
      : 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  }

  if (!newEmployee.firstName || !newEmployee.lastName) {
    return res.status(400).json({
      message: 'Please provide a first and last name',
    })
  }

  /* Taking the current employees and adding the new employee to the array. */
  data.setEmployees([...data.employees, newEmployee])
  res.status(201).json(data.employees)
}

const updateEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  )

  if (!employee) {
    return res.status(400).json({
      message: `Employee ID ${req.body.id} not found`,
    })
  }

  if (req.body.firstName) employee.firstName = req.body.firstName

  if (req.body.lastName) employee.lastName = req.body.lastName

  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  )

  const unsortedArray = [...filteredArray, employee]
  data.setEmployees(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  )

  res.json(data.employees)
}

const deleteEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  )

  if (!employee) {
    return res.status(400).json({
      message: `Employee ID ${req.body.id} not found`,
    })
  }

  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  )

  data.setEmployees([...filteredArray])

  res.json(data.employees)
}

const getEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.params.id)
  )

  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.params.id} not found` })
  }

  res.json(employee)
}

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
}
