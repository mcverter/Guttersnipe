export const shareablesSelector = state => {};
export const singleShareableSelector = state => {};
export const categoriesSelector = state => {
};
export const subcategoriesSelector = state => {};

/*
24

You will have to use selectors for that. I'll give a simple example. Create a file selectors.js and add the fields you want to select from your store, as shown below.

export const username = (state) => state.user.name;
Then in your saga, import the selectors as,

import * as selectors from './selectors';
and when you require username in your saga, you can simply do,

import {select} from 'redux-saga/effects';
...
...
function *sampleSaga(params) {
   const username = yield select(selectors.username);
}
the constant username in sampleSaga will now hold the username value from state.


 */
