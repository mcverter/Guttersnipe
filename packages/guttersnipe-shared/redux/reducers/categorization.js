import * as types from "../types";
import initialState from "../store/initialState";

function setCurrentCategory(category) {}
function setCurrentSubcategory(subcategory) {}


export default function categorization(
  categorization = initialState.categorization,
  action = {}
) {
  switch (action.type) {
    case types.CATEGORIES_REQUEST:
      return Object.assign({}, categorization, {
        isFetchingCategorization: true,
        categorizationFetchError: false
      });
    case types.CATEGORIES_SUCCESS:
      console.log(categorization);
      return Object.assign({}, categorization, {
        isFetchingCategorization: false,
        categorizationFetchError: false,
        paragraph: action.categorization.paragraph
      });
    case types.CATEGORIES_FAILURE:

      return Object.assign({}, categorization, {
        isFetchingCategorization: false,
        categorizationFetchError: true
      });
    default:
      return categorization;
  }
}
