"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _app = require("@/utils/app");

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  state: {
    toKen: '',
    username: ''
  },
  mutations: {
    setToken: function setToken(state, value) {
      (0, _app.setToken)(value);
      state.toKen = value;
    },
    setUsername: function setUsername(state, value) {
      (0, _app.setUsername)(value);
      state.username = value;
    }
  },
  actions: {},
  modules: {
    config: _config["default"]
  }
});

exports["default"] = _default;