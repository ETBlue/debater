import {eventful} from 'utils/events';
import {file} from 'model/recordData/file';
import {authors} from 'model/recordData/authors';
import {professions} from 'model/recordData/professions';
import {relations} from 'model/recordData/relations';
import {topics} from 'model/recordData/topics';
import {points} from 'model/recordData/points';

export const recordData = {
  loadFile() {
    this.trigger('load:file');
    return file.load().done((fileData) => {
      this.trigger('loaded:file', fileData);
    });
  },
  loadAuthors() {
    this.trigger('load:authors');
    return authors.load().done((authorsData) => {
      this.trigger('loaded:authors', authorsData);
    });
  },
  loadProfessions() {
    this.trigger('load:professions');
    return professions.load().done((professionsData) => {
      this.trigger('loaded:professions', professionsData);
    });
  },
  loadRelations() {
    this.trigger('load:relations');
    return relations.load().done((relationsData) => {
      this.trigger('loaded:relations', relationsData);
    });
  },
  loadTopics() {
    this.trigger('load:topics');
    return topics.load().done((topicsData) => {
      this.trigger('loaded:topics', topicsData);
    });
  },
  loadPoints() {
    this.trigger('load:points');
    return points.load().done((pointsData) => {
      this.trigger('loaded:points', pointsData);
    });
  }
};
export default recordData;

eventful(recordData);
