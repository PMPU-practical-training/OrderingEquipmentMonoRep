"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = (0, tslib_1.__importStar)(require("react"));
const classnames_1 = (0, tslib_1.__importDefault)(require("classnames"));
const InputRange_scss_1 = (0, tslib_1.__importDefault)(require("./InputRange.scss"));
const InputRange = props => {
    const { text, name, placeholder, type, value, className } = props, rest = (0, tslib_1.__rest)(props, ["text", "name", "placeholder", "type", "value", "className"]);
    return (React.createElement("div", { className: (0, classnames_1.default)(InputRange_scss_1.default.input, InputRange_scss_1.default.input_s, InputRange_scss_1.default.input_theme, className) },
        React.createElement("div", { className: InputRange_scss_1.default.input__text }, text),
        React.createElement("input", Object.assign({ value: value, type: type, className: InputRange_scss_1.default.input__num + ' ' + InputRange_scss_1.default.input__num_s, name: name, placeholder: placeholder }, rest))));
};
exports.default = InputRange;
