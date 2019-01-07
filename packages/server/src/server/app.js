const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require('cors')

const indexRouter = require("./routes/index");
const kropotkinRouter = require("./routes/kropotkins");
const shareableRouter = require("./routes/shareables");

const app = express();

app.use(cors())
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/shareable", shareableRouter);
app.use("/api/kropotkin", kropotkinRouter);
app.use("/api/shareables", shareableRouter);
app.use("/api/kropotkins", kropotkinRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/web/public')));


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  let sentFilePath = req.url.startsWith("index.html") ?
    "/index.html" : req.url;
  res.sendFile(path.join(__dirname,  '/../client/web/build', sentFilePath));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
