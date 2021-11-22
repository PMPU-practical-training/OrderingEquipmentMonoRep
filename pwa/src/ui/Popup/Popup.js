"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = (0, tslib_1.__importStar)(require("react"));
const Popup_scss_1 = (0, tslib_1.__importDefault)(require("./Popup.scss"));
const Popup = (props) => {
    return (React.createElement("div", { className: Popup_scss_1.default.popup + " " + Popup_scss_1.default.popup_theme }, "something"));
};
exports.default = Popup;
