'use strict'

const handlers = require('../handlers/api')

module.exports = [
  {
    method: 'GET',
    path: '/api/update/{msg}',
    config: {
      handler: handlers.updateMsgs,
      description: 'Update msgs'
    }
  }
]
