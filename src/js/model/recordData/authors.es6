import {file} from 'model/recordData/file';

let dataRef;

export const authors = {
  get() {
    return dataRef;
  },
  load() {
    const loadDeferred = new $.Deferred();
    const waiting = [];
    waiting.push(file.load());
    $.when.apply($.when, waiting).done(() => {
      dataRef = file.authors.map((authorData) => {
        const author = new Author(authorData);
        return author.toJSON();
      });
      loadDeferred.resolve(dataRef);
    });
    return loadDeferred;
  }
};

class Author {
  constructor(data) {
    this._data = data;
    return this;
  }
  toJSON() {
    const result = {};
    Object.keys(this._data).forEach((key) => {
      result[key] = this[key] || "";
    });
    return result;
  }
  get name() {
    return 'author name string';
  }
  get profiles() {
    return 'author profiles array';
  }
  get professions() {
    return 'author professions array';
  }
  get relations() {
    return 'author relations array';
  }
  get posts() {
    return 'author posts array';
  }
}