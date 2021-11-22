"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditUserForm = void 0;
const tslib_1 = require("tslib");
const user_1 = require("@store/thunks/user");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_redux_1 = require("react-redux");
const Form_scss_1 = (0, tslib_1.__importDefault)(require("@ui/Form/Form.scss"));
const Input_1 = require("@ui/Input/Input");
const Button_1 = (0, tslib_1.__importStar)(require("@ui/Button/Button"));
const validationSchemas_1 = require("@utils/validationSchemas");
const UserService_1 = require("@services/User/UserService");
const react_router_dom_1 = require("react-router-dom");
const Service_1 = require("@services/Service");
const User_1 = require("shared/entities/User");
const userService = new UserService_1.UserService();
const EditUserForm = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const { jwt } = (0, react_redux_1.useSelector)((state) => state.user.authStatus);
    const { userId } = (0, react_router_dom_1.useParams)();
    const [loading, setIsLoading] = react_1.default.useState(false);
    const [username, setUsername] = react_1.default.useState('');
    const [usernameError, setUsernameError] = react_1.default.useState('');
    const [name, setName] = react_1.default.useState('');
    const [nameError, setNameError] = react_1.default.useState('');
    const [password, setPassword] = react_1.default.useState('');
    const [passwordError, setPasswordError] = react_1.default.useState('');
    const [role, setRole] = react_1.default.useState(User_1.UserRole.Purchaser);
    react_1.default.useEffect(() => {
        const getUser = () => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
            if (userId) {
                setIsLoading(true);
                const response = yield userService.getOne(userId, jwt);
                if (response instanceof Service_1.SuccessResponse) {
                    const { username, name, role } = response.data;
                    setUsername(username);
                    setName(name);
                    setRole(role);
                    setIsLoading(false);
                }
                if (response instanceof Service_1.ErrorResponse) {
                    alert(response.error);
                }
            }
        });
        getUser();
    }, []);
    const handleSubmit = (e) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            yield validationSchemas_1.usernameValidationSchema.validate(name);
        }
        catch (err) {
            setNameError(err.errors.join(''));
            return;
        }
        try {
            yield validationSchemas_1.usernameValidationSchema.validate(username);
        }
        catch (err) {
            setUsernameError(err.errors.join(''));
            return;
        }
        if (password.length) {
            try {
                yield validationSchemas_1.passwordValidationSchema.validate(password);
            }
            catch (err) {
                setPasswordError(err.errors.join(''));
                return;
            }
        }
        let user = { name, username, role };
        if (password.length) {
            user = Object.assign(Object.assign({}, user), { password });
        }
        dispatch((0, user_1.updateUser)({ id: userId, user }));
    });
    return (react_1.default.createElement("form", { className: Form_scss_1.default.Container, onSubmit: handleSubmit },
        react_1.default.createElement("h1", { className: Form_scss_1.default.Title }, "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F"),
        react_1.default.createElement("div", { className: Form_scss_1.default.Item },
            react_1.default.createElement("label", { className: Form_scss_1.default.Item__label }, "\u0418\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F: "),
            react_1.default.createElement(Input_1.Input, { name: "name", type: "text", error: nameError, onFocus: () => setNameError(''), onChange: (e) => setName(e.target.value), value: name })),
        react_1.default.createElement("div", { className: Form_scss_1.default.Item },
            react_1.default.createElement("label", { className: Form_scss_1.default.Item__label }, "\u041B\u043E\u0433\u0438\u043D \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F: "),
            react_1.default.createElement(Input_1.Input, { name: "username", type: "text", error: usernameError, onFocus: () => setUsernameError(''), onChange: (e) => setUsername(e.target.value), value: username })),
        react_1.default.createElement("div", { className: Form_scss_1.default.Item },
            react_1.default.createElement("label", { className: Form_scss_1.default.Item__label }, "\u041F\u0430\u0440\u043E\u043B\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F "),
            react_1.default.createElement(Input_1.Input, { name: "password", type: "text", placeholder: "\u041C\u043E\u0436\u043D\u043E \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C", error: passwordError, onFocus: () => setPasswordError(''), onChange: (e) => setPassword(e.target.value), value: password })),
        react_1.default.createElement("div", { className: Form_scss_1.default.Item },
            react_1.default.createElement("label", { className: Form_scss_1.default.Item__label }, "\u0420\u043E\u043B\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F: "),
            react_1.default.createElement("select", { name: "name", value: role, onChange: (e) => setRole(e.target.value) },
                react_1.default.createElement("option", { value: User_1.UserRole.Purchaser }, "\u041F\u043E\u043A\u0443\u043F\u0430\u0442\u0435\u043B\u044C"),
                react_1.default.createElement("option", { value: User_1.UserRole.Editor }, "\u0420\u0435\u0434\u0430\u043A\u0442\u043E\u0440"),
                react_1.default.createElement("option", { value: User_1.UserRole.Expert }, "\u042D\u043A\u0441\u043F\u0435\u0440\u0442"),
                react_1.default.createElement("option", { value: User_1.UserRole.Admin }, "\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440"))),
        react_1.default.createElement(Button_1.default, { className: Form_scss_1.default.Submit, name: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C", type: "submit", theme: Button_1.ButtonTheme.Dark })));
};
exports.EditUserForm = EditUserForm;
