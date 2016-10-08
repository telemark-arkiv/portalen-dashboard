'use strict'

module.exports.updateMsgs = (request, reply) => {
  const server = request.server
  const msg = request.params.msg

  server.publish('/updates', msg)

  reply({success: true})
}
