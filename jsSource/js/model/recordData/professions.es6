import {file} from 'model/recordData/file';

let dataRef;

export const professions = {
  get() {
    return dataRef;
  },
  load() {
    const loadDeferred = new $.Deferred();
    const waiting = [];
    waiting.push(file.load());
    $.when.apply($.when, waiting).done(() => {
      dataRef = file.professions.map((professionData) => {
        const profession = new Profession(professionData);
        return profession.toJSON();
      });
      loadDeferred.resolve(dataRef);
    });
    return loadDeferred;
  }
};

class Profession {
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
    return 'profession name string';
  }
}