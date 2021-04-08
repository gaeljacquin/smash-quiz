const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const favicon = require('serve-favicon')
require('dotenv').config()

const indexRouter = require('./routes/index')
const fightersRouter = require('./routes/fighters')
const clipRouter = require('./routes/clip')

const app = express()

// enable CORS for server & client
const allowedClients = process.env.CLIENT_URL.split(',')
const allowed = [app.url].concat(allowedClients)
const corsOptions = {
  origin: function (origin, callback) {
    if (allowed.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/fighters', fightersRouter)
app.use('/clip', clipRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// Serve Favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

module.exports = app
