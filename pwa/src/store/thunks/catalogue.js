"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubcategory = exports.updateSubcategory = exports.createSubcategory = exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.deleteGroup = exports.updateGroup = exports.createGroup = exports.getCatalogue = void 0;
const tslib_1 = require("tslib");
const toolkit_1 = require("@reduxjs/toolkit");
const CatalogueService_1 = require("@services/Catalogue/CatalogueService");
const Service_1 = require("@services/Service");
const user_1 = require("@store/slices/user");
const catalogueService = new CatalogueService_1.CatalogueService();
exports.getCatalogue = (0, toolkit_1.createAsyncThunk)('catalogue/get', (_, { getState, dispatch, rejectWithValue }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { jwt } = getState().user.authStatus;
    const response = yield catalogueService.getCatalogue(jwt);
    if (response instanceof Service_1.SuccessResponse) {
        return response.data.groups;
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
    return rejectWithValue('Произошла неизвестная ошибка. Пожалуйста, перезагрузите страницу.');
}));
exports.createGroup = (0, toolkit_1.createAsyncThunk)('catalogue/group/create', (name, { getState, dispatch, rejectWithValue }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { jwt } = getState().user.authStatus;
    const response = yield catalogueService.createGroup(name, jwt);
    if (response instanceof Service_1.SuccessResponse) {
        alert('Группа успешно создана!');
        window.location.href = '/';
        return;
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
exports.updateGroup = (0, toolkit_1.createAsyncThunk)('catalgoue/group/edit', (payload, { getState, dispatch, rejectWithValue }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { jwt } = getState().user.authStatus;
    const response = yield catalogueService.updateGroup(payload.id, payload.name, jwt);
    if (response instanceof Service_1.SuccessResponse) {
        alert('Группа успешно изменена!');
        window.location.href = '/';
        return;
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
exports.deleteGroup = (0, toolkit_1.createAsyncThunk)('catalogue/group/delete', (id, { getState, dispatch, rejectWithValue }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { jwt } = getState().user.authStatus;
    const response = yield catalogueService.deleteGroup(id, jwt);
    if (response instanceof Service_1.SuccessResponse) {
        alert('Группа успешно удалена!');
        window.location.href = '/';
        return;
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
exports.createCategory = (0, toolkit_1.createAsyncThunk)('catalogue/category/create', (payload, { getState, dispatch, rejectWithValue }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { jwt } = getState().user.authStatus;
    const response = yield catalogueService.createCategory(payload.groupId, payload.name, jwt);
    if (response instanceof Service_1.SuccessResponse) {
        alert('Категория успешно создана!');
        window.location.href = '/';
        return;
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
exports.updateCategory = (0, toolkit_1.createAsyncThunk)('catalogue/category/update', (payload, { getState, dispatch, rejectWithValue }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { jwt } = getState().user.authStatus;
    const response = yield catalogueService.updateCategory(payload.id, payload.name, jwt);
    if (response instanceof Service_1.SuccessResponse) {
        alert('Катгория успешно изменена!');
        window.location.href = '/';
        return;
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
exports.deleteCategory = (0, toolkit_1.createAsyncThunk)('catalogue/category/delete', (id, { getState, dispatch, rejectWithValue }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { jwt } = getState().user.authStatus;
    const response = yield catalogueService.deleteCategory(id, jwt);
    if (response instanceof Service_1.SuccessResponse) {
        alert('Категория успешно удалена!');
        window.location.href = '/';
        return;
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
exports.createSubcategory = (0, toolkit_1.createAsyncThunk)('catalogue/subcategory/create', (payload, { getState, dispatch, rejectWithValue }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { jwt } = getState().user.authStatus;
    const response = yield catalogueService.createSubcategory(payload.groupId, payload.categoryId, payload.data, jwt);
    if (response instanceof Service_1.SuccessResponse) {
        alert('Подкатегория успешно создана!');
        window.location.href = '/';
        return;
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
exports.updateSubcategory = (0, toolkit_1.createAsyncThunk)('catalogue/subcategory/update', (payload, { getState, dispatch, rejectWithValue }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { jwt } = getState().user.authStatus;
    const response = yield catalogueService.updateSubcategory(payload.id, payload.data, jwt);
    if (response instanceof Service_1.SuccessResponse) {
        alert('Подкатегория успешно изменена!');
        window.location.href = '/';
        return;
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
exports.deleteSubcategory = (0, toolkit_1.createAsyncThunk)('catalogue/subcategory/delete', (id, { getState, dispatch, rejectWithValue }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { jwt } = getState().user.authStatus;
    const response = yield catalogueService.deleteCategory(id, jwt);
    if (response instanceof Service_1.SuccessResponse) {
        alert('Подкатегория успешно удалена!');
        window.location.href = '/';
        return;
    }
    if (response instanceof Service_1.ErrorResponse) {
        switch (response.status) {
            case Service_1.ResponseStatus.Unauthorized:
                dispatch(user_1.userSlice.actions.expireSession({}));
                break;
            default:
                alert('Произошла неизвестная ошибка. Пожалуйста, перезагругите страницу.');
                return rejectWithValue('Произошла неизвестная ошибка. Пожалуйста, перезагрузите страницу.');
        }
    }
}));
