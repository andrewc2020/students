"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _kitten = _interopRequireDefault(require("../models/kitten"));

var _expressValidator = require("express-validator");

var KittenController =
/*#__PURE__*/
function () {
  function KittenController() {
    (0, _classCallCheck2["default"])(this, KittenController);
  }

  (0, _createClass2["default"])(KittenController, null, [{
    key: "getAllKittens",
    value: function getAllKittens(req, res) {
      _kitten["default"].find(function (err, kittens) {
        return res.status(200).json({
          kittens: kittens,
          message: "All the kittens"
        }); // end return
      }); //end find

    } // end method

  }, {
    key: "getAllKittensSortedByName",
    value: function getAllKittensSortedByName(req, res) {
      _kitten["default"].find(function (err, kittens) {
        if (err) {
          return res.status(500);
        }

        var sortedByName = kittens.sort(function (a, b) {
          return a.name > b.name ? 1 : -1;
        });
        return res.status(200).json({
          sortedByName: sortedByName,
          message: "all the kittens sorted by name"
        });
      });
    }
  }, {
    key: "getSingleKitten",
    value: function getSingleKitten(req, res) {
      _kitten["default"].findById(req.params.id, function (err, kitten) {
        if (!kitten) {
          return res.status(404).json({
            message: "kitten not found"
          });
        }

        return res.status(200).json({
          kitten: kitten,
          message: "a single kitten record"
        });
      });
    }
  }, {
    key: "addKitten",
    value: function () {
      var _addKitten = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res) {
        var errors, _validate, error, k;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                errors = (0, _expressValidator.validationResult)(req);

                if (errors.isEmpty()) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", res.status(422).json({
                  errors: errors.array()
                }));

              case 3:
                _validate = (0, _kitten["default"])(req.body.kitten), error = _validate.error;

                if (!error) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", res.status(400).send(error.details[0].message));

              case 6:
                k = new _kitten["default"]({
                  name: req.body.kitten.name
                });
                _context.next = 9;
                return k.save(function (err, result) {
                  if (err) {
                    return res.status(422).json({
                      message: err
                    });
                  }

                  return res.status(200).json({
                    result: result,
                    message: "success"
                  });
                });

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function addKitten(_x, _x2) {
        return _addKitten.apply(this, arguments);
      }

      return addKitten;
    }()
  }, {
    key: "deleteKitten",
    value: function deleteKitten(req, res) {
      _kitten["default"].findById(req.params.id, function (err, kitten) {
        _kitten["default"].deleteOne(kitten, function (err) {
          if (err) {
            return status(404);
          }

          return KittenController.getAllKittens(req, res);
        });
      });
    }
  }]);
  return KittenController;
}();

var _default = KittenController;
exports["default"] = _default;