import {fileURL} from 'model/fileURL';
import {fileSource} from 'model/fileSource';
import {fileUploaded} from 'model/fileUploaded';

let dataRef;

export const file = {
  get(key) {
    return dataRef[key];
  },
  load() {
    dataRef = {};
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
    title: '',
    description: '',
    authors: [],
    points: [],
    professions: [],
    relations: [],
    topics: {}
  };
  let lines = fileData.split("\n");
  let meta = '';
  let parents = [];
  let order = 0;
  let currentTopic = '';
  function setParent(topic, level, order) {
    if (file.topics[topic]) {
      file.topics[topic].parent = parents[level -1] || '';
      file.topics[topic].order = order;
    } else {
      file.topics[topic] = {name: topic, count: 0, parent: parents[level -1] || '', order: order, summary: ''};
    }
    parents[level] = topic;
  };
  function setSummary(topic, summary) {
    if (topic) {
      file.topics[topic].summary = summary;
    } else {
      file.description = summary;
    }
  }

  $.each(lines, (index, line) => {
    if (line) {
      if (file.title.length == 0 && line[0] != '#') {
        file.title = line;
      } else if (line.startsWith('# ')) {
        file.authors.push({name: line.substring(2)});
      } else if (line.startsWith('## profiles')) {
        meta = 'profiles';
        file.authors[file.authors.length - 1][meta] = [];
      } else if (line.startsWith('## relations')) {
        meta = 'relations';
        file.authors[file.authors.length - 1][meta] = [];
      } else if (line.startsWith('## backgrounds')) {
        meta = 'professions';
        file.authors[file.authors.length - 1][meta] = [];
      } else if (line.startsWith('## articles')) {
        meta = 'posts';
        file.authors[file.authors.length - 1][meta] = [];
      } else if (line.startsWith('### ')) {
        const post = {
          timestamp: line.substring(4, line.indexOf('http')).trim(),
          url: line.substring(line.indexOf('http')).trim()
        }
        file.authors[file.authors.length - 1]['posts'].push(post);
      } else if (line.startsWith('___')) {
        meta = 'structure';
      } else if (line.startsWith('- ')) {
        if (meta == 'posts') {
          if (!line.includes('#')) {
            //return;
          }
          let topics = [];
          let content = '';
          if (line.indexOf('#') > 0) {
            content = line.substring(2, line.indexOf('#'));
            topics = line.substring(line.indexOf('#') + 1).split('#').map((topic) => {
              if (topic.length > 0) {
                return topic.trim();
              }
            });
          } else {
            content = line.substring(2);
          }
          const relations = file.authors[file.authors.length - 1]['relations'] || '';
          const professions = file.authors[file.authors.length - 1]['professions'] || '';
          const point = {
            author: file.authors[file.authors.length - 1].name,
            timestamp: file.authors[file.authors.length - 1]['posts'][file.authors[file.authors.length - 1]['posts'].length - 1].timestamp,
            url: file.authors[file.authors.length - 1]['posts'][file.authors[file.authors.length - 1]['posts'].length - 1].url,
            relations: relations,
            professions: professions,
            topics: topics,
            content: content
          }
          file.points.push(point);
          topics.forEach((topic) => {
            if (file.topics[topic]) {
              file.topics[topic].count += 1;
            } else {
              file.topics[topic] = {name: topic , count: 1};
            }
          });
          file.relations = file.relations.concat(relations).filter(function(item, pos, self) {
            return self.indexOf(item) == pos;
          });;
          file.professions = file.professions.concat(professions).filter(function(item, pos, self) {
            return self.indexOf(item) == pos;
          });;
        } else if (meta == 'structure') {
          order += 1;
          const current = line.replace('- ', '').trim();
          currentTopic = current;
          setParent(current, 0, order);
          return;
        } else {
          file.authors[file.authors.length - 1][meta].push(line.substring(2));
        }
      } else if (line.startsWith('  - ')) {
        if (meta == 'structure') {
          order += 1;
          const current = line.replace('  - ', '').trim();
          currentTopic = current;
          setParent(current, 1, order);
        }
      } else if (line.startsWith('    - ')) {
        if (meta == 'structure') {
          order += 1;
          const current = line.replace('    - ', '').trim();
          currentTopic = current;
          setParent(current, 2, order);
        }
      } else if (line.startsWith('      - ')) {
        if (meta == 'structure') {
          order += 1;
          const current = line.replace('      - ', '').trim();
          currentTopic = current;
          setParent(current, 3, order);
        }
      } else if (line.startsWith('        - ')) {
        if (meta == 'structure') {
          order += 1;
          const current = line.replace('        - ', '').trim();
          currentTopic = current;
          setParent(current, 4, order);
        }
      } else if (line.startsWith('```')) {
        if (meta == 'structure') {
          const summary = line.replace(/```/g, '').trim();
          setSummary(currentTopic, summary);
        }
      } else if (line.startsWith('  ```')) {
        if (meta == 'structure') {
          const summary = line.replace(/```/g, '').trim();
          setSummary(currentTopic, summary);
        }
      } else if (line.startsWith('    ```')) {
        if (meta == 'structure') {
          const summary = line.replace(/```/g, '').trim();
          setSummary(currentTopic, summary);
        }
      } else if (line.startsWith('      ```')) {
        if (meta == 'structure') {
          const summary = line.replace(/```/g, '').trim();
          setSummary(currentTopic, summary);
        }
      } else if (line.startsWith('        ```')) {
        if (meta == 'structure') {
          const summary = line.replace(/```/g, '').trim();
          setSummary(currentTopic, summary);
        }
      }
    }
  });

  return file;
}