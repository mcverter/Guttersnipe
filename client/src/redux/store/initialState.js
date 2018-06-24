import commentsJSON from './commentsOutput';
import {allShareableListItems as shareablesJSON} from './shareablesOutput';

const initialState = {
  shareables : {
    isFetchingShareables: false,
    shareableFetchError: false,
    shareables: shareablesJSON,
    selectedIndex: -1,
  },
  comments : {
    comments : commentsJSON,
    isFetchingComments: false,
    shareableCommentsError: false,
  },
  categories : {
    categories: undefined,
    isFetchingCategories: false,
    categoriesFetchError: false,
  },
  subcategories : {
    subcategories: undefined,
    isFetchingSubcategories: false,
    subcategoriesFetchError: false,
  },
  kropotkin: {
    isFetchingKropotkin: false,
    kropotkinFetchError: false,
    paragraph: ''
  },
/* Not implemented yet */
  auth : {
    authenticated: false,
    error: '',
    username: ''
  },
  location: {
    location: [18.135228, -97.0901879],
    latitude: 18.135228,
    longitude: -97.0901879
  },
  mapCenter: {
    location: [18.135228, -97.0901879],
    latitude: 18.135228,
    longitude: -97.0901879
  }

};

export default initialState;