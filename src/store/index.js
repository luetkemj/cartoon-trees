const store = {
  debug: true,
  state: {
    rootPages: [],
    page: {},
    loadingRootPages: true,
    loadingPage: true,
  },
  setRootPages(newValue) {
    console.log('setRootPages', newValue);
    this.state.rootPages = newValue;
  },

  addRootPages(newValue) {
    console.log('addRootPages', newValue);
    this.state.rootPages.push(newValue);
  },

  setPage(newValue) {
    console.log('setPage', newValue);
    this.state.page = newValue;
  },

  setLoadingRootPages(newValue) {
    console.log('setLoadingRootPages', newValue);
    this.state.loadingRootPages = newValue;
  },

  setLoadingPage(newValue) {
    console.log('setLoadingPage', newValue);
    this.state.loadingPage = newValue;
  },
};

export default store;
