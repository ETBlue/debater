import {fileURL} from 'model/fileURL';
import {record} from 'model/recordData/record';


export const recordData = {
  loadRecord() {
    this.trigger('load:record');
    return record.load().done((recordData) => {
      this.trigger('loaded:record', recordData);
    });
  },
export default recordData;

eventful(recordData);
