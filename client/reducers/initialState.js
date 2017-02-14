const initialState = {
    shareables : {
        isFetchingShareables: false,
        shareableFetchError: false,
        items: [],
        selectedIndex: -1,
      categorizationMeta: {}
    },
  auth : {
      authenticated: false,
    error: ''
  },
  kropotkin: {
        isFetchingKropotkin: false,
        kropotkinFetchError: false,
        paragraph: ''
  },
  browserEnv: {
      location: {}
  }
};

export default initialState;
