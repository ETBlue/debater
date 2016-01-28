import {file} from 'model/recordData/file';

let dataRef;

export const points = {
  get() {
    return dataRef;
  },
  load() {
    $('#points').html('');
    const loadDeferred = new $.Deferred();
    const waiting = [];
    waiting.push(file.load());
    $.when.apply($.when, waiting).done(() => {
      dataRef = file.get('points').map((pointData) => {
        const point = new Point(pointData);
        return point.toHTML();
      });
      loadDeferred.resolve(dataRef);
    });
    return loadDeferred;
  }
};

class Point {
  constructor(data) {
    this._data = data;
    return this;
  }
  toHTML() {
    const topics = this._data.topics.map((topic) => {
      return `<span data-topic='${topic}'></span>`;
    }).join("");
    const relations = this._data.relations.map((relation) => {
      return `<span data-relation='${relation}'></span>`;
    }).join("");
    const professions = this._data.professions.map((profession) => {
      return `<span data-profession='${profession}'></span>`;
    }).join("");
    return `
      <blockquote class='point' data-timestamp="${this._data.timestamp}" cite="${this._data.url}">
        <p>${this._data.content}</p>
        <div class="align-right small">
          <a href="${this._data.url}">${this._data.timestamp}</a> by <a href="">${this._data.author}</a>
        </div>
        <div class="align-right clear">
          ${topics}
          ${relations}
          ${professions}
        </div>
      </blockquote>
    `;

  }
}