'use strict';
class Character {
  constructor(data) {
    this._data = data;
    return this;
  }
  get name() {
    return this._data.name || '';
  }
  get race() {
    return this._data.race || '';
  }
  get gender() {
    return this._data.gender || '';
  }
  get profession() {
    return this._data.profession || '';
  }
  get level() {
    return this._data.level || '';
  }
  get created() {
    const created = this._data.created;
    return created.slice(0, created.indexOf('T')) || '';
  }
}
const a = new Character({created: '2015-20-23T14:18:00Z'});
console.log(a.created);
console.log(a.level);