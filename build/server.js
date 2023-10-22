"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cors = _interopRequireDefault(require("cors"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _mongodb = require("mongodb");
var _path = _interopRequireDefault(require("path"));
var _dotenv = _interopRequireDefault(require("dotenv"));
// import history from 'connect-history-api-fallback';

var port = process.env.PORT || 8000;
if (port === 8000) {
  _dotenv["default"].config();
}
var mongoAtlas = "mongodb+srv://".concat(process.env.MONGO_USER, ":").concat(process.env.MONGO_PASS, "@freecluster.tfe0qix.mongodb.net/?retryWrites=true&w=majority");
var mongoLocal = 'mongodb://127.0.0.1:27017';
var app = (0, _express["default"])();
var client = null;
var BLACKLIST = new Set();
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use('/images', _express["default"]["static"](_path["default"].join(__dirname, '../assets')));
app.use(_express["default"]["static"](_path["default"].resolve(__dirname, '../dist'), {
  maxAge: '1y',
  etag: false
}));
// app.use(history());

var validateToken = function validateToken(req, res, next) {
  try {
    var token;
    var authHeader = req.headers.Authorization || req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send("User is not authorized or missing token");
    }
    token = authHeader.split(" ")[1];
    if (BLACKLIST.has(token)) {
      return res.status(401).send('Token revoked');
    }
    _jsonwebtoken["default"].verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
      if (err) {
        console.log(err);
        return res.status(401).send("User is not authorized");
      }
      req.user = decoded.user;
      next();
    });
  } catch (error) {
    next(error);
  }
};
var connnectToDB = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!client) {
            _context.next = 2;
            break;
          }
          return _context.abrupt("return", client);
        case 2:
          ;
          _context.prev = 3;
          _context.next = 6;
          return _mongodb.MongoClient.connect(process.env.MONGO_USER && process.env.MONGO_PASS ? mongoAtlas : mongoLocal, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });
        case 6:
          client = _context.sent;
          return _context.abrupt("return", client);
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](3);
          console.log("Error connecting to MongoDB:", _context.t0);
          throw _context.t0;
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 10]]);
  }));
  return function connnectToDB() {
    return _ref.apply(this, arguments);
  };
}();
var database = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var client;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return connnectToDB();
        case 2:
          client = _context2.sent;
          return _context2.abrupt("return", client.db(process.env.MONGO_DBNAME || 'shoeDb'));
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function database() {
    return _ref2.apply(this, arguments);
  };
}();
app.get('/api/products', /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var db, products;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return database();
        case 2:
          db = _context3.sent;
          _context3.next = 5;
          return db.collection('products').find({}).toArray();
        case 5:
          products = _context3.sent;
          res.status(200).json(products);
        case 7:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}());
app.get('/api/users/:userId/cart', validateToken, /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var userId, db, user, products, cartItemIds, cartItems;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          userId = req.params.userId;
          _context4.next = 3;
          return database();
        case 3:
          db = _context4.sent;
          _context4.next = 6;
          return db.collection('users').findOne({
            id: userId
          });
        case 6:
          user = _context4.sent;
          if (user) {
            _context4.next = 9;
            break;
          }
          return _context4.abrupt("return", res.status(404).json("Could not find user!"));
        case 9:
          _context4.next = 11;
          return db.collection('products').find({}).toArray();
        case 11:
          products = _context4.sent;
          cartItemIds = user.cartItems;
          cartItems = cartItemIds.map(function (id) {
            return products.find(function (product) {
              return product.id === id;
            });
          });
          res.status(200).json(cartItems);
        case 15:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}());
app.get('/api/products/:productId', /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var productId, db, product;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          productId = req.params.productId;
          _context5.next = 3;
          return database();
        case 3:
          db = _context5.sent;
          _context5.next = 6;
          return db.collection('products').findOne({
            id: productId
          });
        case 6:
          product = _context5.sent;
          if (product) {
            res.status(200).json(product);
          } else {
            res.status(404).json('Could not find the product!');
          }
        case 8:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}());
