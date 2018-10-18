import * as types from "../types";
import initialState from "../store/initialState";

export const KROPOTKIN_SINGLE_REQUEST = "KROPOTKIN_SINGLE_REQUEST";
export const KROPOTKIN_SINGLE_REQUEST_SUCCESS =
  "KROPOTKIN_SINGLE_REQUEST_SUCCESS";
export const KROPOTKIN_SINGLE_REQUEST_ERROR = "KROPOTKIN_SINGLE_REQUEST_ERROR";

export default function kropotkin(
  kropotkin = initialState.kropotkin,
  action = {}
) {
  switch (action.type) {
    case types.KROPOTKIN_SINGLE_REQUEST:
      return Object.assign({}, kropotkin, {
        isFetchingKropotkin: true,
        kropotkinFetchError: false
      });
    case types.KROPOTKIN_SINGLE_REQUEST_SUCCESS:
      return Object.assign({}, kropotkin, {
        isFetchingKropotkin: false,
        kropotkinFetchError: false,
        paragraph: action.kropotkin.paragraph
      });
    case types.KROPOTKIN_SINGLE_REQUEST_ERROR:
      return Object.assign({}, kropotkin, {
        isFetchingKropotkin: false,
        kropotkinFetchError: true
      });
    default:
      return kropotkin;
  }
}
