"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Breadcrumbs = void 0;
const tslib_1 = require("tslib");
const Link_1 = require("@ui/Link/Link");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_redux_1 = require("react-redux");
const Breadcrumbs_scss_1 = (0, tslib_1.__importDefault)(require("./Breadcrumbs.scss"));
const Breadcrumb = props => (react_1.default.createElement("span", null,
    react_1.default.createElement(Link_1.Link, { className: Breadcrumbs_scss_1.default.Breadcrumb, href: props.href, name: props.name })));
const BreadcrumbSeparator = props => (react_1.default.createElement("span", { className: Breadcrumbs_scss_1.default.Separator }, props.separator));
const Breadcrumbs = ({ separator }) => {
    const { path } = (0, react_redux_1.useSelector)((state) => state.breadcrumbs);
    return (react_1.default.createElement("div", { className: Breadcrumbs_scss_1.default.Container }, path.map((pathItem, index) => (react_1.default.createElement(react_1.default.Fragment, { key: pathItem.name },
        react_1.default.createElement(Breadcrumb, Object.assign({}, pathItem)),
        index < path.length - 1 && react_1.default.createElement(BreadcrumbSeparator, { separator: separator ? separator : ' > ' }))))));
};
exports.Breadcrumbs = Breadcrumbs;
