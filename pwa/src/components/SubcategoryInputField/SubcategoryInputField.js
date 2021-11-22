"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubcategoryInputField = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const uuid_1 = require("uuid");
const Specification_1 = require("shared/entities/Specification");
const Input_1 = require("@ui/Input/Input");
const Link_1 = require("@ui/Link/Link");
const Button_1 = (0, tslib_1.__importStar)(require("@ui/ButtonWthIcn/Button"));
const Input_scss_1 = (0, tslib_1.__importDefault)(require("@ui/Input/Input.scss"));
const icons_1 = require("@ui/Icon/icons");
const SubcategoryInputField = props => {
    const { specification, updateSpecification, deleteSpecification } = props;
    const updateName = (newName) => {
        const newSpecification = Object.assign(Object.assign({}, specification), { name: newName });
        updateSpecification(newSpecification);
    };
    const updateType = (newType) => {
        if (newType === specification.type) {
            return;
        }
        switch (newType) {
            case Specification_1.SpecificationType.Radio:
            case Specification_1.SpecificationType.Select: {
                updateSpecification({
                    key: specification.key,
                    type: newType,
                    name: specification.name,
                    nameError: '',
                    values: [
                        {
                            key: (0, uuid_1.v4)(),
                            value: '',
                            error: '',
                        },
                    ],
                });
                break;
            }
            case Specification_1.SpecificationType.Range: {
                updateSpecification({
                    key: specification.key,
                    name: specification.name,
                    nameError: '',
                    type: newType,
                    range: {
                        minValue: 0,
                        maxValue: 0,
                        unit: '',
                        error: '',
                    },
                });
                break;
            }
            default:
                break;
        }
    };
    const addValueToSelectOrRadio = () => {
        const oldValues = specification.values;
        const newValues = [...oldValues, { key: (0, uuid_1.v4)(), value: '' }];
        const newSpecification = Object.assign(Object.assign({}, specification), { values: newValues });
        updateSpecification(newSpecification);
    };
    const updateValueFromSelectOrRadio = (key, value) => {
        const { values } = specification;
        const newValues = values.map(newValue => {
            if (newValue.key !== key) {
                return newValue;
            }
            return Object.assign(Object.assign({}, newValue), { value });
        });
        const newSpecification = Object.assign(Object.assign({}, specification), { values: newValues });
        updateSpecification(newSpecification);
    };
    const removeValueFromSelectOrRadio = (key) => {
        const { values } = specification;
        const newValues = [...values.filter(value => value.key !== key)];
        if (!newValues.length) {
            deleteSpecification();
        }
        const newSpecification = Object.assign(Object.assign({}, specification), { values: newValues });
        updateSpecification(newSpecification);
    };
    const resetErrors = () => {
        const newSpecification = Object.assign({}, specification);
        newSpecification.nameError = '';
        if (newSpecification.type === Specification_1.SpecificationType.Range) {
            newSpecification.range.error = '';
        }
        else {
            newSpecification.values = newSpecification.values.map(value => (Object.assign(Object.assign({}, value), { error: '' })));
        }
        updateSpecification(newSpecification);
    };
    const updateRangeValue = (key, e) => {
        if (key === 'unit') {
            updateSpecification(Object.assign(Object.assign({}, specification), { range: Object.assign(Object.assign({}, specification.range), { unit: e.target.value }) }));
            return;
        }
        const parsedValue = parseInt(e.target.value);
        if (parsedValue && parsedValue >= 0) {
            updateSpecification(Object.assign(Object.assign({}, specification), { range: Object.assign(Object.assign({}, specification.range), { [key]: parsedValue }) }));
        }
        else {
            updateSpecification(Object.assign(Object.assign({}, specification), { range: Object.assign(Object.assign({}, specification.range), { [key]: 0 }) }));
        }
    };
    const renderInputFieldValues = () => {
        switch (specification.type) {
            case Specification_1.SpecificationType.Radio:
            case Specification_1.SpecificationType.Select:
                return (react_1.default.createElement("div", { style: { display: 'flex', flexFlow: 'column nowrap' } },
                    specification.values.map(value => (react_1.default.createElement("div", { key: value.key, style: { display: 'flex', flexFlow: 'row nowrap' } },
                        react_1.default.createElement(Input_1.Input, { type: "text", name: "specificationValue", value: value.value, error: value.error, placeholder: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u0430", onFocus: resetErrors, onChange: (e) => updateValueFromSelectOrRadio(value.key, e.target.value) }),
                        react_1.default.createElement(Link_1.Link, { style: { marginLeft: '4px', fontSize: '18px', alignSelf: 'flex-start', width: 'auto' }, name: "(\u0423\u0434\u0430\u043B\u0438\u0442\u044C)", onClick: () => removeValueFromSelectOrRadio(value.key) })))),
                    react_1.default.createElement(Button_1.default, { style: { width: '40px', padding: 0 }, theme: Button_1.ButtonThemeIcn.White, icon: icons_1.IconName.AddField, onClick: (e) => {
                            e.preventDefault();
                            addValueToSelectOrRadio();
                        } })));
            case Specification_1.SpecificationType.Range:
                return (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(Input_1.Input, { style: { marginBottom: '4px' }, type: "text", name: "specificationValue", placeholder: "\u041C\u0435\u0440\u0430 \u0438\u0437\u043C\u0435\u0440\u0435\u043D\u0438\u044F", value: specification.range.unit, error: specification.range.error, onFocus: resetErrors, onChange: (e) => updateRangeValue('unit', e) }),
                    react_1.default.createElement(Input_1.Input, { style: { marginBottom: '4px', minWidth: '60px', maxWidth: '60px' }, type: "number", name: "specificationValue", placeholder: "\u041E\u0442", value: specification.range.minValue.toString(), onFocus: resetErrors, onChange: (e) => updateRangeValue('minValue', e) }),
                    react_1.default.createElement(Input_1.Input, { style: { marginBottom: '4px', minWidth: '60px', maxWidth: '60px' }, type: "number", name: "specificationValue", placeholder: "\u0414\u043E", value: specification.range.maxValue.toString(), onFocus: resetErrors, onChange: (e) => updateRangeValue('maxValue', e) }),
                    react_1.default.createElement(Link_1.Link, { style: { marginLeft: '4px', fontSize: '18px', alignSelf: 'flex-start', width: 'auto' }, name: "(\u0423\u0434\u0430\u043B\u0438\u0442\u044C)", onClick: () => deleteSpecification() })));
            default:
                return null;
        }
    };
    return (react_1.default.createElement("div", { style: { display: 'flex', flexFlow: 'row nowrap', marginBottom: '24px' } },
        react_1.default.createElement("select", { onChange: (e) => updateType(e.target.value), value: specification.type, className: Input_scss_1.default.input },
            react_1.default.createElement("option", { value: Specification_1.SpecificationType.Radio }, "\u0412\u044B\u0431\u043E\u0440 \u043E\u0434\u043D\u043E\u0433\u043E"),
            react_1.default.createElement("option", { value: Specification_1.SpecificationType.Select }, "\u0412\u044B\u0431\u043E\u0440 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u0438\u0445"),
            react_1.default.createElement("option", { value: Specification_1.SpecificationType.Range }, "\u041F\u0440\u043E\u043C\u0435\u0436\u0443\u0442\u043E\u043A")),
        react_1.default.createElement(Input_1.Input, { style: { margin: '0 8px' }, name: "specificationName", type: "text", value: specification.name, placeholder: "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435", error: specification.nameError, onFocus: resetErrors, onChange: (e) => updateName(e.target.value) }),
        renderInputFieldValues()));
};
exports.SubcategoryInputField = SubcategoryInputField;
