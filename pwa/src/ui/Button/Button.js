"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonTheme = void 0;
const tslib_1 = require("tslib");
const React = (0, tslib_1.__importStar)(require("react"));
const classnames_1 = (0, tslib_1.__importDefault)(require("classnames"));
const Button_scss_1 = (0, tslib_1.__importDefault)(require("./Button.scss"));
var ButtonTheme;
(function (ButtonTheme) {
    ButtonTheme["Light"] = "light";
    ButtonTheme["Dark"] = "dark";
    ButtonTheme["Bordo"] = "bordo";
})(ButtonTheme = exports.ButtonTheme || (exports.ButtonTheme = {}));
const Button = (props) => {
    const { className, name, theme, onClick, type } = props;
    return (React.createElement("button", { onClick: onClick, type: type, className: (0, classnames_1.default)(Button_scss_1.default.button, className, {
            [Button_scss_1.default.button_light]: theme === ButtonTheme.Light,
            [Button_scss_1.default.button_dark]: theme === ButtonTheme.Dark,
            [Button_scss_1.default.button_bordo]: theme === ButtonTheme.Bordo,
        }) }, name));
};
exports.default = Button;
