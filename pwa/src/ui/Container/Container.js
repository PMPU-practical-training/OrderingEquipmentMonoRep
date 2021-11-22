"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const Container_scss_1 = (0, tslib_1.__importDefault)(require("./Container.scss"));
const Container = (props) => {
    const { children } = props;
    return react_1.default.createElement("div", { className: Container_scss_1.default.Container }, children);
};
exports.Container = Container;
