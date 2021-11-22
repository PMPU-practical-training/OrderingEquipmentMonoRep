"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const logo_png_1 = (0, tslib_1.__importDefault)(require("@assets/images/logo.png"));
const Title_scss_1 = (0, tslib_1.__importDefault)(require("./Title.scss"));
const Title = () => (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement("div", { className: Title_scss_1.default.container },
        react_1.default.createElement("img", { className: Title_scss_1.default.logo, src: logo_png_1.default, alt: '' }),
        react_1.default.createElement("div", { className: Title_scss_1.default.text }, "\u0423\u0421\u0418\u0422-\u0424\u0417\u0417"))));
exports.default = Title;
