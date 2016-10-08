'use strict'

function generateMessage (input) {
  var msg = false
  if (/feedbackCollected/.test(input)) {
    msg = 'Tilbakemeldingen din er registrert. Tusen takk.'
  }
  if (/documentAdded/.test(input)) {
    msg = 'Varselbrevet er lagt i kø for utsending.'
  }
  return msg
}

function init () {
  setTimeout(function () {
    var search = window.location.search
    if (search) {
      var msg = generateMessage(search)
      if (msg) {
        var snackbarContainer = document.querySelector('.mdl-js-snackbar')
        var data = {
          message: msg,
          timeout: 2000
        }
        snackbarContainer.MaterialSnackbar.showSnackbar(data)
      }
    }
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