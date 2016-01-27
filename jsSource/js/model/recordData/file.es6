import {fileURL} from 'model/fileURL';

let dataRef;

export const file = {
  get(key) {
    return dataRef[key];
  },
  load() {
    const loadDeferred = new $.Deferred();
    $.get('http://etblue.github.io/debater/file/sample.md')
      .done((fileData) => {
        const file = new File(fileData);
        dataRef = file.toJSON();
        loadDeferred.resolve(dataRef);
      });
    return loadDeferred;
  }
};

class File {
  constructor(fileData) {
    this._data = getFileJSON(fileData);
    return this;
  }
  toJSON() {
    const result = {};
    Object.keys(this._data).forEach((key) => {
      result[key] = this[key];
    });
    return result;
  }
  get title () {
    return this._data.title || "";
  }
}

function getFileJSON(fileData) {
  let file = {
    title: "",
    authors: [],
    points: [],
    professions: [],
    relations: [],
    topics: []
  };

  console.log(fileData);
  return file;
}