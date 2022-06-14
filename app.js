require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const app = express()

const router = require('./router/index')

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.use(`${process.env.BASE_URL}`, router)


app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
      ].join(' ')
  }))


  module.exports = app