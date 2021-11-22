"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSubcategoryForm = void 0;
const tslib_1 = require("tslib");
const validationSchemas_1 = require("@utils/validationSchemas");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_redux_1 = require("react-redux");
const Form_scss_1 = (0, tslib_1.__importDefault)(require("@ui/Form/Form.scss"));
const catalogue_1 = require("@store/thunks/catalogue");
const Input_1 = require("@ui/Input/Input");
const Button_1 = (0, tslib_1.__importStar)(require("@ui/Button/Button"));
const Button_2 = (0, tslib_1.__importStar)(require("@ui/ButtonWthIcn/Button"));
const icons_1 = require("@ui/Icon/icons");
const uuid_1 = require("uuid");
const SubcategoryInputField_1 = require("@components/SubcategoryInputField/SubcategoryInputField");
const Specification_1 = require("shared/entities/Specification");
const react_router_dom_1 = require("react-router-dom");
const specificationsReducer = (state, action) => {
    switch (action.type) {
        case 'add':
            return [
                ...state,
                {
                    type: Specification_1.SpecificationType.Radio,
                    name: '',
                    nameError: '',
                    values: [
                        {
                            key: (0, uuid_1.v4)(),
                            value: '',
                            error: '',
                        },
                    ],
                    key: (0, uuid_1.v4)(),
                },
            ];
        case 'update':
            return state.map(specification => {
                if (specification.key !== action.payload.key) {
                    return specification;
                }
                return action.payload.updatedSpecification;
            });
        case 'delete': {
            const specToDeleteIndex = state.findIndex(specification => specification.key === action.payload.key);
            const newState = [...state.slice(0, specToDeleteIndex), ...state.slice(specToDeleteIndex + 1)];
            return newState;
        }
        default:
            return state;
    }
};
const CreateSubcategoryForm = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const { currentGroup, currentCategory } = (0, react_redux_1.useSelector)((state) => state.catalogue);
    const { groupId, categoryId } = (0, react_router_dom_1.useParams)();
    const [name, setName] = react_1.default.useState('');
    const [nameError, setNameError] = react_1.default.useState('');
    const [specifications, dispatchSpecification] = react_1.default.useReducer(specificationsReducer, []);
    if (!currentGroup || !currentCategory) {
        if (groupId && categoryId) {
            return react_1.default.createElement(react_router_dom_1.Redirect, { to: `/category/${categoryId}` });
        }
        return react_1.default.createElement(react_router_dom_1.Redirect, { to: "/" });
    }
    const addSpecification = (e) => {
        e.preventDefault();
        dispatchSpecification({ type: 'add' });
    };
    const updateSpecification = (key, updatedSpecification) => {
        dispatchSpecification({ type: 'update', payload: { key, updatedSpecification } });
    };
    const deleteSpecification = (key) => {
        dispatchSpecification({ type: 'delete', payload: { key } });
    };
    const handleSubmit = (e) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        e.preventDefault();
        let specificationsHaveError = false;
        try {
            yield validationSchemas_1.categoryNameValidationSchema.validate(name);
        }
        catch (err) {
            specificationsHaveError = true;
            setNameError(err.errors.join(''));
        }
        yield Promise.all(specifications.map((specification) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
            const updatedSpecification = Object.assign({}, specification);
            try {
                yield validationSchemas_1.categoryNameValidationSchema.validate(specification.name);
            }
            catch (err) {
                specificationsHaveError = true;
                updatedSpecification.nameError = err.errors.join('');
            }
            if (specification.type === Specification_1.SpecificationType.Range) {
                if (specification.range.maxValue === 0 && specification.range.minValue === 0) {
                    specificationsHaveError = true;
                    updatedSpecification.range.error = 'Промежуток не может быть нулевым';
                }
                try {
                    yield validationSchemas_1.categoryNameValidationSchema.validate(specification.range.unit);
                }
                catch (err) {
                    specificationsHaveError = true;
                    updatedSpecification.range.error = err.errors.join('');
                }
            }
            if (specification.type === Specification_1.SpecificationType.Radio || specification.type === Specification_1.SpecificationType.Select) {
                const values = [...specification.values];
                const newValues = yield Promise.all(values.map((value) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
                    try {
                        yield validationSchemas_1.categoryNameValidationSchema.validate(value.value);
                        return value;
                    }
                    catch (err) {
                        specificationsHaveError = true;
                        const newValue = Object.assign(Object.assign({}, value), { error: err.errors.join('') });
                        return newValue;
                    }
                })));
                updatedSpecification.values = newValues;
            }
            updateSpecification(specification.key, updatedSpecification);
        })));
        if (specificationsHaveError) {
            return;
        }
        dispatch((0, catalogue_1.createSubcategory)({ groupId: currentGroup.id, categoryId: currentCategory.id, data: { name, specifications } }));
    });
    return (react_1.default.createElement("form", { className: Form_scss_1.default.Container, onSubmit: handleSubmit },
        react_1.default.createElement("h1", { className: Form_scss_1.default.Title }, "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043F\u043E\u0434\u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E"),
        react_1.default.createElement("div", { className: Form_scss_1.default.Item },
            react_1.default.createElement("label", { className: Form_scss_1.default.Item__label }, "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043F\u043E\u0434\u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438: "),
            react_1.default.createElement(Input_1.Input, { name: "categoryName", type: "text", error: nameError, onFocus: () => setNameError(''), onChange: (e) => setName(e.target.value), value: name })),
        react_1.default.createElement("div", { className: Form_scss_1.default.Item },
            react_1.default.createElement("label", { className: Form_scss_1.default.Item__label }, "\u0422\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0445\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A\u0438: "),
            react_1.default.createElement("div", { className: Form_scss_1.default.Multipart },
                specifications.map(specification => (react_1.default.createElement(SubcategoryInputField_1.SubcategoryInputField, { key: specification.key, deleteSpecification: () => deleteSpecification(specification.key), updateSpecification: (specification) => updateSpecification(specification.key, specification), specification: specification }))),
                react_1.default.createElement(Button_2.default, { theme: Button_2.ButtonThemeIcn.White, onClick: addSpecification, icon: icons_1.IconName.AddField }))),
        react_1.default.createElement(Button_1.default, { className: Form_scss_1.default.Submit, name: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C", type: "submit", theme: Button_1.ButtonTheme.Dark })));
};
exports.CreateSubcategoryForm = CreateSubcategoryForm;
