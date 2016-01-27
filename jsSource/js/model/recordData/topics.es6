import {file} from 'model/recordData/file';

let dataRef;

export const topics = {
  get() {
    return dataRef;
  },
  load() {
    const loadDeferred = new $.Deferred();
    const waiting = [];
    waiting.push(file.load());
    $.when.apply($.when, waiting).done(() => {
      dataRef = file.topics.map((topicData) => {
        const topic = new Topic(topicData);
        return topic.toJSON();
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
  toJSON() {
    const result = {};
    Object.keys(this._data).forEach((key) => {
      result[key] = this[key] || "";
    });
    return result;
  }
  get name() {
    return 'topic name string';
  }
}