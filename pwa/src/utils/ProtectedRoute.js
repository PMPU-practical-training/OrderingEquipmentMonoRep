"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtectedRoute = void 0;
const tslib_1 = require("tslib");
const React = (0, tslib_1.__importStar)(require("react"));
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const user_1 = require("@store/slices/user");
const mapStateToProps = (state) => {
    const { authStatus, data, loading } = state.user;
    return {
        data,
        authStatus,
        loading,
    };
};
const connector = (0, react_redux_1.connect)(mapStateToProps);
exports.ProtectedRoute = connector((props) => {
    const { authStatus, data: userData, allowedUserRoles, loading, redirectRoute } = props, rest = (0, tslib_1.__rest)(props, ["authStatus", "data", "allowedUserRoles", "loading", "redirectRoute"]);
    const { exact, path, component: Component } = rest;
    if (loading !== user_1.LoadingStatus.Complete) {
        return React.createElement("h1", null, "\u0417\u0430\u0433\u0440\u0437\u043A\u0430...");
    }
    const isAllowed = userData._id && allowedUserRoles.find(userRole => userRole === userData.role) && authStatus.isAuthenticated;
    return (React.createElement(react_router_dom_1.Route, { exact: exact, path: path, render: props => (isAllowed ? React.createElement(Component, Object.assign({}, props)) : React.createElement(react_router_dom_1.Redirect, { to: redirectRoute })) }));
});
