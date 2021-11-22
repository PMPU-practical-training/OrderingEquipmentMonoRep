"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = void 0;
const tslib_1 = require("tslib");
const toolkit_1 = require("@reduxjs/toolkit");
const CategoryService_1 = require("@services/Category/CategoryService");
const Service_1 = require("@services/Service");
const user_1 = require("@store/slices/user");
const categoryService = new CategoryService_1.CategoryService();
exports.getProducts = (0, toolkit_1.createAsyncThunk)('category/products/get', (payload, { getState, dispatch, rejectWithValue }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { categoryId, subcategoryId, params } = payload;
    const { user, catalogue } = getState();
    const { jwt } = user.authStatus;
    if (!catalogue.currentGroup) {
        return rejectWithValue('Не выбрана активная группа');
    }
    const { id: groupId } = catalogue.currentGroup;
    const response = yield categoryService.getProducts({
        groupId,
        parentId: categoryId,
        categoryId: subcategoryId,
    }, jwt, params);
    if (response instanceof Service_1.SuccessResponse) {
        return response.data;
    }
    if (response instanceof Service_1.ErrorResponse) {
        switch (response.status) {
            case Service_1.ResponseStatus.Unauthorized:
                dispatch(user_1.userSlice.actions.expireSession('Ошибка аутентификации - необходимо войти заново.'));
                break;
            default:
                return rejectWithValue(response.status);
        }
        return rejectWithValue(response.status);
    }
}));
