"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSubcategoryPage = void 0;
const tslib_1 = require("tslib");
const CreateSubcategoryForm_1 = require("@components/CreateSubcategoryForm/CreateSubcategoryForm");
const Footer_1 = require("@components/Footer/Footer");
const Header_1 = require("@components/Header/Header");
const Container_1 = require("@ui/Container/Container");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const CreateSubcategoryPage = () => (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(Header_1.Header, { isInteractive: true }),
    react_1.default.createElement(Container_1.Container, null,
        react_1.default.createElement(CreateSubcategoryForm_1.CreateSubcategoryForm, null)),
    react_1.default.createElement(Footer_1.Footer, null)));
exports.CreateSubcategoryPage = CreateSubcategoryPage;
