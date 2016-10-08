'use strict'

const routes = require('./routes')
const apiRoutes = require('./routes/api')

exports.register = (server, options, next) => {
  server.route(routes)
  server.route(apiRoutes)
  next()
}

exports.register.attributes = {
  pkg: require('./package.json')
}
