import {file} from 'model/recordData/file';

let dataRef;

export const topics = {
  get() {
    return dataRef;
  },
  load() {
    $('#topics').html('<li data-topic="" class="active"><a>所有主題<span class="badge badge-light"></span></a></li>');
    const loadDeferred = new $.Deferred();
    const waiting = [];
    waiting.push(file.load());
    $.when.apply($.when, waiting).done(() => {
      dataRef = file.get('topics').map((topicData) => {
        const topic = new Topic(topicData);
        return topic.toHTML();
      });
      loadDeferred.resolve(dataRef);
    });
    return loadDeferred;
  }
};

class Topic {
  constructor(data) {
    this._data = data;
    return this;
  }
  toHTML() {
    return `
      <li class='topic' data-topic='${this._data}'>
        <a>${this._data} 
          <span class='badge badge-light'></span>
        </a>
      </li>`;
  }
}