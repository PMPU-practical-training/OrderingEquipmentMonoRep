"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchByName = void 0;
const tslib_1 = require("tslib");
const toolkit_1 = require("@reduxjs/toolkit");
const SearchService_1 = require("@services/Search/SearchService");
const Service_1 = require("@services/Service");
const searchService = new SearchService_1.SearchService();
exports.searchByName = (0, toolkit_1.createAsyncThunk)('product/search', (name, { getState }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { jwt } = getState().user.authStatus;
    const response = yield searchService.searchByName(name, jwt);
    if (response instanceof Service_1.SuccessResponse) {
        return response.data;
    }
}));
