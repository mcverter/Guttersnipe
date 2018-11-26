export function fetchShareableCategorizations() {
  return (dispatch, getState) => {
    const shareableState = getState().shareables;
    if (
      !shareableState.categorizationMeta ||
      !shareableState.categorizationMeta.types
    ) {
      dispatch({ type: types.SHAREABLE_CATEGORIZATION_REQUEST });
      return fetch(`${SERVER_URL}/api/shareables/categorization`)
        .then(response => response.json())
        .then(json => dispatch(receiveShareableCategorization(json)));
    }
  };
}

function receiveShareableCategorization(json) {
  return {
    type: types.SHAREABLE_CATEGORIZATIONS_SUCCESS,
    categorizationMeta: json
  };
}


