const pagesStore = {
  state: {
    rootPages: [],
    page: {},
    loadingRootPages: true,
    loadingPage: true,
  },
  setRootPages(newValue) {
    this.state.rootPages = newValue;
  },

  setPage(newValue) {
    this.state.page = newValue;
  },

  setLoadingRootPages(newValue) {
    this.state.loadingRootPages = newValue;
  },

  setLoadingPage(newValue) {
    this.state.loadingPage = newValue;
  },
};

export default pagesStore;
