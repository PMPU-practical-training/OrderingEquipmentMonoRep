"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEditorOrders = exports.getUserOrders = exports.getDocument = exports.createOrder = void 0;
const tslib_1 = require("tslib");
const OrderService_1 = require("@services/Order/OrderService");
const toolkit_1 = require("@reduxjs/toolkit");
const Service_1 = require("@services/Service");
const orderService = new OrderService_1.OrderService();
exports.createOrder = (0, toolkit_1.createAsyncThunk)('order/create', (order, { getState, dispatch }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { jwt } = getState().user.authStatus;
    const response = yield orderService.createOrder(order, jwt);
    if (response instanceof Service_1.SuccessResponse) {
        dispatch((0, exports.getDocument)(response.data.id));
        return response.data;
    }
}));
exports.getDocument = (0, toolkit_1.createAsyncThunk)('order/getDocument', (orderId, { getState }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { jwt } = getState().user.authStatus;
    const response = yield orderService.getDocument(orderId, jwt);
}));
exports.getUserOrders = (0, toolkit_1.createAsyncThunk)('order/getUserOrder', (_, { getState }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { _id } = getState().user.data;
    const { jwt } = getState().user.authStatus;
    const response = yield orderService.getUserOrders(_id, jwt);
    if (response instanceof Service_1.SuccessResponse) {
        return response.data;
    }
}));
exports.getEditorOrders = (0, toolkit_1.createAsyncThunk)('order/getOrdersByStatus', (_, { getState }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { jwt } = getState().user.authStatus;
    const response = yield orderService.getOrders(jwt);
    if (response instanceof Service_1.SuccessResponse) {
        console.log(response.data);
        return response.data;
    }
}));
