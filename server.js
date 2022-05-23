const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 3500

// app.use(logger)

const whitelist = ['http://localhost:3000', 'http://localhost:3500']
const corsOption = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },

  optionsSuccessStatus: 200,
}

// Cors middleware
app.use(cors(corsOption))

// Built in middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Static files
app.use('/', express.static(path.join(__dirname, '/Public')))
app.use('/subdir', express.static(path.join(__dirname, '/Public')))

// Routes
app.use('/', require('./Routes/root'))
app.use('/subdir', require('./Routes/subdir'))
app.use('/employees', require('./Routes/api/employees'))

// // Route handlers
// app.get(
//   '/hello(.html)?',
//   (req, res, next) => {
//     console.log('attempted to load hello.html')
//     next()
//   },
//   (req, res) => {
//     res.send('Hello World!')
//   }
// )

// // chaining route handlers
// const one = (req, res, next) => {
//   console.log('one')
//   next()
// }

// const two = (req, res, next) => {
//   console.log('two')
//   next()
// }

// const three = (req, res) => {
//   console.log('three')
//   res.send('Finished!')
// }

// app.get('/chain(.html)?', [one, two, three])

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
