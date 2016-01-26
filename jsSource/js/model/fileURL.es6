let url = localStorage.getItem('debaterfileurl');

export const fileURL = {
  getURL() {
    return url;
  },
  setURL(fileURL) {
    url = fileURL;
    localStorage.setItem('gw2apiurl', url);
  }
};

export default fileURL;