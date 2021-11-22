"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.breadcrumbsSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    path: [],
};
exports.breadcrumbsSlice = (0, toolkit_1.createSlice)({
    name: 'breadcrumbs',
    initialState,
    reducers: {
        setBreadcrumbs: (state, action) => {
            state.path = action.payload;
        },
    },
});
