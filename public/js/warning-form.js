'use strict'

function init () {
  var radios = document.querySelectorAll('.warning-type-selector')
  var periods = document.querySelectorAll('.period-selector')
  var checkboxes = document.querySelectorAll('.mdl-checkbox')
  var previewButton = document.getElementById('previewWarning')
  var closePreviewButtons = document.querySelectorAll('.closePreviewButton')
  var modalPreview = document.getElementById('modalPreview')
  var warningCard = document.getElementById('warningCard')
  hideAllCheckboxes()
  hideAllHeaders()
  validateWarning()
  Array.prototype.forEach.call(radios, function(el) {
    el.addEventListener('click', function (e) {
      hideAllCheckboxes()
      hideAllHeaders()
      showMe(e.target.value)
      validateWarning()
    })
    if (el.checked) {
      showMe(el.value)
    }
  })
  Array.prototype.forEach.call(checkboxes, function(el) {
    el.addEventListener('click', function (e) {
      validateWarning()
    })
  })
  Array.prototype.forEach.call(periods, function(el) {
    el.addEventListener('click', function (e) {
      validateWarning()
    })
  })

  previewButton.addEventListener('click', function (e) {
    previewWarning(e)
  })


  Array.prototype.forEach.call(closePreviewButtons, function(el) {
    el.addEventListener('click', function (e) {
      modalPreview.style.visibility = 'hidden'
      warningCard.style.display = 'none'
      modalPreview.style.opacity = 0
      warningCard.style.visibility = 'visible'
      warningCard.style.display = ''
      warningCard.style.opacity = 1
      location.hash='pageTop'
      location.hash=''
    })
  })

  preselectFag()
}

function preselectFag () {
  var radios = document.querySelectorAll('.warning-type-selector')
  var arsakCourse = document.getElementById('courseChkboxCourse')
  var courses = document.querySelectorAll('.chxBxfagInput')
  if (radios.length === 1) {
    radios[0].checked = true
    showMe(radios[0].value)
  }
  if (courses.length === 1) {
    courses[0].checked = true
  }
  arsakCourse.checked = true
}

function showMe (type) {
  var thisClass = '.chxBx' + type
  var checkBoxes = document.querySelectorAll(thisClass)
  Array.prototype.forEach.call(checkBoxes, function(el) {
    el.style.display = ''
  })
}

function hideAllCheckboxes () {
  var checkBoxes = document.querySelectorAll('.mdl-checkbox')
  Array.prototype.forEach.call(checkBoxes, function(el) {
    el.style.display = 'none'
  })
}

function hideAllHeaders () {
  var headers = document.querySelectorAll('.warning-form-header')
  Array.prototype.forEach.call(headers, function(el) {
    el.style.display = 'none'
  })
}

function validateWarning () {
  var submitButton = document.getElementById('submitWarning')
  var previewButton = document.getElementById('previewWarning')
  var warningTypes = document.querySelectorAll('.warning-type-selector')
  var periods = document.querySelectorAll('.period-selector')
  var checkBoxes = document.querySelectorAll('.mdl-checkbox__input')
  var arsakCourse = document.getElementById('courseChkboxCourse')
  var checkboxCount = 0
  var type = false
  var typeOK = false
  var periodOK = false
  var courseOK = false
  var reasonOK = false

  // Starts by disabling button
  submitButton.disabled = true
  previewButton.disabled = true

  Array.prototype.forEach.call(warningTypes, function(el) {
    if (el.checked) {
      type = el.value
      typeOK = true
    }
  })

  Array.prototype.forEach.call(periods, function(el) {
    if (el.checked) {
      periodOK = true
    }
  })

  Array.prototype.forEach.call(checkBoxes, function(el) {
    if (el.checked) {
      if (type === 'atferd' && /behaviour/.test(el.id)) {
        checkboxCount ++
      }
      if (type === 'orden' && /order/.test(el.id)) {
        checkboxCount ++
      }
      if (type === 'fag' && /course/.test(el.id)) {
        checkboxCount ++
      }
    }
  })

  if (type === 'fag' && arsakCourse.checked) {
    reasonOK = true
  }

  if (type === 'fag' && checkboxCount > 1) {
    courseOK = true
  }

  if (type !== 'fag' && checkboxCount > 0) {
    reasonOK = true
    courseOK = true
  }

  // If everything is OK let's go :-)
  if (typeOK && periodOK && courseOK && reasonOK) {
    submitButton.disabled = false
    previewButton.disabled = false
  }
}

