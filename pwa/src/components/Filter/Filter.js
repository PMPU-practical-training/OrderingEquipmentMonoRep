"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Filter = exports.RangeFilter = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const Filter_scss_1 = (0, tslib_1.__importDefault)(require("./Filter.scss"));
const Specification_1 = require("shared/entities/Specification");
const InputRange_1 = (0, tslib_1.__importDefault)(require("@ui/InputRange/InputRange"));
const RangeFilter = props => {
    var _a, _b;
    const { specification, filter, setFilter } = props;
    const from = react_1.default.useRef(0);
    const to = react_1.default.useRef(0);
    const setFilterValue = (e, origin) => {
        if (origin === 'to') {
            to.current = e.target.value ? parseInt(e.target.value) : specification.range.maxValue;
        }
        else {
            from.current = e.target.value ? parseInt(e.target.value) : specification.range.minValue;
        }
        if (!from.current || from.current < specification.range.minValue) {
            from.current = specification.range.minValue;
        }
        if (!to.current || to.current > specification.range.maxValue) {
            to.current = specification.range.maxValue;
        }
        setFilter({
            specificationId: specification.id,
            type: specification.type,
            to: to.current,
            from: from.current,
        });
    };
    return (react_1.default.createElement("div", { className: Filter_scss_1.default.Filter__inputContainer },
        react_1.default.createElement("div", { className: Filter_scss_1.default.Filter__range },
            react_1.default.createElement(InputRange_1.default, { className: Filter_scss_1.default.Filter__input, name: "from", onBlur: (e) => setFilterValue(e, 'from'), defaultValue: (_a = filter) === null || _a === void 0 ? void 0 : _a.from, type: "number", placeholder: specification.range.minValue.toString(), text: 'от' }),
            react_1.default.createElement(InputRange_1.default, { className: Filter_scss_1.default.Filter__input, name: "to", onBlur: (e) => setFilterValue(e, 'to'), defaultValue: (_b = filter) === null || _b === void 0 ? void 0 : _b.to, type: "number", placeholder: specification.range.maxValue.toString(), text: 'до' }))));
};
exports.RangeFilter = RangeFilter;
const Filter = props => {
    const { specification, filter, setFilter } = props;
    const renderFilter = (specification, filter) => {
        switch (specification.type) {
            case Specification_1.SpecificationType.Radio: {
                return (react_1.default.createElement("div", { className: Filter_scss_1.default.Filter__inputContainer }, specification.values.map(value => {
                    const filterIsSelected = Boolean(filter && filter.valueIds.find(valueId => valueId === value._id));
                    const setFilterValue = (valueId) => {
                        if (filterIsSelected) {
                            setFilter({
                                specificationId: specification.id,
                                type: specification.type,
                                valueIds: [valueId],
                            });
                        }
                        else {
                            setFilter({
                                specificationId: specification.id,
                                type: specification.type,
                                valueIds: [valueId],
                            });
                        }
                    };
                    return (react_1.default.createElement("div", { key: value._id },
                        react_1.default.createElement("input", { onChange: () => setFilterValue(value._id), checked: filterIsSelected, type: "radio", name: value.value, className: Filter_scss_1.default.Filter__input }),
                        react_1.default.createElement("label", { htmlFor: value.value }, value.value)));
                })));
            }
            case Specification_1.SpecificationType.Range: {
                return react_1.default.createElement(exports.RangeFilter, { specification: specification, filter: filter, setFilter: setFilter });
            }
            case Specification_1.SpecificationType.Select:
                return (react_1.default.createElement("div", { className: Filter_scss_1.default.Filter__inputContainer }, specification.values.map(value => {
                    const filterIsSelected = Boolean(filter && filter.valueIds.find(valueId => valueId === value._id));
                    const setFilterValue = (valueId) => {
                        if (filterIsSelected) {
                            setFilter({
                                specificationId: specification.id,
                                type: specification.type,
                                valueIds: filter.valueIds.filter(value => value !== valueId),
                            });
                        }
                        else {
                            setFilter({
                                specificationId: specification.id,
                                type: specification.type,
                                valueIds: filter ? [...filter.valueIds, valueId] : [valueId],
                            });
                        }
                    };
                    return (react_1.default.createElement("div", { key: value._id },
                        react_1.default.createElement("input", { onChange: () => setFilterValue(value._id), checked: filterIsSelected, type: "checkbox", name: value.value, className: Filter_scss_1.default.Filter__input }),
                        react_1.default.createElement("label", { htmlFor: value.value }, value.value)));
                })));
            default:
                return null;
        }
    };
    return (react_1.default.createElement("div", { className: Filter_scss_1.default.Filter__container },
        react_1.default.createElement("p", { className: Filter_scss_1.default.Filter__label }, specification.type === Specification_1.SpecificationType.Range
            ? `${specification.name}, ${specification.range.unit}`
            : specification.name),
        renderFilter(specification, filter)));
};
exports.Filter = Filter;
