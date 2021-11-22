"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSlice = exports.LoadingStatus = void 0;
const user_1 = require("@store/thunks/user");
const toolkit_1 = require("@reduxjs/toolkit");
const User_1 = require("shared/entities/User");
var LoadingStatus;
(function (LoadingStatus) {
    LoadingStatus["Initial"] = "initial";
    LoadingStatus["Ongoing"] = "ongoing";
    LoadingStatus["Complete"] = "complete";
})(LoadingStatus = exports.LoadingStatus || (exports.LoadingStatus = {}));
const initialState = {
    loading: LoadingStatus.Initial,
    authStatus: {
        jwt: localStorage.getItem('token') || '',
        isAuthenticated: false,
        error: '',
    },
    data: {
        _id: '',
        orders: {},
        role: User_1.UserRole.Purchaser,
        username: '',
        name: '',
    },
};
exports.userSlice = (0, toolkit_1.createSlice)({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.authStatus.jwt = action.payload;
        },
        expireSession: (state, _) => {
            state.loading = initialState.loading;
            state.authStatus = {
                jwt: '',
                isAuthenticated: false,
                error: 'Период аутентификации истек. Пожалуйста, войдите заново.',
            };
            state.data = initialState.data;
        },
    },
    extraReducers: builder => {
        builder.addCase(user_1.authenticateUser.pending, (state, _) => {
            state.loading = LoadingStatus.Ongoing;
        });
        builder.addCase(user_1.authenticateUser.fulfilled, (state, action) => {
            state.authStatus = Object.assign(Object.assign({}, state.authStatus), { isAuthenticated: true, error: '' });
            state.loading = LoadingStatus.Complete;
        });
        builder.addCase(user_1.authenticateUser.rejected, (state, action) => {
            state.authStatus = {
                isAuthenticated: false,
                jwt: '',
                error: action.payload,
            };
            state.loading = LoadingStatus.Complete;
        });
        builder.addCase(user_1.verifyToken.pending, (state, _) => {
            state.loading = LoadingStatus.Ongoing;
            state.authStatus = Object.assign({}, state.authStatus);
        });
        builder.addCase(user_1.verifyToken.rejected, (state, action) => {
            state.authStatus = {
                error: action.payload,
                isAuthenticated: false,
                jwt: '',
            };
            state.loading = LoadingStatus.Complete;
        });
        builder.addCase(user_1.verifyToken.fulfilled, (state, action) => {
            state.data = action.payload;
            state.authStatus.isAuthenticated = true;
            state.loading = LoadingStatus.Complete;
        });
    },
});
