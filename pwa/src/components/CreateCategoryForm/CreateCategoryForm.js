"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryForm = void 0;
const tslib_1 = require("tslib");
const validationSchemas_1 = require("@utils/validationSchemas");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_redux_1 = require("react-redux");
const Form_scss_1 = (0, tslib_1.__importDefault)(require("@ui/Form/Form.scss"));
const catalogue_1 = require("@store/thunks/catalogue");
const Input_1 = require("@ui/Input/Input");
const Button_1 = (0, tslib_1.__importStar)(require("@ui/Button/Button"));
const CreateCategoryForm = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const { currentGroup } = (0, react_redux_1.useSelector)((state) => state.catalogue);
    const [name, setName] = react_1.default.useState('');
    const [nameError, setNameError] = react_1.default.useState('');
    const handleSubmit = (e) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            yield validationSchemas_1.categoryNameValidationSchema.validate(name);
        }
        catch (err) {
            setNameError(err.errors.join(''));
            return;
        }
        if (currentGroup) {
            dispatch((0, catalogue_1.createCategory)({ groupId: currentGroup === null || currentGroup === void 0 ? void 0 : currentGroup.id, name }));
        }
    });
    return (react_1.default.createElement("form", { className: Form_scss_1.default.Container, onSubmit: handleSubmit },
        react_1.default.createElement("h1", { className: Form_scss_1.default.Title }, "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E"),
        react_1.default.createElement("div", { className: Form_scss_1.default.Item },
            react_1.default.createElement("label", { className: Form_scss_1.default.Item__label }, "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438: "),
            react_1.default.createElement(Input_1.Input, { name: "categoryName", type: "text", error: nameError, onFocus: () => setNameError(''), onChange: (e) => setName(e.target.value), value: name })),
        react_1.default.createElement(Button_1.default, { className: Form_scss_1.default.Submit, name: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C", type: "submit", theme: Button_1.ButtonTheme.Dark })));
};
exports.CreateCategoryForm = CreateCategoryForm;
