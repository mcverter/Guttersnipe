import * as types from '../../types';

/** Initial State */
const initialState = {
  showCarousel: false,
  gdprError: false,
  data: {},
  globalShowDeleteModal: false,
  globalShowConsentModal: false
};

const defaultAction = {
  type: '',
  data: {}
};

export function registry(state = initialState, action = defaultAction) {
  switch (action.type) {
    case types.REGISTRY_DATA_REQUEST:
      return {...state, showCarousel: false};
    case types.REGISTRY_DATA_SUCCESS:
      return {...state, showCarousel: true, data: action.data};
    case types.REGISTRY_DATA_OVER_THRESHOLD:
      return {...state, showCarousel: false, data: action.data};
    case types.GDPR_ERROR:
      return {...state, gdprError: true, globalShowDeleteModal: false, globalShowConsentModal: false};
    case types.REGISTRY_DELETE_REQUEST:
      return {...state, globalShowDeleteModal: true};
    case types.REGISTRY_DELETE_SUCCESS:
      return {...state, globalShowDeleteModal: false};
    case types.REGISTRY_WITHDRAW_SUCCESS:
      return {...state, globalShowConsentModal: false};
    case types.REGISTRY_WITHDRAW_REQUEST:
      return {...state, globalShowConsentModal: true};
    default:
      return state;
  }
}
