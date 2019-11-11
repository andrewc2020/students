"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _models = _interopRequireDefault(require("../models/"));

var _kitten = _interopRequireDefault(require("../models/kitten"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var KittenController =
/*#__PURE__*/
function () {
  function KittenController() {
    _classCallCheck(this, KittenController);
  }

  _createClass(KittenController, null, [{
    key: "getAllKittens",
    value: function getAllKittens(req, res) {
      if ((0, _models["default"])()) {
        _kitten["default"].find(function (err, kittens) {
          return res.status(200).json({
            kittens: kittens,
            message: "All the kittens"
          });
        });
      }
    }
  }, {
    key: "getSingleKitten",
    value: function getSingleKitten(req, res) {
      if ((0, _models["default"])()) {
        _kitten["default"].findOne({
          _id: ObjectId("5dc930dabd59b1c1ba22afae")
        }, function (err, kitten) {
          return res.status(200).json({
            kitten: kitten,
            message: "a single kitten record"
          });
        });
      }
    }
  }]);

  return KittenController;
}();

var _default = KittenController;
exports["default"] = _default;