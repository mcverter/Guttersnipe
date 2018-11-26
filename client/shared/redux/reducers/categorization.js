import * as types from "../types";
import initialState from "../store/initialState";

function setCurrentCategory(category) {}
function setCurrentSubcategory(subcategory) {}


export default function categorization(
  categorization = initialState.categorization,
  action = {}
) {
  switch (action.type) {
    case types.CATEGORIZATION_REQUEST:
      return Object.assign({}, categorization, {
        isFetchingCategorization: true,
        categorizationFetchError: false
      });
    case types.CATEGORIZATION_SUCCESS:
      return Object.assign({}, categorization, {
        isFetchingCategorization: false,
        categorizationFetchError: false,
        paragraph: action.categorization.paragraph
      });
    case types.CATEGORIZATION_ERROR:
      return Object.assign({}, categorization, {
        isFetchingCategorization: false,
        categorizationFetchError: true
      });
    default:
      return categorization;
  }
}
