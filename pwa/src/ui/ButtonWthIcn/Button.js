"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonThemeIcn = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const classnames_1 = (0, tslib_1.__importDefault)(require("classnames"));
const Icon_1 = require("@ui/Icon/Icon");
const ButtonWthIcn_scss_1 = (0, tslib_1.__importDefault)(require("./ButtonWthIcn.scss"));
var ButtonThemeIcn;
(function (ButtonThemeIcn) {
    ButtonThemeIcn["Grey"] = "grey";
    ButtonThemeIcn["Bordo"] = "bordo";
    ButtonThemeIcn["White"] = "white";
})(ButtonThemeIcn = exports.ButtonThemeIcn || (exports.ButtonThemeIcn = {}));
const ButtonWthIcon = (props) => {
    const { className, name, icon, theme, onClick, style, type } = props;
    const handleClick = (e) => {
        if (onClick) {
            onClick(e);
        }
    };
    return (react_1.default.createElement("button", { className: (0, classnames_1.default)(ButtonWthIcn_scss_1.default.button, className, {
            [ButtonWthIcn_scss_1.default.button_grey]: theme === ButtonThemeIcn.Grey,
            [ButtonWthIcn_scss_1.default.button_bordo]: theme === ButtonThemeIcn.Bordo,
            [ButtonWthIcn_scss_1.default.button_white]: theme === ButtonThemeIcn.White,
        }), style: style, type: type, onClick: handleClick },
        react_1.default.createElement(Icon_1.Icon, { className: name ? ButtonWthIcn_scss_1.default.button__icon_withText : ButtonWthIcn_scss_1.default.button__icon, width: 20, height: 20, icon: icon }),
        name && react_1.default.createElement("span", { className: ButtonWthIcn_scss_1.default.button__text }, name)));
};
exports.default = ButtonWthIcon;
