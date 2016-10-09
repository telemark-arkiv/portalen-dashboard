'use strict'

module.exports.updateMsgs = (request, reply) => {
  const server = request.server
  const paylod = request.payload

  server.publish('/updates', paylod)

  reply({success: true})
}
