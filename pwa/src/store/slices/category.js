"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const category_1 = require("@store/thunks/category");
const user_1 = require("./user");
const initialState = {
    category: null,
    products: [],
    totalCount: 0,
    page: 0,
    inPage: 10,
    filters: {
        price: null,
        specifications: [],
    },
    loading: user_1.LoadingStatus.Initial,
    error: '',
};
exports.categorySlice = (0, toolkit_1.createSlice)({
    name: 'category',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setInPage: (state, action) => {
            state.inPage = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(category_1.getProducts.pending, (state, _) => {
            state.loading = user_1.LoadingStatus.Ongoing;
        });
        builder.addCase(category_1.getProducts.fulfilled, (state, action) => {
            const { products, totalCount } = action.payload;
            state.products = products;
            state.totalCount = totalCount;
        });
        builder.addCase(category_1.getProducts.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = user_1.LoadingStatus.Complete;
        });
    },
});
