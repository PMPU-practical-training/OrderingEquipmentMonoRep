"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const user_1 = require("@store/slices/user");
const breadcrumbs_1 = require("./slices/breadcrumbs");
const cart_1 = require("./slices/cart");
const catalogue_1 = require("./slices/catalogue");
const category_1 = require("./slices/category");
const order_1 = require("./slices/order");
const product_1 = require("./slices/product");
const search_1 = require("./slices/search");
const rootReducer = (0, toolkit_1.combineReducers)({
    user: user_1.userSlice.reducer,
    cart: cart_1.cartSlice.reducer,
    catalogue: catalogue_1.catalogueSlice.reducer,
    category: category_1.categorySlice.reducer,
    product: product_1.productSlice.reducer,
    search: search_1.searchSlice.reducer,
    breadcrumbs: breadcrumbs_1.breadcrumbsSlice.reducer,
    order: order_1.orderSlice.reducer,
});
exports.store = (0, toolkit_1.configureStore)({
    reducer: rootReducer,
});
