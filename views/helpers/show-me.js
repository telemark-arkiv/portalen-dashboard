'use strict'

module.exports = (input) => {
  const data = input || ''
  return data.length > 0 ? 'show-me' : 'hide-me'
}
