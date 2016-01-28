let uploaded;
let result;

export const fileUploaded = {
  getResult() {
    console.log(result);
    return result;
  },
  getUploaded() {
    return uploaded;
  },
  load(file) {
    const loadDeferred = new $.Deferred();
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      // Great success! All the File APIs are supported.

      if (file) {
        let reader = new FileReader();
        reader.onload = function(event) {
          result = event.target.result;
          loadDeferred.resolve(result);
          //console.log(loadDeferred);
        }
        reader.readAsText(file);
        return loadDeferred;        
      } else {
        return;
      }
    } else {
      alert('The File APIs are not fully supported in this browser.');
    }
  },
  set(file) {
    uploaded = file;
  }
};

export default fileUploaded;