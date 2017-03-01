let url;
if (__DEV__) {
  url = 'http://localhost:5000';
} else {
  url = '';
}

export const SERVER_URL = url;
