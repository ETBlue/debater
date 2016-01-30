import {file} from 'model/recordData/file';

let dataRef;

export const professions = {
  get() {
    return dataRef;
  },
  load() {
    dataRef = [];
    $('#professions').html('<li class="active"><a data-profession="">所有職業</a></li>');
    const loadDeferred = new $.Deferred();
    const waiting = [];
    waiting.push(file.load());
    $.when.apply($.when, waiting).done(() => {
      const professions = file.get('professions') || [];
      function remove(arr, what) {
          var found = arr.indexOf(what);

          while (found !== -1) {
              arr.splice(found, 1);
              found = arr.indexOf(what);
          }
      }
      remove(professions, "");
      dataRef = professions.map((professionData) => {
        const profession = new Profession(professionData);
        return profession.toHTML();
      });
      loadDeferred.resolve(dataRef);
      if (dataRef.length == 0) {
        $('#professions').html('');
      }
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