'use strict'

function isValid () {
  var searchText = document.getElementById('description')
  var submit = document.getElementById('submitFeedback')

  if (searchText.value) {
    submit.disabled = false
  } else {
    submit.disabled = true
  }
}

function init () {
  var searchText = document.getElementById('description')
  var submit = document.getElementById('submitFeedback')

  submit.disabled = true

  searchText.addEventListener('input', function (e) {
    isValid()
  })

  isValid()

  setTimeout(function () {
    searchText.focus()
  }, 500)

}

function ready (fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(init)
