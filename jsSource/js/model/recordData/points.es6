import {file} from 'model/recordData/file';

let dataRef;

export const points = {
  get() {
    return dataRef;
  },
  load() {
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
      return `<span class="label label-light">#${topic}</span>`;
    });
    const relations = this._data.relations.map((relation) => {
      return `<span class="label label-light">@${relation}</span>`;
    });
    const professions = this._data.professions.map((profession) => {
      return `<span class="label label-light">@${profession}</span>`;
    });
    return `
      <blockquote cite="${this._data.url}">
        <p>${this._data.content}</p>
        <div class="align-right small">
          <a href="${this._data.url}">${this._data.timestamp}</a> by <a href="">${this._data.author}</a>
        </div>
        <div class="align-right clear">
        </div>
      </blockquote>
    `;
          //${topics}
          //${relations}
          //${professions}

  }
}