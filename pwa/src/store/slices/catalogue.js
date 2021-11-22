"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catalogueSlice = void 0;
const user_1 = require("./user");
const toolkit_1 = require("@reduxjs/toolkit");
const catalogue_1 = require("@store/thunks/catalogue");
const initialState = {
    loading: user_1.LoadingStatus.Initial,
    groups: [],
    currentGroup: null,
    currentCategory: null,
    currentSubcategory: null,
    error: '',
};
exports.catalogueSlice = (0, toolkit_1.createSlice)({
    name: 'catalogue',
    initialState,
    reducers: {
        setGroups: (state, action) => {
            state.groups = action.payload;
        },
        setCurrentGroup: (state, action) => {
            state.currentGroup = action.payload;
        },
        setCurrentCategory: (state, action) => {
            state.currentCategory = action.payload;
        },
        setCurrentSubcategory: (state, action) => {
            state.currentSubcategory = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(catalogue_1.getCatalogue.pending, state => {
            state.loading = user_1.LoadingStatus.Ongoing;
        });
        builder.addCase(catalogue_1.getCatalogue.fulfilled, (state, action) => {
            state.groups = action.payload;
            state.loading = user_1.LoadingStatus.Complete;
        });
        builder.addCase(catalogue_1.getCatalogue.rejected, (state, action) => { });
    },
});
