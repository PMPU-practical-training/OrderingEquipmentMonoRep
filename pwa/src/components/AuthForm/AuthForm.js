"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthForm = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const Input_1 = require("@ui/Input/Input");
const Button_1 = (0, tslib_1.__importStar)(require("@ui/Button/Button"));
const react_redux_1 = require("react-redux");
const user_1 = require("@store/slices/user");
const user_2 = require("@store/thunks/user");
const react_router_dom_1 = require("react-router-dom");
const AuthForm_scss_1 = (0, tslib_1.__importDefault)(require("./AuthForm.scss"));
const validationSchemas_1 = require("@utils/validationSchemas");
const AuthForm = () => {
    const [username, setUsername] = react_1.default.useState('');
    const [userError, setUserError] = react_1.default.useState('');
    const [password, setPassword] = react_1.default.useState('');
    const [passwordError, setPasswordError] = react_1.default.useState('');
    const user = (0, react_redux_1.useSelector)((state) => state.user);
    const { loading, authStatus: { isAuthenticated }, } = user;
    const dispatch = (0, react_redux_1.useDispatch)();
    const handleSubmit = (e) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            yield validationSchemas_1.usernameValidationSchema.validate(username);
        }
        catch (err) {
            setUserError(err.errors.join(''));
            return;
        }
        try {
            yield validationSchemas_1.passwordValidationSchema.validate(password);
        }
        catch (err) {
            setPasswordError(err.errors.join(''));
            return;
        }
        dispatch((0, user_2.authenticateUser)({ username, password }));
    });
    if (isAuthenticated) {
        return react_1.default.createElement(react_router_dom_1.Redirect, { to: "/" });
    }
    return (react_1.default.createElement("div", { className: AuthForm_scss_1.default.Container },
        react_1.default.createElement("div", { className: AuthForm_scss_1.default.Warning }, "\u0421\u0435\u0440\u0432\u0438\u0441 \u043F\u0440\u0435\u0434\u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D \u0434\u043B\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u0438 \u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0437\u0430\u044F\u0432\u043A\u0438 \u043D\u0430 \u0437\u0430\u043A\u0443\u043F\u043A\u0443. \u0414\u043B\u044F \u0432\u0445\u043E\u0434\u0430 \u043D\u0430 \u0441\u0430\u0439\u0442 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0435\u0434\u0438\u043D\u0443\u044E \u0443\u0447\u0435\u0442\u043D\u0443\u044E \u0437\u0430\u043F\u0438\u0441\u044C \u0432\u0438\u0434\u0430 stXXXXXX, \u0433\u0434\u0435 X - \u0446\u0438\u0444\u0440\u0430 \u043E\u0442 0 \u0434\u043E 9."),
        react_1.default.createElement("form", { className: AuthForm_scss_1.default.Form },
            react_1.default.createElement("h2", { className: AuthForm_scss_1.default.Form__title }, "\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F"),
            react_1.default.createElement("div", { className: AuthForm_scss_1.default.Form__inputContainer },
                react_1.default.createElement("label", { htmlFor: "username", className: AuthForm_scss_1.default.Form__inputLabel }, "\u0418\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F"),
                react_1.default.createElement(Input_1.Input, { theme: Input_1.InputTheme.Light, type: "text", name: "username", disabled: loading === user_1.LoadingStatus.Ongoing, placeholder: "st000000", className: AuthForm_scss_1.default.Form__input, error: userError, value: username, onChange: e => setUsername(e.target.value), onFocus: () => setUserError('') })),
            react_1.default.createElement("div", { className: AuthForm_scss_1.default.Form__inputContainer },
                react_1.default.createElement("label", { htmlFor: "password", className: AuthForm_scss_1.default.Form__inputLabel }, "\u041F\u0430\u0440\u043E\u043B\u044C"),
                react_1.default.createElement(Input_1.Input, { theme: Input_1.InputTheme.Light, type: "password", name: "password", disabled: loading === user_1.LoadingStatus.Ongoing, placeholder: "", className: AuthForm_scss_1.default.Form__input, error: passwordError, value: password, onChange: e => setPassword(e.target.value), onFocus: () => setPasswordError('') })),
            react_1.default.createElement(Button_1.default, { onClick: handleSubmit, name: "\u0412\u043E\u0439\u0442\u0438", className: AuthForm_scss_1.default.Form__submitButton, theme: Button_1.ButtonTheme.Dark }))));
};
exports.AuthForm = AuthForm;
