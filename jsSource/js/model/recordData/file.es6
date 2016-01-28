import {fileURL} from 'model/fileURL';
import {fileSource} from 'model/fileSource';
import {fileUploaded} from 'model/fileUploaded';

let dataRef;

export const file = {
  get(key) {
    return dataRef[key];
  },
  load() {
    const loadDeferred = new $.Deferred();
    if (fileSource.get() == 'web') {
      const url = fileURL.getURL();
      $.get(url)
        .done((fileData) => {
          const file = new File(fileData);
          dataRef = file.toJSON();
          loadDeferred.resolve(dataRef);
        });
      return loadDeferred;
    } else if (fileSource.get() == 'local') {
      if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.

        fileUploaded.load(fileUploaded.getUploaded()).done((result) => {
          const file = new File(result);
          dataRef = file.toJSON();
          loadDeferred.resolve(dataRef);
        });
        return loadDeferred;
      } else {
        alert('The File APIs are not fully supported in this browser.');
      }
    }
  }
};

class File {
  constructor(fileData) {
    this._data = getFileJSON(fileData);
    return this;
  }
  toJSON() {
    const result = {};
    Object.keys(this._data).forEach((key) => {
      result[key] = this._data[key];
    });
    return result;
  }
}

function getFileJSON(fileData) {
  let file = {
    title: "",
    authors: [],
    points: [],
    professions: [],
    relations: [],
    topics: []
  };
  let lines = fileData.split("\n");
  let meta = '';
  $.each(lines, (index, line) => {
    if (line) {
      if (file.title.length == 0 && line[0] != '#') {
        file.title = line;
      } else if (line.startsWith('# ')) {
        file.authors.push({name: line.substring(2)});
      } else if (line.startsWith('## 個人頁面')) {
        meta = 'profiles';
        file.authors[file.authors.length - 1][meta] = [];
      } else if (line.startsWith('## 關係')) {
        meta = 'relations';
        file.authors[file.authors.length - 1][meta] = [];
      } else if (line.startsWith('## 職業')) {
        meta = 'professions';
        file.authors[file.authors.length - 1][meta] = [];
      } else if (line.startsWith('## 文章')) {
        meta = 'posts';
        file.authors[file.authors.length - 1][meta] = [];
      } else if (line.startsWith('### ')) {
        const post = {
          timestamp: line.substring(4, line.indexOf('http')).trim(),
          url: line.substring(line.indexOf('http')).trim()
        }
        file.authors[file.authors.length - 1]['posts'].push(post);
      } else if (line.startsWith('- ')) {
        if (meta == 'posts') {
          if (!line.includes('#')) {
            return;
          }
          let topics = [];
          if (line.indexOf('#') > 0) {
            topics = line.substring(line.indexOf('#') + 1).split('#');
          }
          const relations = file.authors[file.authors.length - 1]['relations'];
          const professions = file.authors[file.authors.length - 1]['professions'];
          const point = {
            author: file.authors[file.authors.length - 1].name,
            timestamp: file.authors[file.authors.length - 1]['posts'][file.authors[file.authors.length - 1]['posts'].length - 1].timestamp,
            url: file.authors[file.authors.length - 1]['posts'][file.authors[file.authors.length - 1]['posts'].length - 1].url,
            relations: relations,
            professions: professions,
            topics: topics,
            content: line.substring(2, line.indexOf('#'))
          }
          file.points.push(point);
          file.topics = file.topics.concat(topics).filter(function(item, pos, self) {
            return self.indexOf(item) == pos;
          });
          file.relations = file.relations.concat(relations).filter(function(item, pos, self) {
            return self.indexOf(item) == pos;
          });;
          file.professions = file.professions.concat(professions).filter(function(item, pos, self) {
            return self.indexOf(item) == pos;
          });;
        } else {
          file.authors[file.authors.length - 1][meta].push(line.substring(2));
        }
      }
    }
  });

  return file;
}