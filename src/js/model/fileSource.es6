let source = '';

export const fileSource = {
  get() {
    return source;
  },
  set(fileSource) {
    source = fileSource;
  }
};

export default fileSource;