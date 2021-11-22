"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_redux_1 = require("react-redux");
const Specification_1 = require("shared/entities/Specification");
const Product_scss_1 = (0, tslib_1.__importDefault)(require("./Product.scss"));
const Link_1 = require("@ui/Link/Link");
const Input_1 = require("@ui/Input/Input");
const Button_1 = (0, tslib_1.__importStar)(require("@ui/Button/Button"));
const cart_1 = require("@store/slices/cart");
const Product = props => {
    const { product } = props;
    const { name, price } = product;
    const { currentCategory, currentSubcategory } = (0, react_redux_1.useSelector)((state) => state.catalogue);
    const dispatch = (0, react_redux_1.useDispatch)();
    const [amount, setAmount] = react_1.default.useState(1);
    const addToCart = () => {
        dispatch(cart_1.cartSlice.actions.addToCart({ product, quantity: amount }));
    };
    return (react_1.default.createElement("div", { className: Product_scss_1.default.Container },
        react_1.default.createElement("div", { className: Product_scss_1.default.Top },
            react_1.default.createElement(Link_1.Link, { href: `/category/${currentCategory === null || currentCategory === void 0 ? void 0 : currentCategory.id}/subcategory/${currentSubcategory === null || currentSubcategory === void 0 ? void 0 : currentSubcategory.id}/product/${product.id}`, name: name, className: Product_scss_1.default.Title }),
            react_1.default.createElement("p", { className: Product_scss_1.default.Price },
                price.rangeValue.value * amount,
                " ",
                price.rangeValue.unit)),
        react_1.default.createElement("div", { className: Product_scss_1.default.Body },
            react_1.default.createElement("div", { className: Product_scss_1.default.Specifications }, product.specifications.map(specification => {
                switch (specification.type) {
                    case Specification_1.SpecificationType.Radio:
                        return (react_1.default.createElement("p", { key: specification.id, className: Product_scss_1.default.Specification },
                            specification.name,
                            ": ",
                            specification.value.value));
                    case Specification_1.SpecificationType.Range:
                        return (react_1.default.createElement("p", { key: specification.id, className: Product_scss_1.default.Specification },
                            specification.name,
                            ": ",
                            specification.rangeValue.value,
                            " ",
                            specification.rangeValue.unit));
                    case Specification_1.SpecificationType.Select:
                        return (react_1.default.createElement("p", { key: specification.id, className: Product_scss_1.default.Specification },
                            specification.name,
                            ": ",
                            specification.values.map(value => value.value).join(', ')));
                    default:
                        return null;
                }
            })),
            react_1.default.createElement("div", { className: Product_scss_1.default.Actions },
                react_1.default.createElement(Input_1.Input, { className: Product_scss_1.default.AmountInput, type: "number", name: "amount", min: 1, value: amount.toString(), onChange: (e) => {
                        if (e.target.value && parseInt(e.target.value)) {
                            setAmount(parseInt(e.target.value));
                        }
                        else {
                            setAmount(1);
                        }
                    } }),
                react_1.default.createElement(Button_1.default, { theme: Button_1.ButtonTheme.Dark, onClick: () => addToCart(), name: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443" })))));
};
exports.Product = Product;
