"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.getUserById = exports.deleteUser = exports.getUsers = exports.updateUserProfile = exports.getUserProfile = exports.authUser = exports.registerUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _user = _interopRequireDefault(require("../models/user"));

var _generateToken = _interopRequireDefault(require("../utils/generateToken"));

// @desc    register user
// @route   POST /api/user/register
// @access  public
var registerUser = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, name, email, password, isUserExisted, user;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
            _context.next = 3;
            return _user["default"].findOne({
              email: email
            });

          case 3:
            isUserExisted = _context.sent;

            if (!isUserExisted) {
              _context.next = 7;
              break;
            }

            res.status(400);
            throw new Error("user existed.");

          case 7:
            _context.next = 9;
            return _user["default"].create({
              name: name,
              email: email,
              password: password
            });

          case 9:
            user = _context.sent;

            if (!user) {
              _context.next = 14;
              break;
            }

            res.status(201).json({
              _id: user._id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
              token: (0, _generateToken["default"])(user._id)
            });
            _context.next = 16;
            break;

          case 14:
            res.status(400);
            throw new Error("invalid user information.");

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); // @desc    auth user & get token
// @route   GET /api/user/login
// @access  public

exports.registerUser = registerUser;
var authUser = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body2, email, password, user;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
            _context2.next = 3;
            return _user["default"].findOne({
              email: email
            });

          case 3:
            user = _context2.sent;
            _context2.t0 = user;

            if (!_context2.t0) {
              _context2.next = 9;
              break;
            }

            _context2.next = 8;
            return user.matchPassword(password);

          case 8:
            _context2.t0 = _context2.sent;

          case 9:
            if (!_context2.t0) {
              _context2.next = 13;
              break;
            }

            res.json({
              _id: user._id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
              token: (0, _generateToken["default"])(user._id)
            });
            _context2.next = 15;
            break;

          case 13:
            res.status(401);
            throw new Error("auth error.");

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); // @desc    get user details after login
// @route   GET /api/user/profile
// @access  private

exports.authUser = authUser;

var getUserProfile = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _user["default"].findById(req.user._id);

          case 2:
            user = _context3.sent;

            if (!user) {
              _context3.next = 7;
              break;
            }

            res.json({
              _id: user._id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin
            });
            _context3.next = 9;
            break;

          case 7:
            res.status(404);
            throw new Error("user not found.");

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getUserProfile(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); // @desc    update user details
// @route   PUT /api/user/profile
// @access  private


exports.getUserProfile = getUserProfile;
var updateUserProfile = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var user, _updateUser;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _user["default"].findById(req.user._id);

          case 2:
            user = _context4.sent;

            if (!user) {
              _context4.next = 13;
              break;
            }

            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;

            if (req.body.password) {
              user.password = req.body.password;
            }

            _context4.next = 9;
            return user.save();

          case 9:
            _updateUser = _context4.sent;
            res.json({
              _id: _updateUser._id,
              name: _updateUser.name,
              email: _updateUser.email,
              isAdmin: _updateUser.isAdmin,
              token: (0, _generateToken["default"])(_updateUser._id)
            });
            _context4.next = 15;
            break;

          case 13:
            res.status(404);
            throw new Error("user not found.");

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()); // @desc    get all users
// @route   GET /api/user
// @access  private (only admin)

exports.updateUserProfile = updateUserProfile;
var getUsers = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var users;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _user["default"].find({});

          case 2:
            users = _context5.sent;

            if (!users) {
              _context5.next = 7;
              break;
            }

            res.json(users);
            _context5.next = 9;
            break;

          case 7:
            res.status(404);
            throw new Error("user not found.");

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}()); // @desc    delete user
// @route   DELETE /api/user/:id
// @access  private (only admin)

exports.getUsers = getUsers;
var deleteUser = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _user["default"].findById(req.params.id);

          case 2:
            user = _context6.sent;

            if (!user) {
              _context6.next = 9;
              break;
            }

            _context6.next = 6;
            return user.remove();

          case 6:
            res.json({
              message: 'user deleted.'
            });
            _context6.next = 11;
            break;

          case 9:
            res.status(404);
            throw new Error("user not found.");

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}()); // @desc    get user info
// @route   GET /api/user/:id 
// @access  private (only admin)

exports.deleteUser = deleteUser;
var getUserById = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _user["default"].findById(req.params.id).select('-password');

          case 2:
            user = _context7.sent;

            if (!user) {
              _context7.next = 7;
              break;
            }

            res.json(user);
            _context7.next = 9;
            break;

          case 7:
            res.status(404);
            throw new Error("user not found.");

          case 9:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}()); // @desc    update user info
// @route   PUT /api/user/:id 
// @access  private (only admin)

exports.getUserById = getUserById;
var updateUser = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var user, _updateUser2;

    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _user["default"].findById(req.params.id);

          case 2:
            user = _context8.sent;

            if (!user) {
              _context8.next = 13;
              break;
            }

            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.isAdmin = req.body.isAdmin || user.isAdmin;
            _context8.next = 9;
            return user.save();

          case 9:
            _updateUser2 = _context8.sent;
            res.json({
              _id: _updateUser2._id,
              name: _updateUser2.name,
              email: _updateUser2.email,
              isAdmin: _updateUser2.isAdmin
            });
            _context8.next = 15;
            break;

          case 13:
            res.status(404);
            throw new Error("user not found.");

          case 15:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());
exports.updateUser = updateUser;