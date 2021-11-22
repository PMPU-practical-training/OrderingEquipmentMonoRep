"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const tslib_1 = require("tslib");
const Service_1 = require("@services/Service");
class OrderService extends Service_1.Service {
    createOrder(order, token) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.post({ url: 'order', token, isJSON: true, body: order });
        });
    }
    getDocument(orderId, token) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            window.location.href = `localhost:3000/order/${orderId}/document`;
        });
    }
    getUserOrders(userId, token) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const response = yield this.get({ url: `order?user=${userId}`, token });
            return response;
        });
    }
    getOrdersByStatus(status, token) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const response = yield this.get({ url: `order?status=${status}`, token });
            return response;
        });
    }
    getOrders(token) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const response = yield this.get({ url: `order`, token });
            return response;
        });
    }
}
exports.OrderService = OrderService;
