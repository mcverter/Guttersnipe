let SERVER_URL;
let $NODE_ENV = false;
if ($NODE_ENV === "production" || $NODE_ENV === "prod") {
  SERVER_URL = "http://localhost:3000";
} else {
  SERVER_URL = "http://localhost:3000";
}

export default {
  SERVER_URL
};
