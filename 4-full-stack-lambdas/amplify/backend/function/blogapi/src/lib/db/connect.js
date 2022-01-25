"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = exports.collection = void 0;

var _mongodb = require("mongodb");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var dbClient = null;

var connect = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
    var client;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!dbClient) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", dbClient);

          case 2:
            _context.prev = 2;
            console.log("Connecting to mongo db at ".concat(url));
            _context.next = 6;
            return _mongodb.MongoClient.connect(url, {
              useNewUrlParser: true,
              // new url parser
              useUnifiedTopology: true,
              // new connection engine
              maxPoolSize: 10 // how many connections can be made

            });

          case 6:
            client = _context.sent;
            dbClient = client;
            console.log("Connected to mongo db at ".concat(url));
            return _context.abrupt("return", dbClient);

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](2);
            console.log(_context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 12]]);
  }));

  return function connect(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.connect = connect;

var getDB = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dbName) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (dbClient) {
              _context2.next = 2;
              break;
            }

            throw new Error('Must call "connect" before calling getDB.');

          case 2:
            return _context2.abrupt("return", dbClient.db(dbName));

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getDB(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var collection = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(collectionName) {
    var db, collection;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getDB('blog');

          case 2:
            db = _context3.sent;
            _context3.next = 5;
            return db.collection(collectionName);

          case 5:
            collection = _context3.sent;
            return _context3.abrupt("return", collection);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function collection(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.collection = collection;