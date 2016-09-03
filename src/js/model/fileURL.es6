let storage = localStorage.getItem('debaterData');
let url;

if ( storage ) {
  if ( storage.indexOf('current') > -1) {
    url = JSON.parse(storage);
  } else {
    url = {current: storage, recent: {}};
  }
}

export const fileURL = {
  getURL() {
    if (url) {
      return url.current;
    } else {
      return null;
    }
  },
  setURL(fileURL) {
    if (!url) {
      url = {current: '', recent: {}};
    } else if (!url.current) {
      url = {current: '', recent: {}};
    }
    url.current = fileURL;
    localStorage.setItem('debaterData', JSON.stringify(url));
    history.pushState({},'','?source=' + fileURL);
  },
  getHistory() {
    return url.recent;
  },
  setHistory(fileURL, docTitle) {
    if (!url) {
      url = {current: '', recent: {}};
    } else if (!url.recent) {
      url = {current: '', recent: {}};
    }
    url.recent[fileURL] = docTitle;
    localStorage.setItem('debaterData', JSON.stringify(url));
  },
  clearHistory() {
    localStorage.removeItem('debaterData');
  }
};

export default fileURL;