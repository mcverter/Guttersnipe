const initialState = {
    shareables : {
        isFetchingShareables: false,
        shareableFetchError: false,
        items: [],
        selectedIndex: -1,
      categorizationMeta: {}
    },
  auth : {
      authenticated: true,
    error: ''
  }
};

export default initialState;
