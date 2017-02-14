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
      location: [18.135228, -97.0901879],
    latitude: 18.135228,
    longitude: -97.0901879
  }
};

export default initialState;
