"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const Link_1 = require("@ui/Link/Link");
const react_router_dom_1 = require("react-router-dom");
const Category_scss_1 = (0, tslib_1.__importDefault)(require("./Category.scss"));
const Category_1 = require("shared/entities/Category");
const Category = props => {
    const history = (0, react_router_dom_1.useHistory)();
    return (react_1.default.createElement("div", { className: `${Category_scss_1.default.Category} ${props.type === Category_1.CategoryType.Parent ? Category_scss_1.default.isTopLevel : ''}` },
        react_1.default.createElement(Link_1.Link, { name: props.name, onClick: () => props.type === Category_1.CategoryType.Parent
                ? history.push(`/category/${props.id}`)
                : history.push(`/category/${props.parentId}/subcategory/${props.id}`), className: `${Category_scss_1.default.Category__name} ${props.type === Category_1.CategoryType.Parent ? Category_scss_1.default.isTopLevel : ''}` }),
        props.type === Category_1.CategoryType.Parent &&
            props.subcategories.map((item, index) => react_1.default.createElement(exports.Category, Object.assign({ key: item.name + index, parentId: props.id }, item)))));
};
exports.Category = Category;
