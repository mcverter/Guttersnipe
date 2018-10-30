/*
import * as types from '../../types';
import axios from 'axios';
axios.defaults.withCredentials = true;

import {API_URL, OPT_OUT_URL} from '../../../config';
const JSON_SIZE_THRESHOLD = 2097152;  // 2MB

export const requestOptOut = () => (dispatch) => {
  dispatch({type: types.REGISTRY_OPTOUT_REQUEST});
  return axios.post(OPT_OUT_URL)
    .then((response) => {
      const status = response.status;
      if ((response.data && response.data.errors && response.data.errors.length > 0)
        || (status < 200 || status >= 400)) {
        dispatch({type: types.GDPR_ERROR});
      } else {
        dispatch({type: types.REGISTRY_OPTOUT_SUCCESS});
      }
    })
    .catch((error) => {
      console.log('Registry Error:', error);
      dispatch({type: types.GDPR_ERROR});
    });
};

export const requestWithdrawConsent = () => (dispatch) => {
  dispatch({type: types.REGISTRY_WITHDRAW_REQUEST});
  return axios.post(API_URL + '/withdraw')
    .then((response) => {
      const status = response.status;
      if ((response.data && response.data.errors && response.data.errors.length > 0)
        || (status < 200 || status >= 400)) {
        dispatch({type: types.GDPR_ERROR});
      } else {
        dispatch({type: types.REGISTRY_WITHDRAW_SUCCESS});
      }
    })
    .catch((error) => {
      console.log('Registry Error:', error);
      dispatch({type: types.GDPR_ERROR});
    });
};

export const requestDeleteData = () => (dispatch) => {
  dispatch({type: types.REGISTRY_DELETE_REQUEST});
  return axios.post(API_URL + '/forget')
    .then((response) => {
      const status = response.status;
      if ((response.data && response.data.errors && response.data.errors.length > 0)
        || (status < 200 || status >= 400)) {
        dispatch({type: types.GDPR_ERROR});
      } else {
        dispatch({type: types.REGISTRY_DELETE_SUCCESS});
      }
    })
    .catch((error) => {
      console.log('Registry Error:', error);
      dispatch({type: types.GDPR_ERROR});
    });
};

export const requestRegistryData = () => (dispatch) => {
  dispatch({type: types.REGISTRY_DATA_REQUEST});
  return (
    // axios.get(API_URL)
    axios.get('http://localhost:3000/lonlatest')
      .then((response) => {
        const status = response.status;
        const size = response.headers['content-length'];
        const contents = response.data;
        const errors = contents.errors;
        const data = contents.data;
        if ((errors && errors.length) ||
          status < 200 || status >= 400) {
          dispatch ({type: types.GDPR_ERROR});
        } else if (size >= JSON_SIZE_THRESHOLD ||
          (data && data.dataLength && data.dataLength >= JSON_SIZE_THRESHOLD)) {
          dispatch({type: types.REGISTRY_DATA_OVER_THRESHOLD, data});
        } else {
          dispatch({type: types.REGISTRY_DATA_SUCCESS, data});
        }
      })
      .catch((error) => {
        console.log('Registry Error:', error);
        dispatch({type: types.GDPR_ERROR});
      })
  );
};
*/
