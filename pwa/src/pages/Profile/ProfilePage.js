"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilePage = void 0;
const tslib_1 = require("tslib");
const EditorOrderList_1 = require("@components/EditorOrderList/EditorOrderList");
const Footer_1 = require("@components/Footer/Footer");
const Header_1 = require("@components/Header/Header");
const UserData_1 = require("@components/UserData/UserData");
const UserOrderTable_1 = require("@components/UserOrderTable/UserOrderTable");
const user_1 = require("@store/slices/user");
const Container_1 = require("@ui/Container/Container");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_redux_1 = require("react-redux");
const User_1 = require("shared/entities/User");
const ProfilePage = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const { role } = (0, react_redux_1.useSelector)((state) => state.user.data);
    const loading = (0, react_redux_1.useSelector)((state) => state.user.loading);
    const renderProfileComponent = () => {
        if (role && loading === user_1.LoadingStatus.Complete) {
            switch (role) {
                case User_1.UserRole.Admin:
                case User_1.UserRole.Editor:
                    return react_1.default.createElement(EditorOrderList_1.EditorOrderList, null);
                case User_1.UserRole.Expert:
                case User_1.UserRole.Purchaser:
                    return react_1.default.createElement(UserOrderTable_1.UserOrderTable, null);
                default:
                    return null;
            }
        }
        else {
            return null;
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Header_1.Header, { isInteractive: true }),
        react_1.default.createElement(Container_1.Container, null,
            react_1.default.createElement(UserData_1.UserData, null),
            renderProfileComponent()),
        react_1.default.createElement(Footer_1.Footer, null)));
};
exports.ProfilePage = ProfilePage;
