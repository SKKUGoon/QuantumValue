/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/middle-tier/app.ts":
/*!********************************!*\
  !*** ./src/middle-tier/app.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }
  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});
var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var http_errors_1 = __importDefault(__webpack_require__(/*! http-errors */ "http-errors"));
var path = __importStar(__webpack_require__(/*! path */ "path"));
var cookieParser = __importStar(__webpack_require__(/*! cookie-parser */ "cookie-parser"));
var logger = __importStar(__webpack_require__(/*! morgan */ "morgan"));
var express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
var https_1 = __importDefault(__webpack_require__(/*! https */ "https"));
var office_addin_dev_certs_1 = __webpack_require__(/*! office-addin-dev-certs */ "office-addin-dev-certs");
var msgraph_helper_1 = __webpack_require__(/*! ./msgraph-helper */ "./src/middle-tier/msgraph-helper.ts");
var ssoauth_helper_1 = __webpack_require__(/*! ./ssoauth-helper */ "./src/middle-tier/ssoauth-helper.ts");
/* global console, process, require, __dirname */
var app = (0, express_1.default)();
var port = process.env.API_PORT || "3000";
app.set("port", port);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
  extended: false
}));
app.use(cookieParser());
/* Turn off caching when developing */
if (true) {
  app.use(express_1.default.static(path.join(process.cwd(), "dist"), {
    etag: false
  }));
  app.use(function (req, res, next) {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    next();
  });
} else {}
var indexRouter = express_1.default.Router();
indexRouter.get("/", function (req, res) {
  res.render("/taskpane.html");
});
app.use("/", indexRouter);
// Middle-tier API calls
// listen for 'ping' to verify service is running
// Un comment for development debugging, but un needed for production deployment
// app.get("/ping", function (req: any, res: any) {
//   res.send(process.platform);
// });
//app.get("/getuserdata", validateJwt, getUserData);
app.get("/getuserdata", ssoauth_helper_1.validateJwt, msgraph_helper_1.getUserData);
// Get the client side task pane files requested
app.get("/taskpane.html", function (req, res) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [2 /*return*/, res.sendfile("taskpane.html")];
    });
  });
});
app.get("/fallbackauthdialog.html", function (req, res) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [2 /*return*/, res.sendfile("fallbackauthdialog.html")];
    });
  });
});
// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
(0, office_addin_dev_certs_1.getHttpsServerOptions)().then(function (options) {
  https_1.default.createServer(options, app).listen(port, function () {
    return console.log("Server running on ".concat(port, " in ").concat("development", " mode"));
  });
});
/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license in root of repo. -->
 *
 * This file is the main Node.js server file that defines the express middleware.
 */
if (true) {
  (__webpack_require__(/*! dotenv */ "dotenv").config)();
}

/***/ }),

/***/ "./src/middle-tier/msgraph-helper.ts":
/*!*******************************************!*\
  !*** ./src/middle-tier/msgraph-helper.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }
  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});
var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getGraphData = exports.getUserData = void 0;
// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license in the root of the repo.
/*
    This file provides the provides functionality to get Microsoft Graph data.
*/
var https = __importStar(__webpack_require__(/*! https */ "https"));
var ssoauth_helper_1 = __webpack_require__(/*! ./ssoauth-helper */ "./src/middle-tier/ssoauth-helper.ts");
var http_errors_1 = __importDefault(__webpack_require__(/*! http-errors */ "http-errors"));
/* global process */
var domain = "graph.microsoft.com";
var version = "v1.0";
function getUserData(req, res, next) {
  return __awaiter(this, void 0, void 0, function () {
    var authorization;
    var _this = this;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          authorization = req.get("Authorization");
          return [4 /*yield*/, (0, ssoauth_helper_1.getAccessToken)(authorization).then(function (graphTokenResponse) {
            return __awaiter(_this, void 0, void 0, function () {
              var graphToken, graphUrlSegment, graphQueryParamSegment, graphData;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    if (!(graphTokenResponse && (graphTokenResponse.claims || graphTokenResponse.error))) return [3 /*break*/, 1];
                    res.send(graphTokenResponse);
                    return [3 /*break*/, 3];
                  case 1:
                    graphToken = graphTokenResponse.access_token;
                    graphUrlSegment = process.env.GRAPH_URL_SEGMENT || "/me";
                    graphQueryParamSegment = process.env.QUERY_PARAM_SEGMENT || "";
                    return [4 /*yield*/, getGraphData(graphToken, graphUrlSegment, graphQueryParamSegment)];
                  case 2:
                    graphData = _a.sent();
                    // If Microsoft Graph returns an error, such as invalid or expired token,
                    // there will be a code property in the returned object set to a HTTP status (e.g. 401).
                    // Relay it to the client. It will caught in the fail callback of `makeGraphApiCall`.
                    if (graphData.code) {
                      next((0, http_errors_1.default)(graphData.code, "Microsoft Graph error " + JSON.stringify(graphData)));
                    } else {
                      res.send(graphData);
                    }
                    _a.label = 3;
                  case 3:
                    return [2 /*return*/];
                }
              });
            });
          }).catch(function (err) {
            res.status(401).send(err.message);
            return;
          })];
        case 1:
          _a.sent();
          return [2 /*return*/];
      }
    });
  });
}
exports.getUserData = getUserData;
function getGraphData(accessToken, apiUrl, queryParams) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [2 /*return*/, new Promise(function (resolve, reject) {
        var options = {
          host: domain,
          path: "/" + version + apiUrl + queryParams,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + accessToken,
            "Cache-Control": "private, no-cache, no-store, must-revalidate",
            Expires: "-1",
            Pragma: "no-cache"
          }
        };
        https.get(options, function (response) {
          var body = "";
          response.on("data", function (d) {
            body += d;
          });
          response.on("end", function () {
            // The response from the OData endpoint might be an error, say a
            // 401 if the endpoint requires an access token and it was invalid
            // or expired. But a message is not an error in the call of https.get,
            // so the "on('error', reject)" line below isn't triggered.
            // So, the code distinguishes success (200) messages from error
            // messages and sends a JSON object to the caller with either the
            // requested OData or error information.
            var error;
            if (response.statusCode === 200) {
              var parsedBody = JSON.parse(body);
              resolve(parsedBody);
            } else {
              error = new Error();
              error.code = response.statusCode;
              error.message = response.statusMessage;
              // The error body sometimes includes an empty space
              // before the first character, remove it or it causes an error.
              body = body.trim();
              error.bodyCode = JSON.parse(body).error.code;
              error.bodyMessage = JSON.parse(body).error.message;
              resolve(error);
            }
          });
        }).on("error", reject);
      })];
    });
  });
}
exports.getGraphData = getGraphData;

