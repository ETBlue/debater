import {file} from 'model/recordData/file';

let dataRef;

export const topics = {
  get() {
    return dataRef;
  },
  load() {
    dataRef = [];
    $('#topics').html('<li data-topic="" class="active"><a>All Topics <span class="badge badge-light"></span></a></li>');
    const loadDeferred = new $.Deferred();
    const waiting = [];
    waiting.push(file.load());
    $.when.apply($.when, waiting).done(() => {
      const topics = file.get('topics');
      Object.keys(topics).forEach((topicName) => {
        const topic = new Topic( topics[topicName].count, topics[topicName].name, topics[topicName].parent, topics[topicName].order);
        dataRef.push(topic.toHTML());
      });
      loadDeferred.resolve(dataRef);
    });
    return loadDeferred;
  }
};

class Topic {
  constructor(count,name,parent,order) {
    this._name = name;
    this._count = count;
    this._parent = parent || '';
    this._order = order || '';
    return this;
  }
  toHTML() {
    let badge = '';
    if (this._count == 0) {
      badge = '';
    } else {
      badge = `<span class='badge badge-light'>${this._count}</span>`;
    }
    let expandable = false;
    let expandicon = '';
    if (this._parent == '') {
      expandable = true;
      expandicon = `<span class='glyphicon-light glyphicon glyphicon-folder-open'></span>`;
    }
    return `
      <li class='topic' data-expandable='${expandable}' data-order='${this._order}' data-topic='${this._name}' data-parent='${this._parent}' data-count='${this._count}'>
        <a>${this._name} 
          ${badge}
          ${expandicon}
        </a>
      </li>`;
  }
}