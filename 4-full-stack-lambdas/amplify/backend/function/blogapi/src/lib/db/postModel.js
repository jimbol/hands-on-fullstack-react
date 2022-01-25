"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateOne = exports.insertOne = exports.getOne = exports.getAll = exports.deleteOne = void 0;

var _mongodb = require("mongodb");

var _connect = require("./connect");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var insertOne = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(post) {
    var posts;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _connect.collection)('posts');

          case 2:
            posts = _context.sent;
            _context.next = 5;
            return posts.insertOne(post);

          case 5:
            return _context.abrupt("return", _context.sent);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function insertOne(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.insertOne = insertOne;

var getAll = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var posts;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _connect.collection)('posts');

          case 2:
            posts = _context2.sent;
            _context2.next = 5;
            return posts.find({}).toArray();

          case 5:
            return _context2.abrupt("return", _context2.sent);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getAll() {
    return _ref2.apply(this, arguments);
  };
}();

exports.getAll = getAll;

var getOne = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(postId) {
    var posts;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _connect.collection)('posts');

          case 2:
            posts = _context3.sent;
            _context3.next = 5;
            return posts.findOne({
              _id: (0, _mongodb.ObjectId)(postId)
            });

          case 5:
            return _context3.abrupt("return", _context3.sent);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getOne(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getOne = getOne;

var deleteOne = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(postId) {
    var posts;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _connect.collection)('posts');

          case 2:
            posts = _context4.sent;
            _context4.next = 5;
            return posts.deleteOne({
              _id: (0, _mongodb.ObjectId)(postId)
            });

          case 5:
            return _context4.abrupt("return", _context4.sent);

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function deleteOne(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

exports.deleteOne = deleteOne;

var updateOne = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(postId, updates) {
    var posts, result;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _connect.collection)('posts');

          case 2:
            posts = _context5.sent;
            _context5.next = 5;
            return posts.updateOne({
              _id: (0, _mongodb.ObjectId)(postId)
            }, {
              $set: updates
            });

          case 5:
            result = _context5.sent;
            return _context5.abrupt("return", result);

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function updateOne(_x4, _x5) {
    return _ref5.apply(this, arguments);
  };
}();

exports.updateOne = updateOne;