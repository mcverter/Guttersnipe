import commentsJSON from '../../../db/data/json/commentsOutput';
import shareablesJSON from '../../../db/data/json/shareablesOutput';

const initialState = {
  shareables : shareablesJSON,
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
    location: [18.135228, -97.0901879],
    latitude: 18.135228,
    longitude: -97.0901879
  }
};

export default initialState;
