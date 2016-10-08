'use strict'

const tap = require('tap')
const handlers = require('../../handlers')

tap.equal(Object.keys(handlers).length, 1, 'There are 1 standard handlers')

tap.ok(handlers.showFrontpage, 'Handler has method showFrontpage')
