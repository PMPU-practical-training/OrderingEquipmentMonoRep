"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = exports.InputTheme = void 0;
const tslib_1 = require("tslib");
const React = (0, tslib_1.__importStar)(require("react"));
const classnames_1 = (0, tslib_1.__importDefault)(require("classnames"));
const Input_scss_1 = (0, tslib_1.__importDefault)(require("./Input.scss"));
var InputTheme;
(function (InputTheme) {
    InputTheme["Light"] = "light";
    InputTheme["Dark"] = "dark";
})(InputTheme = exports.InputTheme || (exports.InputTheme = {}));
const Input = (props) => {
    const { placeholder, name, disabled, value, type, onChange, className, theme = InputTheme.Light, error } = props, rest = (0, tslib_1.__rest)(props, ["placeholder", "name", "disabled", "value", "type", "onChange", "className", "theme", "error"]);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: Input_scss_1.default.container },
            React.createElement("input", Object.assign({ disabled: disabled, name: name, type: type, value: value, onChange: onChange, className: (0, classnames_1.default)(className, Input_scss_1.default.input, {
                    [Input_scss_1.default.input_light]: theme === InputTheme.Light,
                    [Input_scss_1.default.input_dark]: theme === InputTheme.Dark,
                }), placeholder: placeholder }, rest)),
            error && React.createElement("p", { className: Input_scss_1.default.input__error }, error))));
};
exports.Input = Input;
