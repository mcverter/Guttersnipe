import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function shareables(shareables = initialState.shareables, action={}) {
  switch(action.type) {
    case types.SHAREABLE_CATEGORIZATIONS_SUCCESS:
      const foo = Object.assign({}, shareables, {
        categorizationMeta : action.categorizationMeta
      });
      console.log("retval", foo);
      return foo;

    case types.SHAREABLES_ALL_REQUEST:
      return Object.assign({}, shareables, {
        isFetchingShareables: true,
        shareableFetchError: false
      });
    case types.SHAREABLES_SET_CURRENT:
      return Object.assign({}, shareables, {
        selectedIndex: action.selectedIndex,
        isFetchingShareables: false,
        shareableFetchError: false
      });

    case types.SHAREABLE_SINGLE_REQUEST:
      return Object.assign({}, shareables, {
        isFetchingShareables: true,
        shareableFetchError: false
      });

    case types.SHAREABLE_SINGLE_REQUEST_SUCCESS:
      return Object.assign({}, shareables, {
        isFetchingShareables: false,
        shareableFetchError: false,
        items: shareables.items.concat(action.shareables),
        selectedIndex: action.shareables.id
      });


    case types.SHAREABLE_SINGLE_REQUEST_ERROR:
      return Object.assign({}, shareables, {
        isFetchingShareables: false,
        shareableFetchError: true
      });

    case types.SHAREABLES_ALL_REQUEST_SUCCESS:
      return Object.assign({}, ...shareables, {
        isFetchingShareables: false,
        shareableFetchError: false,
        items: action.shareables
      });

    case types.SHAREABLES_ALL_REQUEST_ERROR:
      return Object.assign({}, shareables, {
        isFetchingShareables: false,
        shareableFetchError: true
      });

    default:
      return shareables;
  }
}


/*

 import {combineReducers} from 'redux'
 import {
 SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT,
 REQUEST_POSTS, RECIEVE_POSTS
 } from 'actions'

 function selectedSubreddit(state='reactjs', action = {}) {
 switch(action.type) {
 case SELECT_SUBREDDIT:
 return action.subreddit
 default:
 return state
 }
 }

 function posts(state={
 isFetching: false,
 didInvalidate: false,
 items: []
 }, action={}) {
 switch(action.type) {
 case INVALIDATE_SUBREDDIT:
 return Object.assign({}, state, {
 didInvalidate: true
 })
 case REQUEST_POSTS:
 return Object.assign({}, state, {
 isFetching: true,
 didInvalidate: false
 })
 case RECIEVE_POSTS:
 return Object.assign({}, state , {
 isFetching: false,
 didInvalidate: false,
 items: action.posts,
 lastUpdated: action.receivedAt
 })
 default:
 return state
 }
 }

 function postsBySubreddit(state={}, action={}) {
 switch(action.type) {
 case INVALIDATE_SUBREDDIT:
 case RECIEVE_POSTS:
 case RECIEVE_POSTS:
 return Object.assign({}, state, {
 [action.subreddit]: posts(state[action.subreddit], action)
 })
 default:
 return state
 }
 }

 const rootReducer = combineReducers({
 postsBySubreddit, selectedSubreddit
 })


 const posts = (state = {
 isFetching: false,
 didInvalidate: false,
 items: []
 }, action) => {
 switch (action.type) {
 case INVALIDATE_REDDIT:
 return {
 ...state,
 didInvalidate: true
 }
 case REQUEST_POSTS:
 return {
 ...state,
 isFetching: true,
 didInvalidate: false
 }
 case RECEIVE_POSTS:
 return {
 ...state,
 isFetching: false,
 didInvalidate: false,
 items: action.posts,
 lastUpdated: action.receivedAt
 }
 default:
 return state

 export default function shareableReducer(state = initialState.shareables, action ={}) {
 switch (action.type) {
 case types.LOAD_SHAREABLES_SUCCESS:
 return action.shareables;

 case types.CREATE_SHAREABLE_SUCCESS:
 return [
 ...state,
 Object.assign({}, action.shareable)
 ];

 case types.UPDATE_SHAREABLE_SUCCESS:
 return [
 ...state.filter(shareable => shareable.id !== action.shareable.id),
 Object.assign({}, action.shareable)
 ];

 default:
 return state;
 }
 }
 */
