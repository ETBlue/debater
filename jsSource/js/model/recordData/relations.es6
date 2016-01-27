import {file} from 'model/recordData/file';

let dataRef;

export const relations = {
  get() {
    return dataRef;
  },
  load() {
    const loadDeferred = new $.Deferred();
    const waiting = [];
    waiting.push(file.load());
    $.when.apply($.when, waiting).done(() => {
      dataRef = file.relations.map((relationData) => {
        const relation = new Relation(relationData);
        return relation.toJSON();
      });
      loadDeferred.resolve(dataRef);
    });
    return loadDeferred;
  }
};

class Relation {
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
    return 'relation name string';
  }
}