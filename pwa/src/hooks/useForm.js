"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useForm = void 0;
const useForm = (params) => {
    const { inputSchema } = params;
    const generateInputControls = () => {
        const inputControls = {};
        for (const schemaElement in inputSchema) {
            const inputControl = {
                [schemaElement]: {},
            };
            Object.assign(inputControls);
        }
    };
};
exports.useForm = useForm;
