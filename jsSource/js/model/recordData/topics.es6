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
      Object.keys(topics).forEach((topicName) => {
        const topic = new Topic( topics[topicName].count, topics[topicName].name, topics[topicName].parent);
        dataRef.push(topic.toHTML());
      });
      loadDeferred.resolve(dataRef);
    });
    return loadDeferred;
  }
};

class Topic {
  constructor(count,name,parent) {
    this._name = name;
    this._count = count;
    this._parent = parent || '';
    return this;
  }
  toHTML() {
    return `
      <li class='topic' data-topic='${this._name}' data-parent='${this._parent}'>
        <a>${this._name} 
          <span class='badge badge-light'>${this._count}</span>
        </a>
      </li>`;
  }
}