"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
const tslib_1 = require("tslib");
const Find_1 = require("@components/Find/Find");
const icons_1 = require("@ui/Icon/icons");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Button_1 = (0, tslib_1.__importStar)(require("../../ui/Button/Button"));
const Button_2 = (0, tslib_1.__importStar)(require("../../ui/ButtonWthIcn/Button"));
const Title_1 = (0, tslib_1.__importDefault)(require("../../ui/Title/Title"));
const Header_scss_1 = (0, tslib_1.__importDefault)(require("./Header.scss"));
const Header = (props) => {
    const { isInteractive } = props;
    const history = (0, react_router_dom_1.useHistory)();
    return (react_1.default.createElement("div", { className: Header_scss_1.default.header__container },
        react_1.default.createElement("div", { className: Header_scss_1.default.Title },
            react_1.default.createElement(Title_1.default, null)),
        isInteractive && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Button_1.default, { onClick: () => history.push('/'), className: Header_scss_1.default.Button, name: "\u041A\u0430\u0442\u0430\u043B\u043E\u0433", theme: Button_1.ButtonTheme.Bordo }),
            react_1.default.createElement("div", { className: Header_scss_1.default.Find },
                react_1.default.createElement(Find_1.Find, null)),
            react_1.default.createElement(Button_2.default, { onClick: () => history.push('/cart'), className: Header_scss_1.default.Purchase + ' ' + Header_scss_1.default.Icon_size, theme: Button_2.ButtonThemeIcn.White, icon: icons_1.IconName.NewPurchase }),
            react_1.default.createElement(Button_2.default, { onClick: () => history.push('/user'), className: Header_scss_1.default.Account + ' ' + Header_scss_1.default.Icon_size, theme: Button_2.ButtonThemeIcn.White, icon: icons_1.IconName.Person })))));
};
exports.Header = Header;
