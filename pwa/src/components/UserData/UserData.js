"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserData = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_redux_1 = require("react-redux");
const User_1 = require("shared/entities/User");
const UserData_scss_1 = (0, tslib_1.__importDefault)(require("./UserData.scss"));
const UserData = () => {
    const { name, role } = (0, react_redux_1.useSelector)((state) => state.user.data);
    if (!name && !role) {
        return null;
    }
    const renderRole = () => {
        switch (role) {
            case User_1.UserRole.Admin:
                return 'Администратор';
            case User_1.UserRole.Editor:
                return 'Редактор';
            case User_1.UserRole.Expert:
                return 'Эксперт';
            case User_1.UserRole.Purchaser:
                return 'Покупатель';
            default:
                return '';
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h1", { className: UserData_scss_1.default.Username }, name),
        react_1.default.createElement("h4", { className: UserData_scss_1.default.Role__label },
            "\u0423\u0440\u043E\u0432\u0435\u043D\u044C \u0434\u043E\u0441\u0442\u0443\u043F\u0430: ",
            react_1.default.createElement("span", { className: UserData_scss_1.default.Role }, renderRole()))));
};
exports.UserData = UserData;
