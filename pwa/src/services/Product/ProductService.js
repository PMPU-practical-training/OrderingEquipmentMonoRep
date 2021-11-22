"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const tslib_1 = require("tslib");
const Service_1 = require("@services/Service");
class ProductService extends Service_1.Service {
    getOne(id, token) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.get({ url: `product/${id}`, token });
        });
    }
    getAll(token) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.get({ url: `product`, token });
        });
    }
    update(id, body, token) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.put({ url: `product/${id}`, body, isJSON: true, token });
        });
    }
}
exports.ProductService = ProductService;
