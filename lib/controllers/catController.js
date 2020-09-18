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

var _Cat = _interopRequireDefault(require("../models/Cat"));

var _expressValidator = require("express-validator");

var CatController = /*#__PURE__*/function () {
  function CatController() {
    (0, _classCallCheck2["default"])(this, CatController);
  }

  (0, _createClass2["default"])(CatController, null, [{
    key: "getAllCats",
    value: function getAllCats(req, res) {
      _Cat["default"].find(function (err, Cats) {
        return res.status(200).json({
          Cats: Cats,
          message: "All the Cats"
        }); // end return
      }); //end find

    } // end method

  }, {
    key: "getAllCatsSortedByName",
    value: function getAllCatsSortedByName(req, res) {
      _Cat["default"].find(function (err, Cats) {
        if (err) {
          return res.status(500);
        }

        var sortedByName = Cats.sort(function (a, b) {
          return a.name > b.name ? 1 : -1;
        });
        return res.status(200).json({
          sortedByName: sortedByName,
          message: "all the Cats sorted by name"
        });
      });
    }
  }, {
    key: "getSingleCat",
    value: function getSingleCat(req, res) {
      _Cat["default"].findById(req.params.id, function (err, Cat) {
        if (!Cat) {
          return res.status(404).json({
            message: "Cat not found"
          });
        }

        return res.status(200).json({
          Cat: Cat,
          message: "a single Cat record"
        });
      });
    }
  }, {
    key: "addCat",
    value: function () {
      var _addCat = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
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
                _validate = (0, _Cat["default"])(req.body.Cat), error = _validate.error;

                if (!error) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", res.status(400).send(error.details[0].message));

              case 6:
                k = new _Cat["default"]({
                  name: req.body.Cat.name
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

      function addCat(_x, _x2) {
        return _addCat.apply(this, arguments);
      }

      return addCat;
    }()
  }, {
    key: "deleteCat",
    value: function deleteCat(req, res) {
      _Cat["default"].findById(req.params.id, function (err, Cat) {
        Cat.deleteOne(Cat, function (err) {
          if (err) {
            return status(404);
          }

          return CatController.getAllCats(req, res);
        });
      });
    }
  }]);
  return CatController;
}();

var _default = CatController;
exports["default"] = _default;