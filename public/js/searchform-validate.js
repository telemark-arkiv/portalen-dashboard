'use strict'

function isValid () {
  var searchText = document.getElementById('searchText')
  var submit = document.getElementById('SearchFormSubmit')

  if (searchText.value) {
    submit.disabled = false
  } else {
    submit.disabled = true
  }
}

function init () {
  var searchText = document.getElementById('searchText')
  var submit = document.getElementById('SearchFormSubmit')

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
