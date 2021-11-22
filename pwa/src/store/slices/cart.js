"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    cart: [],
};
exports.cartSlice = (0, toolkit_1.createSlice)({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cart = [...state.cart, action.payload];
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(cartItem => cartItem.product.id !== action.payload);
        },
        editQuantity: (state, action) => {
            const cartItemToUpdate = state.cart.find(cartItem => cartItem.product.id === action.payload.productId);
            if (cartItemToUpdate) {
                cartItemToUpdate.quantity = action.payload.quantity;
                state.cart = [
                    ...state.cart.filter(cartItem => cartItem.product.id !== action.payload.productId),
                    cartItemToUpdate,
                ];
            }
        },
    },
});
