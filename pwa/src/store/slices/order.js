"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const order_1 = require("@store/thunks/order");
const user_1 = require("./user");
const initialState = {
    orders: [],
    loading: user_1.LoadingStatus.Initial,
};
exports.orderSlice = (0, toolkit_1.createSlice)({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(order_1.getUserOrders.pending, (state, _) => {
            state.loading = user_1.LoadingStatus.Ongoing;
        });
        builder.addCase(order_1.getUserOrders.fulfilled, (state, action) => {
            state.orders = action.payload;
            state.loading = user_1.LoadingStatus.Complete;
        });
        builder.addCase(order_1.getEditorOrders.pending, (state, _) => {
            state.loading = user_1.LoadingStatus.Ongoing;
        });
        builder.addCase(order_1.getEditorOrders.fulfilled, (state, action) => {
            state.orders = action.payload;
            state.loading = user_1.LoadingStatus.Complete;
        });
    },
});
