"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductForm = exports.productSpecificationsReducer = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importStar)(require("react"));
const Form_scss_1 = (0, tslib_1.__importDefault)(require("@ui/Form/Form.scss"));
const react_redux_1 = require("react-redux");
const uuid_1 = require("uuid");
const Input_1 = require("@ui/Input/Input");
const Button_1 = (0, tslib_1.__importStar)(require("@ui/ButtonWthIcn/Button"));
const icons_1 = require("@ui/Icon/icons");
const react_router_dom_1 = require("react-router-dom");
const ProductInputField_1 = require("@components/ProductInputField/ProductInputField");
const Link_1 = require("@ui/Link/Link");
const Button_2 = (0, tslib_1.__importStar)(require("@ui/Button/Button"));
const validationSchemas_1 = require("@utils/validationSchemas");
const Specification_1 = require("shared/entities/Specification");
const product_1 = require("@store/thunks/product");
const productSpecificationsReducer = (state, action) => {
    switch (action.type) {
        case 'set':
            return action.payload;
        case 'add':
            console.log(action.payload);
            return [...state, action.payload];
        case 'update':
            return state.map(productSpecification => {
                if (productSpecification.key !== action.payload.key) {
                    return productSpecification;
                }
                return action.payload.updatedSpecification;
            });
        case 'delete': {
            const specToDeleteIndex = state.findIndex(productSpecification => productSpecification.key === action.payload);
            const newState = [...state.slice(0, specToDeleteIndex), ...state.slice(specToDeleteIndex + 1)];
            return newState;
        }
        default:
            return state;
    }
};
exports.productSpecificationsReducer = productSpecificationsReducer;
const CreateProductForm = () => {
    const { currentGroup, currentCategory, currentSubcategory } = (0, react_redux_1.useSelector)((state) => state.catalogue);
    const history = (0, react_router_dom_1.useHistory)();
    const { categoryId, subcategoryId } = (0, react_router_dom_1.useParams)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const [name, setName] = react_1.default.useState('');
    const [nameError, setNameError] = react_1.default.useState('');
    const [price, setPrice] = react_1.default.useState('');
    const [priceError, setPriceError] = react_1.default.useState('');
    const [unusedSpecifications, setUnusedSpecifications] = react_1.default.useState([]);
    const [productSpecifications, dispatchProductSpecificationAction] = (0, react_1.useReducer)(exports.productSpecificationsReducer, []);
    const getUnusedSpecifications = () => {
        if (currentSubcategory) {
            return currentSubcategory.specifications.filter(subcategorySpecification => !productSpecifications.find(productSpecification => productSpecification.categorySpecification.id === subcategorySpecification.id));
        }
        throw new Error('no specification');
    };
    react_1.default.useEffect(() => {
        if (!currentSubcategory) {
            history.push(`/category/${categoryId}/subcategory/${subcategoryId}`);
        }
        else {
            setUnusedSpecifications(getUnusedSpecifications());
        }
    }, [productSpecifications]);
    const transformCategorySpecificationToProductSpecification = (specification) => {
        switch (specification.type) {
            case Specification_1.SpecificationType.Radio:
                return {
                    error: '',
                    key: (0, uuid_1.v4)(),
                    value: {
                        _id: specification.values[0]._id,
                        value: specification.values[0].value,
                    },
                    categorySpecification: specification,
                };
            case Specification_1.SpecificationType.Select:
                return {
                    error: '',
                    key: (0, uuid_1.v4)(),
                    values: [],
                    categorySpecification: specification,
                };
            case Specification_1.SpecificationType.Range:
                return {
                    error: '',
                    key: (0, uuid_1.v4)(),
                    rangeValue: {
                        _id: specification.range._id,
                        value: specification.range.minValue,
                        unit: specification.range.unit,
                    },
                    categorySpecification: specification,
                };
            default:
                throw new Error('bad spec type');
        }
    };
    const addProductSpecification = (e) => {
        e.preventDefault();
        console.log(transformCategorySpecificationToProductSpecification(unusedSpecifications[0]));
        if (unusedSpecifications.length) {
            console.log;
            dispatchProductSpecificationAction({
                type: 'add',
                payload: transformCategorySpecificationToProductSpecification(unusedSpecifications[0]),
            });
        }
    };
    const changeSpecification = (key, idOfSpecificationToUse) => {
        const specificationToUse = unusedSpecifications.find(unusedSpecification => unusedSpecification.id === idOfSpecificationToUse);
        if (specificationToUse) {
            dispatchProductSpecificationAction({
                type: 'update',
                payload: {
                    key,
                    updatedSpecification: transformCategorySpecificationToProductSpecification(specificationToUse),
                },
            });
        }
    };
    const updateProductSpecification = (key, newSpecification) => {
        dispatchProductSpecificationAction({
            type: 'update',
            payload: { key, updatedSpecification: newSpecification },
        });
    };
    const deleteProductSpecification = (key) => {
        dispatchProductSpecificationAction({ type: 'delete', payload: key });
    };
    const handleSubmit = (e) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        e.preventDefault();
        let productHasErrors = false;
        try {
            yield validationSchemas_1.categoryNameValidationSchema.validate(name);
        }
        catch (err) {
            productHasErrors = true;
            setNameError(err.errors.join(''));
        }
        const priceRegex = new RegExp(/^[0-9]+(\.[0-9]{2})?$/g);
        if (!priceRegex.test(price)) {
            productHasErrors = true;
            setPriceError('Некорректный формат цены. Корректный формат - 1234.56');
        }
        else {
            const parsedPrice = parseFloat(price).toFixed(2);
            if (!parsedPrice) {
                productHasErrors = true;
                setPriceError('Ошибка обработки цены.');
            }
        }
        const parsedProductSpecifications = productSpecifications.map(productSpecification => {
            const { categorySpecification } = productSpecification;
            switch (categorySpecification.type) {
                case Specification_1.SpecificationType.Select:
                    if (!productSpecification.values.length) {
                        productHasErrors = true;
                        updateProductSpecification(productSpecification.key, Object.assign(Object.assign({}, productSpecification), { error: 'Необходимо выбрать хотя-бы одно значение' }));
                        return null;
                    }
                    return {
                        id: categorySpecification.id,
                        name: categorySpecification.name,
                        type: categorySpecification.type,
                        values: productSpecification.values,
                    };
                case Specification_1.SpecificationType.Range:
                    return {
                        id: categorySpecification.id,
                        name: categorySpecification.name,
                        type: categorySpecification.type,
                        rangeValue: productSpecification.rangeValue,
                    };
                case Specification_1.SpecificationType.Radio:
                    return {
                        id: categorySpecification.id,
                        name: categorySpecification.name,
                        type: categorySpecification.type,
                        value: productSpecification.value,
                    };
                default:
                    throw new Error('unknown specification type');
            }
        });
        console.log(parsedProductSpecifications);
        if (productHasErrors) {
            return;
        }
        if (currentGroup && currentCategory && currentSubcategory) {
            dispatch((0, product_1.createProduct)({
                groupId: currentGroup.id,
                categoryId: currentCategory.id,
                subcategoryId: currentSubcategory.id,
                body: {
                    name,
                    price,
                    specifications: parsedProductSpecifications,
                },
            }));
        }
    });
    return (react_1.default.createElement("form", { className: Form_scss_1.default.Container, onSubmit: handleSubmit },
        react_1.default.createElement("h1", { className: Form_scss_1.default.Title }, "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043F\u043E\u0437\u0438\u0446\u0438\u044E"),
        react_1.default.createElement("div", { className: Form_scss_1.default.Item },
            react_1.default.createElement("label", { className: Form_scss_1.default.Item__label }, "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043F\u043E\u0437\u0438\u0446\u0438\u0438: "),
            react_1.default.createElement(Input_1.Input, { name: "productName", type: "text", error: nameError, placeholder: "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435", onFocus: () => setNameError(''), onChange: (e) => setName(e.target.value), value: name })),
        react_1.default.createElement("div", { className: Form_scss_1.default.Item },
            react_1.default.createElement("label", { className: Form_scss_1.default.Item__label }, "\u0426\u0435\u043D\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u0438: "),
            react_1.default.createElement(Input_1.Input, { name: "productPrice", type: "text", placeholder: "100.50", error: priceError, onFocus: () => setPriceError(''), onChange: (e) => setPrice(e.target.value), value: price })),
        react_1.default.createElement("div", { className: Form_scss_1.default.Item },
            react_1.default.createElement("label", { className: Form_scss_1.default.Item__label }, "\u0422\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0445\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A\u0438"),
            react_1.default.createElement("div", { className: Form_scss_1.default.Multipart },
                productSpecifications.map(productSpecification => (react_1.default.createElement("div", { key: productSpecification.key, style: { display: 'flex', flexFlow: 'row nowrap' } },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement(ProductInputField_1.ProductInputField, { specification: productSpecification, unusedSpecifications: unusedSpecifications, changeSpecification: changeSpecification, updateSpecification: (specification) => updateProductSpecification(productSpecification.key, specification), deleteSpecification: () => { } }, productSpecification.categorySpecification.name)),
                    react_1.default.createElement(Link_1.Link, { name: "(\u0443\u0431\u0440\u0430\u0442\u044C)", style: { fontSize: '16px', height: '16px', width: 'auto' }, onClick: () => deleteProductSpecification(productSpecification.key) })))),
                react_1.default.createElement(Button_1.default, { style: { width: '40px', padding: '0' }, theme: Button_1.ButtonThemeIcn.White, onClick: addProductSpecification, icon: icons_1.IconName.AddField }))),
        react_1.default.createElement(Button_2.default, { className: Form_scss_1.default.Submit, name: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C", type: "submit", theme: Button_2.ButtonTheme.Dark })));
};
exports.CreateProductForm = CreateProductForm;
