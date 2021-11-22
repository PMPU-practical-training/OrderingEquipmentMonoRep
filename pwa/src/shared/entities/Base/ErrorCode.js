"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = void 0;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["BadRequest"] = 400] = "BadRequest";
    ErrorCode[ErrorCode["Unauthorized"] = 401] = "Unauthorized";
    ErrorCode[ErrorCode["Forbidden"] = 403] = "Forbidden";
    ErrorCode[ErrorCode["NotFound"] = 404] = "NotFound";
    ErrorCode[ErrorCode["ServerError"] = 500] = "ServerError";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
