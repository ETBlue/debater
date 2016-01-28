'use strict';

define(['exports'], function (exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var uploaded = undefined;
  var result = undefined;
  var fileUploaded = exports.fileUploaded = {
    getResult: function getResult() {
      console.log(result);
      return result;
    },
    getUploaded: function getUploaded() {
      return uploaded;
    },
    load: function load(file) {
      var loadDeferred = new $.Deferred();
      if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.

        if (file) {
          var reader = new FileReader();
          reader.onload = function (event) {
            result = event.target.result;
            loadDeferred.resolve(result);
            //console.log(loadDeferred);
          };
          reader.readAsText(file);
          return loadDeferred;
        } else {
          return;
        }
      } else {
        alert('The File APIs are not fully supported in this browser.');
      }
    },
    set: function set(file) {
      uploaded = file;
    }
  };
  exports.default = fileUploaded;
});