"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditGroupPage = void 0;
const tslib_1 = require("tslib");
const EditGroupForm_1 = require("@components/EditGroupForm/EditGroupForm");
const Footer_1 = require("@components/Footer/Footer");
const Header_1 = require("@components/Header/Header");
const useSubcatalogue_1 = require("@hooks/useSubcatalogue");
const user_1 = require("@store/slices/user");
const Container_1 = require("@ui/Container/Container");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_redux_1 = require("react-redux");
const EditGroupPage = () => {
    const { attemptToSetCurrentGroup } = (0, useSubcatalogue_1.useSubcatalogue)();
    const { groups, currentGroup, loading } = (0, react_redux_1.useSelector)((state) => state.catalogue);
    if (!currentGroup && groups.length) {
        attemptToSetCurrentGroup();
    }
    if (loading === user_1.LoadingStatus.Ongoing) {
        return react_1.default.createElement("h1", null, "Loading...");
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Header_1.Header, { isInteractive: true }),
        react_1.default.createElement(Container_1.Container, null,
            react_1.default.createElement(EditGroupForm_1.EditGroupForm, null)),
        react_1.default.createElement(Footer_1.Footer, null)));
};
exports.EditGroupPage = EditGroupPage;
