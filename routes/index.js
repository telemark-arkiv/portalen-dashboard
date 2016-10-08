'use strict'

const handlers = require('../handlers')

module.exports = [
  {
    method: 'GET',
    path: '/',
    config: {
      handler: handlers.showFrontpage,
      description: 'Show frontpage'
    }
  }
]
