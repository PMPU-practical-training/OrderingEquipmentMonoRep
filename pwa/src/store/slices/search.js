"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const search_1 = require("@store/thunks/search");
const user_1 = require("./user");
const initialState = {
    products: [],
    loading: user_1.LoadingStatus.Initial,
};
exports.searchSlice = (0, toolkit_1.createSlice)({
    name: 'search',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(search_1.searchByName.pending, state => {
            state.loading = user_1.LoadingStatus.Ongoing;
        });
        builder.addCase(search_1.searchByName.fulfilled, (state, action) => {
            state.products = action.payload;
            state.loading = user_1.LoadingStatus.Complete;
        });
    },
});
