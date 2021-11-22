"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripSpecifications = exports.prefillSubcategorySpecifications = void 0;
const uuid_1 = require("uuid");
const Specification_1 = require("shared/entities/Specification");
const prefillSubcategorySpecifications = (specifications) => specifications.map(specification => {
    if (specification.type === Specification_1.SpecificationType.Select || specification.type === Specification_1.SpecificationType.Radio) {
        return Object.assign(Object.assign({}, specification), { key: (0, uuid_1.v4)(), nameError: '', values: specification.values.map(specificationValue => (Object.assign(Object.assign({}, specificationValue), { key: (0, uuid_1.v4)(), error: '' }))) });
    }
    return Object.assign(Object.assign({}, specification), { key: (0, uuid_1.v4)(), nameError: '', range: Object.assign(Object.assign({}, specification.range), { error: '' }) });
});
exports.prefillSubcategorySpecifications = prefillSubcategorySpecifications;
const stripSpecifications = (specifications) => specifications.map(specification => {
    if (specification.type === Specification_1.SpecificationType.Select || specification.type === Specification_1.SpecificationType.Radio) {
        return Object.assign({}, { name: specification.name, type: specification.type }, specification.id ? { id: specification.id } : {}, {
            values: specification.values.map(value => Object.assign({}, { value: value.value }, value._id ? { _id: value._id } : {})),
        });
    }
    return Object.assign({}, { name: specification.name, type: specification.type }, specification.id ? { id: specification.id } : {}, {
        range: Object.assign({}, {
            minValue: specification.range.minValue,
            maxValue: specification.range.maxValue,
            unit: specification.range.unit,
        }, specification.range._id
            ? { _id: specification.range._id }
            : {}),
    });
});
exports.stripSpecifications = stripSpecifications;
