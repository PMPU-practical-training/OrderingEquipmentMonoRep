"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = void 0;
const tslib_1 = require("tslib");
const React = (0, tslib_1.__importStar)(require("react"));
const react_router_dom_1 = require("react-router-dom");
const classnames_1 = (0, tslib_1.__importDefault)(require("classnames"));
const Link_scss_1 = (0, tslib_1.__importDefault)(require("./Link.scss"));
const Link = props => {
    const { name, href, onClick, className: classNameFromProps, style } = props;
    const handleClick = (e) => {
        e.preventDefault();
        if (onClick) {
            onClick(e);
        }
    };
    const className = (0, classnames_1.default)(Link_scss_1.default.link, Link_scss_1.default.link_theme_blackRed, Link_scss_1.default.link__text_l, Link_scss_1.default.link_m, classNameFromProps);
    return !href ? (React.createElement("a", { style: style, className: className, type: "link", onClick: handleClick }, name)) : (React.createElement(react_router_dom_1.Link, { style: style, type: "link", to: href, onClick: onClick, className: className }, name));
};
exports.Link = Link;
