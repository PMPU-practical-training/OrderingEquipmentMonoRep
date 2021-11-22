"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditCategoryPage = void 0;
const tslib_1 = require("tslib");
const EditCategoryForm_1 = require("@components/EditCategoryForm/EditCategoryForm");
const Footer_1 = require("@components/Footer/Footer");
const Header_1 = require("@components/Header/Header");
const useSubcatalogue_1 = require("@hooks/useSubcatalogue");
const Container_1 = require("@ui/Container/Container");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const EditCategoryPage = () => {
    const { attemptToSetCurrentGroup } = (0, useSubcatalogue_1.useSubcatalogue)();
    const { groups, currentCategory } = (0, react_redux_1.useSelector)((state) => state.catalogue);
    const { categoryId } = (0, react_router_dom_1.useParams)();
    if (!categoryId) {
        return react_1.default.createElement(react_router_dom_1.Redirect, { to: "/" });
    }
    if (!currentCategory) {
        return react_1.default.createElement(react_router_dom_1.Redirect, { to: `/category/${categoryId}` });
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Header_1.Header, { isInteractive: true }),
        react_1.default.createElement(Container_1.Container, null,
            react_1.default.createElement(EditCategoryForm_1.EditCategoryForm, null)),
        react_1.default.createElement(Footer_1.Footer, null)));
};
exports.EditCategoryPage = EditCategoryPage;
