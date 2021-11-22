"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditUserPage = void 0;
const tslib_1 = require("tslib");
const EditUserForm_1 = require("@components/EditUserForm/EditUserForm");
const Footer_1 = require("@components/Footer/Footer");
const Header_1 = require("@components/Header/Header");
const Container_1 = require("@ui/Container/Container");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const EditUserPage = () => (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(Header_1.Header, { isInteractive: true }),
    react_1.default.createElement(Container_1.Container, null,
        react_1.default.createElement(EditUserForm_1.EditUserForm, null)),
    react_1.default.createElement(Footer_1.Footer, null)));
exports.EditUserPage = EditUserPage;
