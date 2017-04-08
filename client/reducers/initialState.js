const initialState = {
  shareables : {
    isFetchingShareables: false,
    shareableFetchError: false,
    items: [],
    selectedIndex: -1,
    categorizationMeta: {},
    searchParams : {}
  },
  points : {
   isFetchingPoints: false,
    pointFetchError: false,
    items: []
  },
  auth : {
    authenticated: false,
    error: '',
    username: ''
  },
  kropotkin: {
    isFetchingKropotkin: false,
    kropotkinFetchError: false,
    paragraph: ''
  },
  browserEnv: {
    location: [40.758895,-73.9873251],
    latitude: 40.758895,
    longitude: -73.9873251
  }
};

export default initialState;
