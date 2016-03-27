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
  let block = false;
  let blockContent = '';
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
    if (topic.length > 0) {
      file.topics[topic].summary = summary;
    } else {
      file.description = summary;
    }
  }
  function listLevel(line) {
    if (line.startsWith('- ') || line.startsWith('* ') || line.startsWith('+ ')) {
      return 0;
    } else if (line.startsWith('  - ') || line.startsWith('  * ') || line.startsWith('  + ')) {
      return 1;
    } else if (line.startsWith('    - ') || line.startsWith('    * ') || line.startsWith('    + ')) {
      return 2;
    } else if (line.startsWith('      - ') || line.startsWith('      * ') || line.startsWith('      + ')) {
      return 3;
    } else if (line.startsWith('        - ') || line.startsWith('        * ') || line.startsWith('        + ')) {
      return 4;
    } else if (line.startsWith('          - ') || line.startsWith('          * ') || line.startsWith('          + ')) {
      return 5;
    } else if (line.startsWith('            - ') || line.startsWith('            * ') || line.startsWith('            + ')) {
      return 6;
    } else {
      return -1;
    }
  }
  function blockLevel(line) {
    if (line.startsWith('```') || line.startsWith('  ```') || line.startsWith('    ```') || line.startsWith('      ```') || line.startsWith('        ```')) {
      return 0;
    } else {
      return -1;
    }
  }
  function compileStructure(line, level) {
    order += 1;
    let leading = '';
    for ( i = 1; i <= level; i++ ) {
      leading += '  ';
    }
    currentTopic = line.replace(leading + '- ', '').trim();
    setParent(currentTopic, level, order);
  }

  $.each(lines, (index, line) => {
    if (line) {
      if (block == false) {
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
        } else if (line.startsWith('## articles') || line.startsWith('## ')) {
          meta = 'posts';
          file.authors[file.authors.length - 1][meta] = [];
        } else if (line.startsWith('### ')) {
          const post = {
            timestamp: line.substring(4, line.indexOf('http')).trim(),
            url: line.substring(line.indexOf('http')).trim()
          }
          file.authors[file.authors.length - 1]['posts'].push(post);
        } else if (line.startsWith('___') || line.startsWith('---')) {
          meta = 'structure';
        } else if (listLevel(line) >= 0) {
          if (meta == 'posts') {
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
            compileStructure(line, listLevel(line));
          } else if (file.authors.length > 0) {
            file.authors[file.authors.length - 1][meta].push(line.substring(2));
          }
        } else if (blockLevel(line) >= 0) {
          if (meta == 'structure') {
            block = true;
          }
        }
      } else if (block == true) {
        if (blockLevel(line) < 0) {
          blockContent += line.trim();
        } else {
          if (meta == 'structure') {
            setSummary(currentTopic, blockContent);
            block = false;
            blockContent = '';
          }
        }
      }
    }
  });

  return file;
}