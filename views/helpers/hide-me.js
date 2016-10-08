'use strict'

module.exports = (input) => {
  const data = input || ''
  return data.length > 0 ? 'hide-me' : 'show-me'
}
