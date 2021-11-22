"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthPage = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const AuthForm_1 = require("@components/AuthForm/AuthForm");
const Header_1 = require("@components/Header/Header");
const Footer_1 = require("@components/Footer/Footer");
const Container_1 = require("@ui/Container/Container");
const AuthPage = () => (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(Header_1.Header, null),
    react_1.default.createElement(Container_1.Container, null,
        react_1.default.createElement(AuthForm_1.AuthForm, null)),
    react_1.default.createElement(Footer_1.Footer, null)));
exports.AuthPage = AuthPage;
