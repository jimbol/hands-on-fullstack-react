"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPost = require("./getPost");

Object.keys(_getPost).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getPost[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _getPost[key];
    }
  });
});

var _getPosts = require("./getPosts");

Object.keys(_getPosts).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getPosts[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _getPosts[key];
    }
  });
});

var _createPost = require("./createPost");

Object.keys(_createPost).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _createPost[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _createPost[key];
    }
  });
});

var _deletePost = require("./deletePost");

Object.keys(_deletePost).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _deletePost[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _deletePost[key];
    }
  });
});

var _updatePost = require("./updatePost");

Object.keys(_updatePost).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _updatePost[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _updatePost[key];
    }
  });
});