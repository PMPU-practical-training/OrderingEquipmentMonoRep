"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = (0, tslib_1.__importStar)(require("react"));
const List_scss_1 = (0, tslib_1.__importDefault)(require("./List.scss"));
const List = (props) => {
    const options = props.options;
    return (React.createElement("div", null,
        React.createElement("select", { className: List_scss_1.default.list + " " + List_scss_1.default.list__text + " " + List_scss_1.default.list_theme, required: true }, options.map(u => React.createElement("option", null, u.optionName)))));
};
exports.default = List;
