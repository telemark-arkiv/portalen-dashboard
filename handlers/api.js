'use strict'

module.exports.updateMsgs = (request, reply) => {
  const msg = request.params.msg

  request.Nes.publish('/updates', msg)

  reply({success: true})
}
