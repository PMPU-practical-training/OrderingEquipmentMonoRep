"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Footer = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const Footer_scss_1 = (0, tslib_1.__importDefault)(require("./Footer.scss"));
const Footer = () => (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement("div", { className: Footer_scss_1.default.Container },
        react_1.default.createElement("a", { href: "https://it.spbu.ru/", className: Footer_scss_1.default.Container__text }, "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435-\u0441\u043B\u0443\u0436\u0431\u0430 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0445 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0439"),
        react_1.default.createElement("a", { href: "https://spbu.ru/", className: Footer_scss_1.default.Container__text },
            "\u0421\u0430\u043D\u043A\u0442-\u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433\u0441\u043A\u0438\u0439 \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u0443\u043D\u0438\u0432\u0435\u0440\u0441\u0438\u0442\u0435\u0442",
            react_1.default.createElement("span", null, ", 2020 ")))));
exports.Footer = Footer;
