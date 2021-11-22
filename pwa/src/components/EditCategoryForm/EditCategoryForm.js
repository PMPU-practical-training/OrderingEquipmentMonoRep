"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditCategoryForm = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_redux_1 = require("react-redux");
const Form_scss_1 = (0, tslib_1.__importDefault)(require("@ui/Form/Form.scss"));
const Input_1 = require("@ui/Input/Input");
const Button_1 = (0, tslib_1.__importStar)(require("@ui/Button/Button"));
const validationSchemas_1 = require("@utils/validationSchemas");
const catalogue_1 = require("@store/thunks/catalogue");
const EditCategoryForm = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const { currentCategory } = (0, react_redux_1.useSelector)((state) => state.catalogue);
    const [name, setName] = react_1.default.useState('');
    const [nameError, setNameError] = react_1.default.useState('');
    react_1.default.useEffect(() => {
        if (currentCategory) {
            setName(currentCategory.name);
        }
    }, [currentCategory]);
    const handleSubmit = (e) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            yield validationSchemas_1.categoryNameValidationSchema.validate(name);
        }
        catch (err) {
            setNameError(err.errors.join(''));
            return;
        }
        if (currentCategory) {
            dispatch((0, catalogue_1.updateCategory)({ id: currentCategory.id, name }));
        }
    });
    return (react_1.default.createElement("form", { className: Form_scss_1.default.Container, onSubmit: handleSubmit },
        react_1.default.createElement("h1", { className: Form_scss_1.default.Title }, "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E"),
        react_1.default.createElement("div", { className: Form_scss_1.default.Item },
            react_1.default.createElement("label", { className: Form_scss_1.default.Item__label }, "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438: "),
            react_1.default.createElement(Input_1.Input, { name: "groupName", type: "text", error: nameError, onFocus: () => setNameError(''), onChange: (e) => setName(e.target.value), value: name })),
        react_1.default.createElement(Button_1.default, { className: Form_scss_1.default.Submit, name: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C", type: "submit", theme: Button_1.ButtonTheme.Dark })));
};
exports.EditCategoryForm = EditCategoryForm;
