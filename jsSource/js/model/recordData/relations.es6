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
      dataRef = file.get('relations').map((relationData) => {
        const relation = new Relation(relationData);
        return relation.toHTML();
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
  toHTML() {
    return `
      <li>
        <a data-relation='${this._data}'>${this._data}
        </a>
      </li>`;
  }
}