import * as types from "../types";

export const fetchAllShareablesSuccessAction = (dummyOutput) => {
  return {
    type: "ASYNC_FETCH_SUCCESS",
    output: "ASYNC_FETCH_SUCCESS ".concat(dummyOutput)
  }
}

export const fetchAllShareablesFailureAction = () => {
  return {
    type: "ASYNC_FETCH_ERROR",
    output: "ASYNC_FETCH_ERROR - Async fetch failed"
  }
}
