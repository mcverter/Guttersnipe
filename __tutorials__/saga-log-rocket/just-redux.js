const { Provider, connect } = ReactRedux;
const createStore = Redux.createStore;

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

const requestDogaError = () => {
  return { type: "REQUESTED_DOG_FAILED" };
};

const fetchDog = dispatch => {
  dispatch(requestDog());
  return fetch("https://dog.ceo/api/breeds/image/random")
    .then(res => res.json())
    .then(
      data => dispatch(requestDogSuccess(data)),
      err => dispatch(requestDogError())
    );
};

// Component
class App extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() => fetchDog(this.props.dispatch)}>Show Dog</button>
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
const store = createStore(reducer);

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
