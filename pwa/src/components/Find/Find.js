"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Find = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const Find_scss_1 = (0, tslib_1.__importDefault)(require("./Find.scss"));
const Button_1 = (0, tslib_1.__importStar)(require("@ui/ButtonWthIcn/Button"));
const Input_1 = require("@ui/Input/Input");
const icons_1 = require("@ui/Icon/icons");
const react_router_dom_1 = require("react-router-dom");
const Find = () => {
    const [inputValue, setInputValue] = react_1.default.useState('');
    const history = (0, react_router_dom_1.useHistory)();
    const handleSubmit = (e) => {
        console.log('submit');
        if (inputValue) {
            history.push(`/search/${encodeURIComponent(inputValue)}`);
        }
        e.preventDefault();
    };
    return (react_1.default.createElement("form", { style: { display: 'flex' }, onSubmit: handleSubmit },
        react_1.default.createElement(Input_1.Input, { theme: Input_1.InputTheme.Dark, onChange: e => setInputValue(e.target.value), className: Find_scss_1.default.Find__input, placeholder: "\u041F\u043E\u0438\u0441\u043A", type: "text", name: "search" }),
        react_1.default.createElement(Button_1.default, { type: "submit", theme: Button_1.ButtonThemeIcn.Bordo, icon: icons_1.IconName.Search, name: "\u041D\u0430\u0439\u0442\u0438" })));
};
exports.Find = Find;
