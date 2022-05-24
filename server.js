const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const corsOption = require('./Configs/corsOptions')
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const root = require('./Routes/root')
const register = require('./Routes/register')
const auth = require('./Routes/auth')
const PORT = process.env.PORT || 3500

// app.use(logger)

// Cors middleware
app.use(cors(corsOption))

// Built in middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Static files
app.use('/', express.static(path.join(__dirname, '/Public')))

// Routes
app.use('/', root)
app.use('/register', register)
app.use('/auth', auth)
app.use('/employees', require('./Routes/api/employees'))

app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'Views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not found' })
  } else {
    res.type('txt').send('404 Not found')
  }
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
