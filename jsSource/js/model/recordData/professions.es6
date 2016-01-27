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
        <a>${this._data}
        </a>
      </li>`;
  }
}