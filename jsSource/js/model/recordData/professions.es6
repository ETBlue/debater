import {file} from 'model/recordData/file';

let dataRef;

export const professions = {
  get() {
    return dataRef;
  },
  load() {
    $('#professions').html('<li class="active"><a data-profession="">所有職業</a></li>');
    const loadDeferred = new $.Deferred();
    const waiting = [];
    waiting.push(file.load());
    $.when.apply($.when, waiting).done(() => {
      dataRef = file.get('professions').map((professionData) => {
        const profession = new Profession(professionData);
        return profession.toHTML();
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
  toHTML() {
    return `
      <li>
        <a data-profession='${this._data}'>${this._data}
        </a>
      </li>`;
  }
}