var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();
require("dotenv").config();

// view engine setup
app.set("views", path.join(__dirname, "views/pages"));

app.set("view engine", "pug");
//middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//routes
app.use("/", require("./views/routes"));
app.use("/api/v1", require("./routes"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// //firebase-admin
// var admin = require("firebase-admin");
// var serviceAccount = require("./service-account-file.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   // databaseURL: "<your database URL here>"
// });

module.exports = app;
