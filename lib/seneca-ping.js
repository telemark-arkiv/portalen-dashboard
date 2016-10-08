'use strict'

module.exports = function senecaPing (options) {
  const seneca = this

  seneca.add('role: test, cmd: ping', (args, callback) => {
    callback(null, {test: 'ok', pong: true})
  })

  return options.tag || 'seneca-ping'
}