var BASE64_MARKER = ';base64,';

function convertDataURIToBinary(dataURI) {
  var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  var base64 = dataURI.substring(base64Index);
  var raw = window.atob(base64);
  var rawLength = raw.length;
  var array = new Uint8Array(new ArrayBuffer(rawLength));

  for(var i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}

function previewWarning (e) {
  e.preventDefault()
  var previewButton = document.getElementById('previewWarning')
  var modalPreview = document.getElementById('modalPreview')
  var warningCard = document.getElementById('warningCard')
  var form = document.getElementById('submitWarningForm')
  var previewContainer = document.getElementById('previewContainer')
  var xhr = new XMLHttpRequest()
  var snackbarContainer = document.querySelector('.mdl-js-snackbar')
  var data = {
    message: 'Forhåndsvisning genereres nå. Vennligst vent...',
    timeout: 2000
  }

  snackbarContainer.MaterialSnackbar.showSnackbar(data)
  previewButton.disabled = true
  previewButton.textContent = 'cloud_download'

  xhr.open('POST', previewButton.getAttribute('formaction'), true)
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  xhr.onload = function() {
    if (xhr.status === 200) {
      var pdfAsDataUri = "data:application/pdf;base64," + xhr.responseText
      var pdfAsArray = convertDataURIToBinary(pdfAsDataUri)
      previewContainer.innerHTML = ''
      renderPDF(pdfAsArray, previewContainer)
      modalPreview.style.visibility = 'visible'
      modalPreview.style.display = ''
      modalPreview.style.opacity = 1
      warningCard.style.visibility = 'hidden'
      warningCard.style.display = 'none'
      warningCard.style.opacity = 0
    }
    else if (xhr.status !== 200) {
      console.error(xhr.status)
    }
    previewButton.textContent = 'description'
    validateWarning()
  }
  xhr.send(serialize(form))
}

function renderPDF(data, canvasContainer, options) {
  // Watermark inspired by http://jsfiddle.net/EAXc9/7/

  var options = options || { scale: 1.5 };

  function renderPage(page) {
    var viewport = page.getViewport(options.scale);
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    var wmCanvas=document.createElement("canvas");
    wmCanvas.id="watermark";
    wmCanvas.height=viewport.height;
    wmCanvas.width=viewport.width;

    canvasContainer.appendChild(wmCanvas);
    canvasContainer.appendChild(canvas);

    var wmContext=wmCanvas.getContext('2d');
    wmContext.globalAlpha=0.2;
    // setup text for filling
    wmContext.font = "72px Arial" ;
    wmContext.fillStyle = "#e30438";
    // get the metrics with font settings
    var metrics = wmContext.measureText("F o r h å n d s v i s n i n g");
    var width = metrics.width;
    // height is font size
    var height = 72;
    // change the origin coordinate to the middle of the context
    wmContext.translate(viewport.width/2, viewport.height/2);
    // rotate the context (so it's rotated around its center)
    wmContext.rotate(-Math.atan(viewport.height/viewport.width));
    // as the origin is now at the center, just need to center the text
    wmContext.fillText("F o r h å n d s v i s n i n g",-width/2,height/2);

    page.render(renderContext);

  }

  function renderPages(pdfDoc) {
    for(var num = 1; num <= pdfDoc.numPages; num++)
      pdfDoc.getPage(num).then(renderPage);
  }

  PDFJS.disableWorker = true;
  PDFJS.getDocument(data).then(renderPages);

}

function ready (fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(init)
