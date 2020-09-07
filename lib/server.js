"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _index = _interopRequireDefault(require("./routes/index"));

var _models = _interopRequireDefault(require("./models"));

var _cors = _interopRequireDefault(require("cors"));

// Instantiate express
var app = (0, _express["default"])(); // Set our port

var port = process.env.PORT || 8000; // Configure app to user bodyParser

app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json()); //use config module to get the privatekey, if no private key set, end the application

if (!process.env.my_private_key) {
  console.error("FATAL ERROR: my_private_key is not defined.");
  process.exit(1);
} // Register our routes in app


app.use((0, _cors["default"])());
app.use('/', _index["default"]); // Start our server

(0, _models["default"])().then( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return app.listen(port, function () {
            console.log("Server started on port ".concat(port));
          });

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))); // Export our app for testing purposes

var _default = app;
exports["default"] = _default;