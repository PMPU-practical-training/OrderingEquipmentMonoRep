"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditSubcategoryPage = void 0;
const tslib_1 = require("tslib");
const EditSubcategoryForm_1 = require("@components/EditSubcategoryForm/EditSubcategoryForm");
const Footer_1 = require("@components/Footer/Footer");
const Header_1 = require("@components/Header/Header");
const Container_1 = require("@ui/Container/Container");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const EditSubcategoryPage = () => {
    const { currentGroup, currentCategory } = (0, react_redux_1.useSelector)((state) => state.catalogue);
    const { groupId, categoryId, subcategoryId } = (0, react_router_dom_1.useParams)();
    if (!currentGroup || !currentCategory) {
        if (groupId && categoryId) {
            return react_1.default.createElement(react_router_dom_1.Redirect, { to: `/category/${categoryId}/subcategory/${subcategoryId}` });
        }
        return react_1.default.createElement(react_router_dom_1.Redirect, { to: "/" });
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Header_1.Header, { isInteractive: true }),
        react_1.default.createElement(Container_1.Container, null,
            react_1.default.createElement(EditSubcategoryForm_1.EditSubcategoryForm, null)),
        react_1.default.createElement(Footer_1.Footer, null)));
};
exports.EditSubcategoryPage = EditSubcategoryPage;
