"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _index = _interopRequireDefault(require("./routes/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Instantiate express
var app = (0, _express["default"])(); // Set our port

var port = process.env.PORT || 8000; // Configure app to user bodyParser

app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json()); // Register our routes in app

app.use('/', _index["default"]); // Start our server

app.listen(port, function () {
  console.log("Server started on port ".concat(port));
}); // Export our app for testing purposes

var _default = app;
exports["default"] = _default;