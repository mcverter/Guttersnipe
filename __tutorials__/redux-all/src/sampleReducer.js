import {SAMPLE_CALLED} from "./actions";

const initialState = {
  reveal: false,
  sampleValue: "alive thanks "
};

const sampleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAMPLE_CALLED:
      return Object.assign({}, state, {reveal: action.value});
    default:
      return state;
  }
}

export default sampleReducer;
