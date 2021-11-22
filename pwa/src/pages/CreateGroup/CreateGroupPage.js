"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGroupPage = void 0;
const tslib_1 = require("tslib");
const CreateGroupForm_1 = require("@components/CreateGroupForm/CreateGroupForm");
const Footer_1 = require("@components/Footer/Footer");
const Header_1 = require("@components/Header/Header");
const Container_1 = require("@ui/Container/Container");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const CreateGroupPage = () => (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(Header_1.Header, { isInteractive: true }),
    react_1.default.createElement(Container_1.Container, null,
        react_1.default.createElement(CreateGroupForm_1.CreateGroupForm, null)),
    react_1.default.createElement(Footer_1.Footer, null)));
exports.CreateGroupPage = CreateGroupPage;
