const commentsJSON = require("./comments");
const { allShareableListItems } = require("./shareables");
const shareablesJSON = allShareableListItems;
const categorizationJSON = require("./categorizations");

const initialState = {
  shareables: {
    isFetchingShareables: false,
    shareableFetchError: false,
    shareables: shareablesJSON,
    selectedIndex: -1
  },
  /*  comments : {
    comments : commentsJSON,
    isFetchingComments: false,
    shareableCommentsError: false,
  },
  */
  categorization: {
    categorization: categorizationJSON,
    isFetchingCategorization: false,
    categorizationFetchError: false
  },
  kropotkin: {
    isFetchingKropotkin: false,
    kropotkinFetchError: false,
    paragraph: ""
  },
  /* Not implemented yet */
  auth: {
    authenticated: false,
    error: "",
    username: ""
  },
  location: {
    location: [18.135228, -97.0901879],
    latitude: 18.135228,
    longitude: -97.0901879
  }
  /*
  mapCenter: {
    location: [18.135228, -97.0901879],
    latitude: 18.135228,
    longitude: -97.0901879
  }
*/
};

module.exports = initialState;
