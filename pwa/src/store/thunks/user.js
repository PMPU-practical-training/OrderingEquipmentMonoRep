"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.updateUser = exports.createUser = exports.authenticateUser = void 0;
const tslib_1 = require("tslib");
const toolkit_1 = require("@reduxjs/toolkit");
const AuthService_1 = require("@services/Auth/AuthService");
const Service_1 = require("@services/Service");
const UserService_1 = require("@services/User/UserService");
const user_1 = require("@store/slices/user");
const authService = new AuthService_1.AuthService();
const userService = new UserService_1.UserService();
exports.authenticateUser = (0, toolkit_1.createAsyncThunk)('user/authenticate', (credentials, { dispatch, rejectWithValue }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { username, password } = credentials;
    const response = yield authService.authenticate(username, password);
    if (response instanceof Service_1.SuccessResponse) {
        const token = yield response.data;
        localStorage.setItem('token', token);
        dispatch(user_1.userSlice.actions.setToken(token));
        return dispatch((0, exports.verifyToken)());
    }
    if (response instanceof Service_1.ErrorResponse) {
        return rejectWithValue('Неверный юзернейм или пароль.');
    }
    return rejectWithValue('Произошла критическая ошибка. Пожалуйста, перезагрузите страницу.');
}));
exports.createUser = (0, toolkit_1.createAsyncThunk)('user/create', (user, { getState, rejectWithValue }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { jwt } = getState().user.authStatus;
    const response = yield userService.create(user, jwt);
    if (response instanceof Service_1.SuccessResponse) {
        alert('Пользователь успешно создан!');
        window.location.href = '/user';
        return;
    }
    if (response instanceof Service_1.ErrorResponse) {
        return rejectWithValue(response.error);
    }
}));
exports.updateUser = (0, toolkit_1.createAsyncThunk)('user/update', (payload, { getState, rejectWithValue }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { jwt } = getState().user.authStatus;
    const response = yield userService.update(payload.id, payload.user, jwt);
    if (response instanceof Service_1.SuccessResponse) {
        alert('Пользователь успешно обновлен!');
        window.location.href = '/user';
        return;
    }
    if (response instanceof Service_1.ErrorResponse) {
        return rejectWithValue(response.error);
    }
}));
exports.verifyToken = (0, toolkit_1.createAsyncThunk)('user/verifyToken', (_, { getState, rejectWithValue }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { jwt } = getState().user.authStatus;
    const response = yield userService.getUser(jwt);
    if (response instanceof Service_1.SuccessResponse) {
        const user = yield response.data;
        if (!user) {
            return rejectWithValue('Произошла критическая ошибка. Пожалуйста, перезагрузите страницу.');
        }
        return user;
    }
    if (response instanceof Service_1.ErrorResponse) {
        return rejectWithValue('Период аутентификации истек. Необходимо войти заново.');
    }
}));
