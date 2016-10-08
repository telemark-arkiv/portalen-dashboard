'use strict'

const tap = require('tap')
const routes = require('../../routes/')

tap.equal(routes.length, 1, 'There are 1 standard routes')
