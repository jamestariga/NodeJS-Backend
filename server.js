const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const corsOption = require('./Configs/corsOptions')
const { logger } = require('./Middleware/logEvents')
const errorHandler = require('./Middleware/errorHandler')
const verifyJWT = require('./Middleware/verifyJWT')
const credentials = require('./Middleware/credentials')
const cookieParser = require('cookie-parser')
const root = require('./Routes/root')
const register = require('./Routes/register')
const auth = require('./Routes/auth')
const refreshToken = require('./Routes/refreshToken')
const logout = require('./Routes/logout')
const PORT = process.env.PORT || 3500

// app.use(logger)

// Handle options credentials check before CORS and fetch cookies credentials requirement
app.use(credentials)

// Cors middleware
app.use(cors(corsOption))

// Built in middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Cookie middleware
app.use(cookieParser())

// Static files
app.use('/', express.static(path.join(__dirname, '/Public')))

// Routes
app.use('/', root)
app.use('/register', register)
app.use('/auth', auth)
app.use('/refresh', refreshToken)
app.use('/logout', logout)

// Verify JWT
app.use(verifyJWT)
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
