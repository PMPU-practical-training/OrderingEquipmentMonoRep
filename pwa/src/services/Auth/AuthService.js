"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tslib_1 = require("tslib");
const Service_1 = require("@services/Service");
class AuthService extends Service_1.Service {
    authenticate(username, password) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const body = {
                username,
                password,
            };
            return this.post({ url: 'auth', body, isJSON: true });
        });
    }
    verifyToken(token) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.get({ url: 'user', token });
        });
    }
}
exports.AuthService = AuthService;
