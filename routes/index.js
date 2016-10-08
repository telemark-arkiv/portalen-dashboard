'use strict'

const handlers = require('../handlers')

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: handlers.showFrontpage,
    config: {
      description: 'Show frontpage'
    }
  }
]
