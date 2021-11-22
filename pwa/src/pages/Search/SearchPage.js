"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchPage = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const Container_1 = require("@ui/Container/Container");
const Header_1 = require("@components/Header/Header");
const Footer_1 = require("@components/Footer/Footer");
const CategoryPage_scss_1 = (0, tslib_1.__importDefault)(require("../Category/CategoryPage.scss"));
const Product_1 = require("@components/Product/Product");
const search_1 = require("@store/thunks/search");
const user_1 = require("@store/slices/user");
const SearchPage = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const { products, loading } = (0, react_redux_1.useSelector)((state) => state.search);
    const history = (0, react_router_dom_1.useHistory)();
    const { query: searchQuery } = (0, react_router_dom_1.useParams)();
    react_1.default.useEffect(() => {
        if (searchQuery) {
            dispatch((0, search_1.searchByName)(decodeURIComponent(searchQuery)));
        }
        else {
            history.push('/');
        }
    }, [searchQuery]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Header_1.Header, { isInteractive: true }),
        react_1.default.createElement(Container_1.Container, null,
            react_1.default.createElement("div", { className: CategoryPage_scss_1.default.Main },
                react_1.default.createElement("div", { className: CategoryPage_scss_1.default.Products__container },
                    loading === user_1.LoadingStatus.Ongoing && react_1.default.createElement("h1", null, "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..."),
                    loading === user_1.LoadingStatus.Complete && products.length ? (products.map(product => react_1.default.createElement(Product_1.Product, { product: product }))) : (react_1.default.createElement("h1", null, "\u0422\u043E\u0432\u0430\u0440\u043E\u0432 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E"))))),
        react_1.default.createElement(Footer_1.Footer, null)));
};
exports.SearchPage = SearchPage;
