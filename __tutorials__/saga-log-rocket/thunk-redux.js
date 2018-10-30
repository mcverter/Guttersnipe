const { Provider, connect } = ReactRedux;
const { createStore, applyMiddleware } = Redux;
const thunk = ReduxThunk.default;

// Reducer
const initialState = {
  url: "",
  loading: false,
  error: false
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUESTED_DOG":
      return {
        url: "",
        loading: true,
        error: false
      };
    case "REQUESTED_DOG_SUCCEEDED":
      return {
        url: action.url,
        loading: false,
        error: false
      };
    case "REQUESTED_DOG_FAILED":
      return {
        url: "",
        loading: false,
        error: true
      };
    default:
      return state;
  }
};

// Action Creators
const requestDog = () => {
  return { type: "REQUESTED_DOG" };
};

const requestDogSuccess = data => {
  return { type: "REQUESTED_DOG_SUCCEEDED", url: data.message };
};

const requestDogError = () => {
  return { type: "REQUESTED_DOG_FAILED" };
};

const fetchDog = () => {
  return dispatch => {
    dispatch(requestDog());
    fetch("https://dog.ceo/api/breeds/image/random")
      .then(res => res.json())
      .then(
        data => dispatch(requestDogSuccess(data)),
        err => dispatch(requestDogError())
      );
  };
};

// Component
class App extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() => this.props.dispatch(fetchDog())}>
          Show Dog
        </button>
        {this.props.loading ? (
          <p>Loading...</p>
        ) : this.props.error ? (
          <p>Error, try again</p>
        ) : (
          <p>
            <img src={this.props.url} />
          </p>
        )}
      </div>
    );
  }
}

// Store
const store = createStore(reducer, applyMiddleware(thunk));

const ConnectedApp = connect(state => {
  console.log(state);
  return state;
})(App);

// Container component
ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById("root")
);