app.post('/api/users/:userId/cart', validateToken, /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var userId, productId, db, user, products, cartItemIds, cartItems;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          userId = req.params.userId;
          productId = req.body.productId;
          _context6.next = 4;
          return database();
        case 4:
          db = _context6.sent;
          _context6.next = 7;
          return db.collection('users').updateOne({
            id: userId
          }, {
            $addToSet: {
              cartItems: productId
            }
          });
        case 7:
          _context6.next = 9;
          return db.collection('users').findOne({
            id: userId
          });
        case 9:
          user = _context6.sent;
          _context6.next = 12;
          return db.collection('products').find({}).toArray();
        case 12:
          products = _context6.sent;
          cartItemIds = user.cartItems;
          cartItems = cartItemIds.map(function (id) {
            return products.find(function (product) {
              return product.id === id;
            });
          });
          res.status(200).json(cartItems);
        case 16:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function (_x7, _x8) {
    return _ref6.apply(this, arguments);
  };
}());
app["delete"]('/api/users/:userId/cart/:productId', validateToken, /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var _req$params, userId, productId, db, user, products, cartItemIds, cartItems;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _req$params = req.params, userId = _req$params.userId, productId = _req$params.productId;
          _context7.next = 3;
          return database();
        case 3:
          db = _context7.sent;
          _context7.next = 6;
          return db.collection('users').updateOne({
            id: userId
          }, {
            $pull: {
              cartItems: productId
            }
          });
        case 6:
          _context7.next = 8;
          return db.collection('users').findOne({
            id: userId
          });
        case 8:
          user = _context7.sent;
          _context7.next = 11;
          return db.collection('products').find({}).toArray();
        case 11:
          products = _context7.sent;
          cartItemIds = user.cartItems;
          cartItems = cartItemIds.map(function (id) {
            return products.find(function (product) {
              return product.id === id;
            });
          });
          res.status(200).json(cartItems);
        case 15:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function (_x9, _x10) {
    return _ref7.apply(this, arguments);
  };
}());
app.post('/api/users/register', /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var _req$body, email, password, randomDigit, message, db, userAVL, userCheck;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          randomDigit = function randomDigit() {
            return Math.floor(Math.random() * 10000 + 1);
          };
          message = '';
          if (!(email == null || password == null)) {
            _context8.next = 8;
            break;
          }
          message = "All fields are mandatory";
          res.status(400).send(message);
          _context8.next = 25;
          break;
        case 8:
          _context8.next = 10;
          return database();
        case 10:
          db = _context8.sent;
          _context8.next = 13;
          return db.collection('users').findOne({
            mail: email
          });
        case 13:
          userAVL = _context8.sent;
          if (!userAVL) {
            _context8.next = 19;
            break;
          }
          message = "User is already registered";
          res.status(202).send(message);
          _context8.next = 25;
          break;
        case 19:
          _context8.next = 21;
          return db.collection('users').insertOne({
            "id": String(randomDigit()),
            "mail": email,
            "pass": password,
            "cartItems": []
          });
        case 21:
          _context8.next = 23;
          return db.collection('users').findOne({
            mail: email
          });
        case 23:
          userCheck = _context8.sent;
          if (userCheck) {
            message = "User has been registered";
            res.status(200).send(message);
          }
        case 25:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function (_x11, _x12) {
    return _ref8.apply(this, arguments);
  };
}());
app.post('/api/users/login', /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var _req$body2, email, password, message, db, user, token;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          message = '';
          if (!(email == null || password == null)) {
            _context9.next = 7;
            break;
          }
          message = "All fields are mandatory";
          res.status(400).send(message);
          _context9.next = 14;
          break;
        case 7:
          _context9.next = 9;
          return database();
        case 9:
          db = _context9.sent;
          _context9.next = 12;
          return db.collection('users').findOne({
            mail: email
          });
        case 12:
          user = _context9.sent;
          if (user.mail === email && user.pass === password) {
            message = "Logged in Successfully";
            token = _jsonwebtoken["default"].sign({
              id: user.id,
              mail: email,
              msg: message
            }, process.env.ACCESS_TOKEN_SECRET, {
              expiresIn: '1d'
            });
            res.status(202).send(token);
          } else if (user.pass !== password) {
            res.status(401).send("Provided Password is wrong, Please provide correct Password");
          } else {
            message = "User not found, kindly register first in order to login";
            res.status(404).send(message);
          }
        case 14:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function (_x13, _x14) {
    return _ref9.apply(this, arguments);
  };
}());
app.get('/api/users/logout', /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var token;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          token = (req.headers.Authorization || req.headers.authorization).split(' ')[1];
          BLACKLIST.add(token);
          res.status(202).send("Logged out successfully");
          setTimeout(function () {
            BLACKLIST["delete"](token);
          }, 1000 * 60 * 60 * 24);
        case 4:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function (_x15, _x16) {
    return _ref10.apply(this, arguments);
  };
}());
app.get('*', function (req, res) {
  res.sendFile(_path["default"].join(__dirname, '../dist/index.html'));
});
app.listen(port, function () {
  console.log("Server is listening on port ".concat(port));
});