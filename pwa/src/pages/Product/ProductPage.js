"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductPage = void 0;
const tslib_1 = require("tslib");
const Breadcrumbs_1 = require("@components/Breadcrumbs/Breadcrumbs");
const Footer_1 = require("@components/Footer/Footer");
const Header_1 = require("@components/Header/Header");
const user_1 = require("@store/slices/user");
const product_1 = require("@store/thunks/product");
const Button_1 = (0, tslib_1.__importStar)(require("@ui/Button/Button"));
const Container_1 = require("@ui/Container/Container");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const Input_1 = require("@ui/Input/Input");
const cart_1 = require("@store/slices/cart");
const breadcrumbs_1 = require("@store/slices/breadcrumbs");
const ProductPage_scss_1 = (0, tslib_1.__importDefault)(require("./ProductPage.scss"));
const Specification_1 = require("shared/entities/Specification");
const catalogue_1 = require("@store/slices/catalogue");
const catalogue_2 = require("@store/thunks/catalogue");
const Specification = props => {
    const { specification } = props;
    const getSpecificationValue = () => {
        switch (specification.type) {
            case Specification_1.SpecificationType.Radio:
                return `${specification.value.value}`;
            case Specification_1.SpecificationType.Range:
                return `${specification.rangeValue.value} ${specification.rangeValue.unit}`;
            case Specification_1.SpecificationType.Select:
                return `${specification.values.map(value => value.value).join(', ')}`;
            default:
                return '';
        }
    };
    return (react_1.default.createElement("div", { key: specification.id, className: ProductPage_scss_1.default.Specifications__row },
        react_1.default.createElement("h6", { className: ProductPage_scss_1.default.Specifications__key },
            specification.name,
            ":"),
        react_1.default.createElement("p", { className: ProductPage_scss_1.default.Specifications__value }, getSpecificationValue())));
};
const ProductPage = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const history = (0, react_router_dom_1.useHistory)();
    const { product, loading } = (0, react_redux_1.useSelector)((state) => state.product);
    const { role } = (0, react_redux_1.useSelector)((state) => state.user.data);
    const { groups, currentGroup, currentCategory, currentSubcategory, loading: loadingCatalogue } = (0, react_redux_1.useSelector)((state) => state.catalogue);
    const { productId, categoryId, subcategoryId } = (0, react_router_dom_1.useParams)();
    const [amount, setAmount] = react_1.default.useState(1);
    react_1.default.useEffect(() => {
        if (!groups.length && loadingCatalogue === user_1.LoadingStatus.Initial) {
            dispatch((0, catalogue_2.getCatalogue)());
        }
        if (!currentGroup && groups.length) {
            const groupContainingCategory = groups.find(group => group.categories.find(category => category.id === categoryId));
            if (groupContainingCategory) {
                dispatch(catalogue_1.catalogueSlice.actions.setCurrentGroup(groupContainingCategory));
            }
            else {
                history.push('/');
            }
        }
        if (currentGroup && !currentCategory) {
            const categoryContainingSubcategory = currentGroup.categories.find(category => category.id === categoryId);
            if (categoryContainingSubcategory) {
                dispatch(catalogue_1.catalogueSlice.actions.setCurrentCategory(categoryContainingSubcategory));
            }
            else {
                history.push('/');
            }
        }
        if (currentGroup && currentCategory) {
            const currentSubcategory = currentCategory.subcategories.find(subcategory => subcategory.id === subcategoryId);
            if (currentSubcategory) {
                dispatch(catalogue_1.catalogueSlice.actions.setCurrentSubcategory(currentSubcategory));
            }
            else {
                history.push('/');
            }
        }
    }, [groups, currentGroup, currentCategory]);
    react_1.default.useEffect(() => {
        dispatch((0, product_1.getProduct)(productId));
    }, []);
    react_1.default.useEffect(() => {
        if (product) {
            dispatch(breadcrumbs_1.breadcrumbsSlice.actions.setBreadcrumbs([
                {
                    name: product.breadcrumbs[2].name,
                    href: `/category/${breadcrumbs[1].id}/subcategory/${breadcrumbs[2].id}`,
                },
                { name: product.name, href: `/product/${product.id}` },
            ]));
        }
    }, [product]);
    if (!product) {
        return null;
    }
    if (!product && loading === user_1.LoadingStatus.Complete) {
        return react_1.default.createElement(react_router_dom_1.Redirect, { to: "/" });
    }
    const addToCart = () => {
        dispatch(cart_1.cartSlice.actions.addToCart({ product, quantity: amount }));
    };
    const { breadcrumbs, name, specifications, price, isVerified } = product;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Header_1.Header, { isInteractive: true }),
        react_1.default.createElement(Container_1.Container, null,
            react_1.default.createElement("div", { className: ProductPage_scss_1.default.Meta },
                react_1.default.createElement(Breadcrumbs_1.Breadcrumbs, null),
                react_1.default.createElement(Button_1.default, { onClick: () => {
                        if (currentCategory && currentSubcategory) {
                            history.push(`/category/${currentCategory.id}/subcategory/${currentSubcategory.id}/product/${product.id}/edit`);
                        }
                    }, theme: Button_1.ButtonTheme.Light, name: "\u041F\u0440\u0430\u0432\u0438\u0442\u044C" })),
            react_1.default.createElement("section", { className: ProductPage_scss_1.default.Sections },
                react_1.default.createElement("div", { className: ProductPage_scss_1.default.LeftSection },
                    react_1.default.createElement("h1", { className: ProductPage_scss_1.default.Title }, name),
                    react_1.default.createElement("h2", { className: ProductPage_scss_1.default.Specifications__title }, "\u0422\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0445\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A\u0438"),
                    react_1.default.createElement("div", { className: ProductPage_scss_1.default.Specifications__table }, specifications.map(specification => (react_1.default.createElement(Specification, { specification: specification }))))),
                react_1.default.createElement("div", { className: ProductPage_scss_1.default.RightSection },
                    react_1.default.createElement("div", { className: ProductPage_scss_1.default.RightSection__row },
                        react_1.default.createElement("h6", { className: ProductPage_scss_1.default.RightSection__row_key },
                            product.price.name,
                            ":"),
                        react_1.default.createElement("p", { className: ProductPage_scss_1.default.RightSection__row_value },
                            product.price.rangeValue.value * amount,
                            " ",
                            product.price.rangeValue.unit)),
                    react_1.default.createElement("div", { className: ProductPage_scss_1.default.RightSection__row },
                        react_1.default.createElement("h6", { className: ProductPage_scss_1.default.RightSection__row_key }, "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E:"),
                        react_1.default.createElement("div", { className: ProductPage_scss_1.default.RightSection__row_value },
                            react_1.default.createElement(Input_1.Input, { className: ProductPage_scss_1.default.Amount, type: "number", name: "amount", min: 1, value: amount.toString(), onChange: (e) => {
                                    if (e.target.value && parseInt(e.target.value)) {
                                        setAmount(parseInt(e.target.value));
                                    }
                                    else {
                                        setAmount(1);
                                    }
                                } }))),
                    react_1.default.createElement(Button_1.default, { onClick: addToCart, theme: Button_1.ButtonTheme.Dark, name: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443" })))),
        react_1.default.createElement(Footer_1.Footer, null)));
};
exports.ProductPage = ProductPage;
