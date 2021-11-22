"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_dom_1 = (0, tslib_1.__importDefault)(require("react-dom"));
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const index_1 = require("@store/index");
const App_1 = require("./App");
require("@scss/index.scss");
react_dom_1.default.render(react_1.default.createElement(react_redux_1.Provider, { store: index_1.store },
    react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
        react_1.default.createElement(App_1.App, null))), document.getElementById('app'));
