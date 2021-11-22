"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryNameValidationSchema = exports.passwordValidationSchema = exports.usernameValidationSchema = void 0;
const yup_1 = require("yup");
exports.usernameValidationSchema = (0, yup_1.string)()
    .strict(true)
    .required('Данное поле должно быть заполнено')
    .min(4, 'Логин должен быть не менее 4 символов')
    .trim('Логин не должен содержать предшествующих и ведущих пробелов');
exports.passwordValidationSchema = (0, yup_1.string)()
    .strict(true)
    .required('Данное поле должно быть заполнено')
    .min(8, 'Пароль должен быть не менее 8 символов')
    .trim('Пароль не должен содержать предшествующих и ведущих пробелов');
exports.categoryNameValidationSchema = (0, yup_1.string)()
    .strict(true)
    .required('Данное поле должно быть заполнено')
    .min(3, 'Название должно содержать не менее трех символов')
    .trim('Название не должно содержать предшествующих и ведущих пробелов');
