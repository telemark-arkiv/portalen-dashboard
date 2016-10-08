'use strict'

const handlers = require('../handlers/api')

module.exports = [
  {
    method: 'GET',
    path: '/api/updates/{msg}',
    handler: handlers.updateMsgs,
    config: {
      description: 'Update msgs'
    }
  }
]
