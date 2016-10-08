'use strict'

const tap = require('tap')
const Seneca = require('seneca')({log: 'silent'})
const senecaPing = require('../../lib/seneca-ping')

var counter = 0
const total = 1

const finished = () => {
  counter++
  if (counter === total) {
    tap.end()
    process.exit(0)
  }
}

Seneca.use(senecaPing)

tap.test('It returns ping', (childTest) => {
  Seneca.act('role: test, cmd: ping', (error, msg) => {
    if (error) {
      throw error
    } else {
      tap.equal(msg.pong, true, 'Got pong')
      childTest.done()
      finished()
    }
  })
})
