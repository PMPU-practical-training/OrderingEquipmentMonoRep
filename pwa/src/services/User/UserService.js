"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tslib_1 = require("tslib");
const Service_1 = require("@services/Service");
class UserService extends Service_1.Service {
    getUser(token) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.get({ url: 'user', token });
        });
    }
    getOne(id, token) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.get({ url: `user/${id}`, token });
        });
    }
    update(id, user, token) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.put({ url: `user/${id}`, body: user, isJSON: true, token });
        });
    }
    create(user, token) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.post({ url: 'user', body: user, isJSON: true, token });
        });
    }
}
exports.UserService = UserService;
