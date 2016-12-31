import * as types from '../actions/actionTypes';
import initialState from './initialState';

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
