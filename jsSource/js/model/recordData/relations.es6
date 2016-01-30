import {file} from 'model/recordData/file';

let dataRef;

export const relations = {
  get() {
    return dataRef;
  },
  load() {
    dataRef = [];
    $('#relations').html('<li class="active"><a data-relation="">所有關係人</a></li>');
    const loadDeferred = new $.Deferred();
    const waiting = [];
    waiting.push(file.load());
    $.when.apply($.when, waiting).done(() => {
      const relations = file.get('relations') || [];
      dataRef = relations.map((relationData) => {
        const relation = new Relation(relationData);
        return relation.toHTML();
      });
      loadDeferred.resolve(dataRef);
    });
    if (dataRef.length == 0) {
      $('#relations').html('');
    }
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