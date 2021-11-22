"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const tslib_1 = require("tslib");
const cart_1 = require("@store/slices/cart");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const Input_1 = require("@ui/Input/Input");
const Button_1 = (0, tslib_1.__importStar)(require("@ui/Button/Button"));
const OrderMeta_1 = require("@components/OrderMeta/OrderMeta");
const Specification_1 = require("../../shared/entities/Specification");
const Cart_scss_1 = (0, tslib_1.__importDefault)(require("./Cart.scss"));
const Cart = () => {
    const { cart } = (0, react_redux_1.useSelector)((state) => state.cart);
    const [finalizeOrder, setFinalizeOrder] = react_1.default.useState(false);
    const dispatch = (0, react_redux_1.useDispatch)();
    if (!cart.length) {
        return react_1.default.createElement(react_router_dom_1.Redirect, { to: "/" });
    }
    if (finalizeOrder) {
        return react_1.default.createElement(OrderMeta_1.OrderMeta, null);
    }
    return (react_1.default.createElement("div", { className: Cart_scss_1.default.Container },
        react_1.default.createElement("h1", { className: Cart_scss_1.default.title }, "\u041A\u043E\u0440\u0437\u0438\u043D\u0430"),
        cart.map(cartItem => {
            const { product, quantity } = cartItem;
            return (react_1.default.createElement("div", { className: Cart_scss_1.default.Item },
                react_1.default.createElement("h3", { className: Cart_scss_1.default.Item__title }, product.name),
                react_1.default.createElement("div", { className: Cart_scss_1.default.Item__specs }, product.specifications.map(specification => {
                    switch (specification.type) {
                        case Specification_1.SpecificationType.Radio:
                            return (react_1.default.createElement("p", { key: specification.id, className: Cart_scss_1.default.Item__spec },
                                specification.name,
                                ": ",
                                specification.value.value));
                        case Specification_1.SpecificationType.Range:
                            return (react_1.default.createElement("p", { key: specification.id, className: Cart_scss_1.default.Item__spec },
                                specification.name,
                                ": ",
                                specification.rangeValue.value,
                                " ",
                                specification.rangeValue.unit));
                        case Specification_1.SpecificationType.Select:
                            return (react_1.default.createElement("p", { key: specification.id, className: Cart_scss_1.default.Item__spec },
                                specification.name,
                                ": ",
                                specification.values.map(value => value.value).join(', ')));
                        default:
                            return null;
                    }
                })),
                react_1.default.createElement("p", { className: Cart_scss_1.default.Item__price },
                    Math.round(product.price.rangeValue.value * quantity),
                    " ",
                    product.price.rangeValue.unit),
                react_1.default.createElement(Input_1.Input, { name: "quantity", value: quantity.toString(), type: "number", onChange: (e) => {
                        if (e.target.value && parseInt(e.target.value)) {
                            dispatch(cart_1.cartSlice.actions.editQuantity({
                                productId: product.id,
                                quantity: parseInt(e.target.value)
                            }));
                        }
                        else {
                            dispatch(cart_1.cartSlice.actions.editQuantity({ productId: product.id, quantity: 1 }));
                        }
                    } }),
                react_1.default.createElement("p", { className: Cart_scss_1.default.Item__pricePerItem },
                    product.price.rangeValue.value,
                    " ",
                    product.price.rangeValue.unit)));
        }),
        react_1.default.createElement(Button_1.default, { name: "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u044E", onClick: () => setFinalizeOrder(true), theme: Button_1.ButtonTheme.Dark })));
};
exports.Cart = Cart;