/***/ }),

/***/ "./src/middle-tier/ssoauth-helper.ts":
/*!*******************************************!*\
  !*** ./src/middle-tier/ssoauth-helper.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license in root of repo. -->
 *
 * This file defines the routes within the authRoute router.
 */
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.validateJwt = exports.getAccessToken = void 0;
var node_fetch_1 = __importDefault(__webpack_require__(/*! node-fetch */ "node-fetch"));
var form_urlencoded_1 = __importDefault(__webpack_require__(/*! form-urlencoded */ "form-urlencoded"));
var jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ "jsonwebtoken"));
var jwks_rsa_1 = __webpack_require__(/*! jwks-rsa */ "jwks-rsa");
/* global process, console */
var DISCOVERY_KEYS_ENDPOINT = "https://login.microsoftonline.com/common/discovery/v2.0/keys";
function getAccessToken(authorization) {
  return __awaiter(this, void 0, void 0, function () {
    var error, scopeName, _a, assertion, tokenScopes, accessAsUserScope, formParams, stsDomain, tenant, tokenURLSegment, encodedForm, tokenResponse, json;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          if (!!authorization) return [3 /*break*/, 1];
          error = new Error("No Authorization header was found.");
          return [2 /*return*/, Promise.reject(error)];
        case 1:
          scopeName = process.env.SCOPE || "User.Read";
          _a = authorization.split(" "), assertion = _a[1];
          tokenScopes = jsonwebtoken_1.default.decode(assertion).scp.split(" ");
          accessAsUserScope = tokenScopes.find(function (scope) {
            return scope === "access_as_user";
          });
          if (!accessAsUserScope) {
            throw new Error("Missing access_as_user");
          }
          formParams = {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
            assertion: assertion,
            requested_token_use: "on_behalf_of",
            scope: [scopeName].join(" ")
          };
          stsDomain = "https://login.microsoftonline.com";
          tenant = "common";
          tokenURLSegment = "oauth2/v2.0/token";
          encodedForm = (0, form_urlencoded_1.default)(formParams);
          return [4 /*yield*/, (0, node_fetch_1.default)("".concat(stsDomain, "/").concat(tenant, "/").concat(tokenURLSegment), {
            method: "POST",
            body: encodedForm,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })];
        case 2:
          tokenResponse = _b.sent();
          return [4 /*yield*/, tokenResponse.json()];
        case 3:
          json = _b.sent();
          return [2 /*return*/, json];
      }
    });
  });
}
exports.getAccessToken = getAccessToken;
function validateJwt(req, res, next) {
  var authHeader = req.headers.authorization;
  if (authHeader) {
    var token = authHeader.split(" ")[1];
    var validationOptions = {
      audience: process.env.CLIENT_ID
    };
    jsonwebtoken_1.default.verify(token, getSigningKeys, validationOptions, function (err) {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }
      next();
    });
  }
}
exports.validateJwt = validateJwt;
function getSigningKeys(header, callback) {
  var client = new jwks_rsa_1.JwksClient({
    jwksUri: DISCOVERY_KEYS_ENDPOINT
  });
  client.getSigningKey(header.kid, function (err, key) {
    callback(null, key.getPublicKey());
  });
}

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "form-urlencoded":
/*!**********************************!*\
  !*** external "form-urlencoded" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("form-urlencoded");

/***/ }),

/***/ "http-errors":
/*!******************************!*\
  !*** external "http-errors" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("http-errors");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "jwks-rsa":
/*!***************************!*\
  !*** external "jwks-rsa" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("jwks-rsa");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("morgan");

/***/ }),

/***/ "node-fetch":
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("node-fetch");

/***/ }),

/***/ "office-addin-dev-certs":
/*!*****************************************!*\
  !*** external "office-addin-dev-certs" ***!
  \*****************************************/
/***/ ((module) => {

module.exports = require("office-addin-dev-certs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/middle-tier/app.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=middletier.js.map