'use strict'

const Hapi = require('hapi')
const Nes = require('nes')
const Chairo = require('chairo')
const Seneca = require('seneca')()
const vision = require('vision')
const inert = require('inert')
const server = new Hapi.Server()
const config = require('./config')
const portalenService = require('./index')
const senecaPing = require('./lib/seneca-ping')

server.connection({
  port: config.SERVER_PORT
})

const plugins = [
  {register: Chairo, options: {seneca: Seneca}},
  {register: Nes},
  {register: vision},
  {register: inert},
  {register: portalenService}
]

server.register(plugins, error => {
  if (error) {
    console.error('Failed to load a plugin:', error)
  }

  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'views',
    helpersPath: 'views/helpers',
    partialsPath: 'views/partials',
    layoutPath: 'views/layouts',
    layout: true,
    compileMode: 'sync'
  })

  server.route({
    method: 'GET',
    path: '/public/{param*}',
    handler: {
      directory: {
        path: 'public'
      }
    },
    config: {
      auth: false
    }
  })

  server.route({
    method: 'GET',
    path: '/api/update/{msg}',
    config: {
    handler: (request, reply) => {
      const msg = request.params.msg

      server.publish('/updates', msg)

      reply({success: true})
    },
      description: 'Update msgs'
  }
  })


  server.subscription('/updates')

  server.seneca.use(senecaPing)
})

module.exports.start = () => {
  server.start(() => {
    console.log('Server running at:', server.info.uri)
  })
}

module.exports.stop = () => {
  server.stop(() => {
    console.log('Server stopped')
  })
}
