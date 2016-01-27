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
      dataRef = file.points.map((pointData) => {
        const point = new Point(pointData);
        return point.toJSON();
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
  toJSON() {
    const result = {};
    Object.keys(this._data).forEach((key) => {
      result[key] = this[key] || "";
    });
    return result;
  }
  get author() {
    return 'point author string';
  }
  get cite() {
    return 'point cite string';
  }
  get timestamp() {
    return 'point timestamp string';
  }
  get topics() {
    return 'point topics array';
  }
}