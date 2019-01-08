import * as types from "../types";
import initialState from "../store/initialState";

export default function shareables(
  shareables = initialState.shareables,
  action = {}
) {
  switch (action.type) {
    case types.SHAREABLE_LIST_REQUEST:
      return Object.assign(
        {},
        {
          shareables,
          isFetchingShareables: true,
          shareableFetchError: false
        }
      );
    case types.SHAREABLE_LIST_SUCCESS:
      console.log(shareables);
      return Object.assign(
        {},
        {
          shareables,
          isFetchingShareables: false,
          shareableFetchError: false,
          points: action.shareables.points,
          items: action.shareables.items,
          total: action.shareables.total
        }
      );
    case types.SHAREABLE_LIST_FAILURE:
      return Object.assign(
        {},
        {
          shareables,
          isFetchingShareables: false,
          shareableFetchError: true
        }
      );
    case types.SHAREABLES_SET_CURRENT:
      return Object.assign(
        {},
        {
          shareables,
          selectedIndex: action.selectedIndex,
          isFetchingShareables: false,
          shareableFetchError: false
        }
      );
    default:
      return shareables;
  }
}
