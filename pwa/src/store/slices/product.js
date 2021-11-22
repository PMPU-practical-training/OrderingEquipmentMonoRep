"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const product_1 = require("@store/thunks/product");
const user_1 = require("./user");
const initialState = {
    product: null,
    products: [],
    loading: user_1.LoadingStatus.Initial,
};
exports.productSlice = (0, toolkit_1.createSlice)({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(product_1.getProduct.pending, state => {
            state.loading = user_1.LoadingStatus.Ongoing;
        });
        builder.addCase(product_1.getProduct.fulfilled, (state, action) => {
            state.product = action.payload;
            state.loading = user_1.LoadingStatus.Complete;
        });
        builder.addCase(product_1.getAllProducts.pending, state => {
            state.loading = user_1.LoadingStatus.Ongoing;
        });
        builder.addCase(product_1.getAllProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.loading = user_1.LoadingStatus.Complete;
        });
    },
});
