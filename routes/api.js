'use strict'

const handlers = require('../handlers/api')

module.exports = [
  {
    method: 'post',
    path: '/api/updates',
    handler: handlers.updateMsgs,
    config: {
      description: 'Update msgs'
    }
  }
]
