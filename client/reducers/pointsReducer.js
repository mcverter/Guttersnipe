import * as types from '../actions/points/pointActionTypes';
import initialState from './initialState';

export default function points(
  points = initialState.points, action={}) {
  switch(action.type) {
    case types.POINTS_ALL_REQUEST:
      return Object.assign({}, {...points,
        isFetchingPoints: true,
        pointFetchError: false
      });
    case types.POINTS_ALL_REQUEST_SUCCESS:
      return Object.assign({}, {...points,
        isFetchingPoints: false,
        pointFetchError: false,
        items: action.points.items,
      });
    case types.POINTS_ALL_REQUEST_ERROR:
      return Object.assign({}, {...points,
        isFetchingPoints: false,
        pointFetchError: true
      });
    default:
      return points;
  }
}
