"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.createProduct = exports.getAllProducts = exports.getProduct = void 0;
const tslib_1 = require("tslib");
const toolkit_1 = require("@reduxjs/toolkit");
const CatalogueService_1 = require("@services/Catalogue/CatalogueService");
const ProductService_1 = require("@services/Product/ProductService");
const Service_1 = require("@services/Service");
const user_1 = require("@store/slices/user");
const catalogueService = new CatalogueService_1.CatalogueService();
const productService = new ProductService_1.ProductService();
exports.getProduct = (0, toolkit_1.createAsyncThunk)('product/get', (id, { getState }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { jwt } = getState().user.authStatus;
    const response = yield productService.getOne(id, jwt);
    if (response instanceof Service_1.SuccessResponse) {
        return response.data;
    }
}));
exports.getAllProducts = (0, toolkit_1.createAsyncThunk)('product/getMany', (_, { getState }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { jwt } = getState().user.authStatus;
    const response = yield productService.getAll(jwt);
    if (response instanceof Service_1.SuccessResponse) {
        return response.data;
    }
}));
exports.createProduct = (0, toolkit_1.createAsyncThunk)('product/create', (payload, { getState, dispatch, rejectWithValue }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { groupId, categoryId, subcategoryId, body } = payload;
    const { jwt } = getState().user.authStatus;
    const response = yield catalogueService.createProduct(groupId, categoryId, subcategoryId, body, jwt);
    if (response instanceof Service_1.SuccessResponse) {
        alert('Позиция успешно создана!');
        window.location.href = `/category/${categoryId}/subcategory/${subcategoryId}`;
    }
    if (response instanceof Service_1.ErrorResponse) {
        switch (response.status) {
            case Service_1.ResponseStatus.Unauthorized:
                dispatch(user_1.userSlice.actions.expireSession({}));
                break;
            default:
                return rejectWithValue('Произошла неизвестная ошибка. Пожалуйста, перезагрузите страницу.');
        }
    }
}));
exports.updateProduct = (0, toolkit_1.createAsyncThunk)('product/update', (payload, { getState, dispatch, rejectWithValue }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { categoryId, subcategoryId, productId, body } = payload;
    const { jwt } = getState().user.authStatus;
    const response = yield productService.update(productId, body, jwt);
    if (response instanceof Service_1.SuccessResponse) {
        alert('Позиция успешно обновлена!');
        window.location.href = `/category/${categoryId}/subcategory/${subcategoryId}`;
    }
    if (response instanceof Service_1.ErrorResponse) {
        switch (response.status) {
            case Service_1.ResponseStatus.Unauthorized:
                dispatch(user_1.userSlice.actions.expireSession({}));
                break;
            default:
                return rejectWithValue('Произошла неизвестная ошибка. Пожалуйста, перезагрузите страницу.');
        }
    }
}));
