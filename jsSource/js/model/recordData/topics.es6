import {file} from 'model/recordData/file';

let dataRef;

export const topics = {
  get() {
    return dataRef;
  },
  load() {
    dataRef = [];
    $('#topics').html('<li data-topic="" class="active"><a>所有主題 <span class="badge badge-light"></span></a></li>');
    const loadDeferred = new $.Deferred();
    const waiting = [];
    waiting.push(file.load());
    $.when.apply($.when, waiting).done(() => {
      const topics = file.get('topics');
      Object.keys(topics).forEach((topicData) => {
        const topic = new Topic(topics[topicData],topicData);
        dataRef.push(topic.toHTML());
      });
      loadDeferred.resolve(dataRef);
    });
    return loadDeferred;
  }
};

class Topic {
  constructor(count,data) {
    this._data = data;
    this._count = count;
    return this;
  }
  toHTML() {
    return `
      <li class='topic' data-topic='${this._data}'>
        <a>${this._data} 
          <span class='badge badge-light'>${this._count}</span>
        </a>
      </li>`;
  }
}