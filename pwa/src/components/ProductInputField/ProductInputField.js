"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductInputField = void 0;
const tslib_1 = require("tslib");
const Specification_1 = require("shared/entities/Specification");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const Input_scss_1 = (0, tslib_1.__importDefault)(require("@ui/Input/Input.scss"));
const Input_1 = require("@ui/Input/Input");
const react_redux_1 = require("react-redux");
const ProductInputField = props => {
    const { currentSubcategory } = (0, react_redux_1.useSelector)((state) => state.catalogue);
    const { specification, unusedSpecifications, changeSpecification, updateSpecification } = props;
    const renderInputFieldValues = () => {
        const { categorySpecification } = specification;
        switch (categorySpecification.type) {
            case Specification_1.SpecificationType.Radio:
                return (react_1.default.createElement("div", { style: { display: 'flex', flexFlow: 'column nowrap' } }, categorySpecification.values.map(radioValue => {
                    var _a;
                    return (react_1.default.createElement("div", { key: radioValue._id },
                        react_1.default.createElement("input", { name: categorySpecification.name, type: "radio", checked: radioValue._id === ((_a = specification.value) === null || _a === void 0 ? void 0 : _a._id), onChange: () => updateSpecification(Object.assign(Object.assign({}, specification), { value: radioValue })) }),
                        react_1.default.createElement("label", { htmlFor: radioValue.value }, radioValue.value)));
                })));
            case Specification_1.SpecificationType.Range:
                return (react_1.default.createElement("div", { style: { display: 'flex', flexFlow: 'row nowrap' } },
                    react_1.default.createElement(Input_1.Input, { type: "number", onBlur: (e) => {
                            const parsedValue = parseInt(e.target.value);
                            if (parsedValue) {
                                if (parsedValue < categorySpecification.range.minValue) {
                                    updateSpecification(Object.assign(Object.assign({}, specification), { rangeValue: Object.assign(Object.assign({}, specification.rangeValue), { value: categorySpecification.range.minValue }) }));
                                }
                                else if (parsedValue > categorySpecification.range.maxValue) {
                                    updateSpecification(Object.assign(Object.assign({}, specification), { rangeValue: Object.assign(Object.assign({}, specification.rangeValue), { value: categorySpecification.range.maxValue }) }));
                                }
                            }
                            else {
                                updateSpecification(Object.assign(Object.assign({}, specification), { rangeValue: Object.assign(Object.assign({}, specification.rangeValue), { value: categorySpecification.range.minValue }) }));
                            }
                        }, onChange: (e) => {
                            updateSpecification(Object.assign(Object.assign({}, specification), { rangeValue: Object.assign(Object.assign({}, specification.rangeValue), { value: e.target.value }) }));
                        }, value: specification.rangeValue.value.toString(), name: categorySpecification.id })));
            case Specification_1.SpecificationType.Select:
                return (react_1.default.createElement("div", { style: { display: 'flex', flexFlow: 'column nowrap' } }, categorySpecification.values.map(selectValue => {
                    const valueIsSelected = Boolean(specification &&
                        specification.values.find(specificationValue => specificationValue._id === selectValue._id));
                    return (react_1.default.createElement("div", { key: selectValue._id },
                        react_1.default.createElement("input", { name: selectValue._id, type: "checkbox", checked: valueIsSelected, onChange: () => {
                                updateSpecification(Object.assign(Object.assign({}, specification), { values: valueIsSelected
                                        ? specification.values.filter(value => value._id !== selectValue._id)
                                        : [...specification.values, selectValue] }));
                            } }),
                        react_1.default.createElement("label", { htmlFor: selectValue._id }, selectValue.value)));
                })));
            default:
                throw new Error('unknown specification type');
        }
    };
    return (react_1.default.createElement("div", { style: { display: 'flex', flexFlow: 'row nowrap', margin: '0 12px 24px 0' } },
        react_1.default.createElement("div", null,
            react_1.default.createElement("select", { onChange: (e) => changeSpecification(specification.key, e.target.value), value: specification.categorySpecification.id, className: Input_scss_1.default.input }, currentSubcategory &&
                currentSubcategory.specifications.map(currentSpecification => (react_1.default.createElement("option", { disabled: !unusedSpecifications.find(unusedSpecification => currentSpecification.id === unusedSpecification.id), key: currentSpecification.id, value: currentSpecification.id }, currentSpecification.name)))),
            specification.error && (react_1.default.createElement("p", { style: { color: 'red', fontSize: '14px', width: '200px', overflowWrap: 'break-word' } }, specification.error))),
        renderInputFieldValues()));
};
exports.ProductInputField = ProductInputField;
