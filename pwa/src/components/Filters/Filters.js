"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Filters = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const category_1 = require("@store/slices/category");
const react_redux_1 = require("react-redux");
const Filter_1 = require("@components/Filter/Filter");
const Filters_scss_1 = (0, tslib_1.__importDefault)(require("./Filters.scss"));
const Specification_1 = require("shared/entities/Specification");
const Filters = () => {
    const { currentSubcategory } = (0, react_redux_1.useSelector)((state) => state.catalogue);
    const { filters } = (0, react_redux_1.useSelector)((state) => state.category);
    const dispatch = (0, react_redux_1.useDispatch)();
    const setPrice = (data) => {
        dispatch(category_1.categorySlice.actions.setFilters(Object.assign(Object.assign({}, filters), { price: data })));
    };
    const setFilter = (filterData) => {
        if (filters && filters.specifications) {
            const filterToChange = filters.specifications.find(specification => specification.specificationId === filterData.specificationId);
            const newSpecifications = filters.specifications.filter(filter => filter !== filterToChange);
            if ((filterData.type !== Specification_1.SpecificationType.Range && filterData.valueIds.length) ||
                filterData.type === Specification_1.SpecificationType.Range) {
                newSpecifications.push(filterData);
            }
            dispatch(category_1.categorySlice.actions.setFilters(Object.assign(Object.assign({}, filters), { specifications: newSpecifications })));
        }
    };
    if (!currentSubcategory) {
        return null;
    }
    const { specifications } = currentSubcategory;
    if (!filters || !filters.specifications) {
        return null;
    }
    return (react_1.default.createElement("div", { className: Filters_scss_1.default.Container },
        react_1.default.createElement(Filter_1.Filter, { specification: currentSubcategory.priceRange, key: currentSubcategory.priceRange.id, filter: filters.price, setFilter: setPrice }),
        specifications.map(specification => {
            var _a, _b;
            return (react_1.default.createElement(Filter_1.Filter, { specification: specification, key: specification.id, filter: (_b = (_a = filters.specifications) === null || _a === void 0 ? void 0 : _a.find(specificationFilter => specificationFilter.specificationId === specification.id)) !== null && _b !== void 0 ? _b : null, setFilter: setFilter }));
        })));
};
exports.Filters = Filters;
