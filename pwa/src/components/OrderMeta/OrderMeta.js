"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderMeta = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importStar)(require("react"));
const Button_1 = (0, tslib_1.__importStar)(require("@ui/Button/Button"));
const Input_1 = require("../../ui/Input/Input");
const OrderService_scss_1 = (0, tslib_1.__importDefault)(require("./OrderService.scss"));
const react_redux_1 = require("react-redux");
const order_1 = require("@store/thunks/order");
const Values = [
    {
        value: 'ДЛЯ ОБЕСПЕЧЕНИЯ:',
    },
    {
        value: 'СРОКИ',
    },
    {
        value: 'АДРЕС:',
    },
    {
        value: 'ИСТОЧНИКИ ФИНАНСИРОВАНИЯ:',
    },
    {
        value: 'КОНТАКТНОЕ ЛИЦО ПО ЗАЯВКЕ:',
    },
];
const OrderMeta = () => {
    const { cart } = (0, react_redux_1.useSelector)((state) => state.cart);
    const userData = (0, react_redux_1.useSelector)((state) => state.user.data);
    const [orderNumber, setOrderNumber] = (0, react_1.useState)('');
    const [name, setName] = (0, react_1.useState)('');
    const [deadline, setDeadline] = (0, react_1.useState)('');
    const [deliveryAddress, setDeliveryAddress] = (0, react_1.useState)('');
    const [financingSource, setFinancingSource] = (0, react_1.useState)('');
    const [feedbackContact, setFeedbackContact] = (0, react_1.useState)('');
    const [materiallyResponsible, setMateriallyResponsible] = (0, react_1.useState)('');
    const dispatch = (0, react_redux_1.useDispatch)();
    const handleSubmit = () => {
        dispatch((0, order_1.createOrder)({
            name,
            author: userData._id,
            meta: {
                orderNumber,
                totalPrice: 1,
                deadline,
                deliveryAddress,
                financingSource,
                feedbackContact,
                materiallyResponsible,
            },
            products: cart.map(cartItem => ({
                id: cartItem.product.id,
                quantity: cartItem.quantity,
            })),
        }));
    };
    return (react_1.default.createElement("div", { className: OrderService_scss_1.default.Container },
        react_1.default.createElement("div", { className: OrderService_scss_1.default.Title }, "\u041E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u0435 \u0437\u0430\u044F\u0432\u043A\u0438"),
        react_1.default.createElement("div", { className: OrderService_scss_1.default.Container__input },
            react_1.default.createElement("div", { className: OrderService_scss_1.default.Container__row },
                react_1.default.createElement("span", { className: OrderService_scss_1.default.Value }, "\u041D\u041E\u041C\u0415\u0420 \u0417\u0410\u041A\u0410\u0417\u0410:"),
                react_1.default.createElement(Input_1.Input, { onChange: (e) => setOrderNumber(e.target.value), theme: Input_1.InputTheme.Light, placeholder: "12-34-56-78", name: "Person", type: "string", className: OrderService_scss_1.default.Input })),
            react_1.default.createElement("div", { className: OrderService_scss_1.default.Container__row },
                react_1.default.createElement("span", { className: OrderService_scss_1.default.Value }, "\u041D\u0410\u0417\u0412\u0410\u041D\u0418\u0415 \u0417\u0410\u041A\u0410\u0417\u0410:"),
                react_1.default.createElement(Input_1.Input, { onChange: (e) => setName(e.target.value), theme: Input_1.InputTheme.Light, placeholder: "\u0414\u043B\u044F \u043E\u0431\u0435\u0441\u043F\u0435\u0447\u0435\u043D\u0438\u044F \u0440\u0430\u0431\u043E\u0442\u043E\u0441\u043F\u043E\u0441\u043E\u0431\u043D\u043E\u0441\u0442\u0438 \u0441\u0435\u0442\u0438 \u0421\u041F\u0431\u0413\u0423 \u0432 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0430\u0445 \u043D\u0430\u0443\u0447\u043D\u043E\u0433\u043E \u043F\u0430\u0440\u043A\u0430", name: "Purpose", type: "string", className: OrderService_scss_1.default.Input })),
            react_1.default.createElement("div", { className: OrderService_scss_1.default.Container__row },
                react_1.default.createElement("span", { className: OrderService_scss_1.default.Value }, "\u0421\u0420\u041E\u041A\u0418:"),
                react_1.default.createElement(Input_1.Input, { onChange: (e) => setDeadline(e.target.value), theme: Input_1.InputTheme.Light, placeholder: "30 \u0434\u043D\u0435\u0439 \u0441 \u043C\u043E\u043C\u0435\u043D\u0442\u0430 \u0437\u0430\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u0430", name: "Deadline", type: "string", className: OrderService_scss_1.default.Input })),
            react_1.default.createElement("div", { className: OrderService_scss_1.default.Container__row },
                react_1.default.createElement("span", { className: OrderService_scss_1.default.Value }, "\u0410\u0414\u0420\u0415\u0421:"),
                react_1.default.createElement(Input_1.Input, { onChange: (e) => setDeliveryAddress(e.target.value), theme: Input_1.InputTheme.Light, placeholder: "\u0433. \u0421\u0430\u043D\u043A\u0442-\u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433, \u0433. \u041F\u0435\u0442\u0435\u0440\u0433\u043E\u0444, \u0410\u0441\u0442\u0440\u043E\u043D\u043E\u043C\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0443\u043B., 6/1", name: "Address", type: "string", className: OrderService_scss_1.default.Input })),
            react_1.default.createElement("div", { className: OrderService_scss_1.default.Container__row },
                react_1.default.createElement("span", { className: OrderService_scss_1.default.Value }, "\u0418\u0421\u0422\u041E\u0427\u041D\u0418\u041A\u0418 \u0424\u0418\u041D\u0410\u041D\u0421\u0418\u0420\u041E\u0412\u0410\u041D\u0418\u042F:"),
                react_1.default.createElement(Input_1.Input, { onChange: (e) => setFinancingSource(e.target.value), theme: Input_1.InputTheme.Light, placeholder: "\u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 \u0440\u0430\u0437\u0432\u0438\u0442\u0438\u044F, \u0440\u0430\u0441\u043F\u043E\u0440\u044F\u0434\u0438\u0442\u0435\u043B\u044C \u0421.\u0412.\u041C\u0438\u043A\u0443\u0448\u0435\u0432", name: "Finance", type: "string", className: OrderService_scss_1.default.Input })),
            react_1.default.createElement("div", { className: OrderService_scss_1.default.Container__row },
                react_1.default.createElement("span", { className: OrderService_scss_1.default.Value }, "\u041A\u041E\u041D\u0422\u0410\u041A\u0422\u041D\u041E\u0415 \u041B\u0418\u0426\u041E \u041F\u041E \u0417\u0410\u042F\u0412\u041A\u0415:"),
                react_1.default.createElement(Input_1.Input, { onChange: (e) => setFeedbackContact(e.target.value), theme: Input_1.InputTheme.Light, placeholder: "\u0412\u0430\u0441\u0438\u043B\u044C\u0435\u0432 \u041C\u0438\u0445\u0430\u0438\u043B \u0412\u0438\u043A\u0442\u043E\u0440\u043E\u0432\u0438\u0447, \u043D\u0430\u0447\u0430\u043B\u044C\u043D\u0438\u043A \u0441\u043B\u0443\u0436\u0431\u044B \u042D\u0418\u0412\u0420 \u0423\u0421\u0418\u0422", name: "Person", type: "string", className: OrderService_scss_1.default.Input })),
            react_1.default.createElement("div", { className: OrderService_scss_1.default.Container__row },
                react_1.default.createElement("span", { className: OrderService_scss_1.default.Value }, "\u041C\u0410\u0422\u0415\u0420\u0418\u0410\u041B\u042C\u041D\u041E \u041E\u0422\u0412\u0415\u0422\u0421\u0422\u0412\u0415\u041D\u041D\u041E\u0415 \u041B\u0418\u0426\u041E:"),
                react_1.default.createElement(Input_1.Input, { onChange: (e) => setMateriallyResponsible(e.target.value), theme: Input_1.InputTheme.Light, placeholder: "\u0412\u0430\u0441\u0438\u043B\u044C\u0435\u0432 \u041C\u0438\u0445\u0430\u0438\u043B \u0412\u0438\u043A\u0442\u043E\u0440\u043E\u0432\u0438\u0447, \u043D\u0430\u0447\u0430\u043B\u044C\u043D\u0438\u043A \u0441\u043B\u0443\u0436\u0431\u044B \u042D\u0418\u0412\u0420 \u0423\u0421\u0418\u0422", name: "Person", type: "string", className: OrderService_scss_1.default.Input }))),
        react_1.default.createElement(Button_1.default, { onClick: () => handleSubmit(), theme: Button_1.ButtonTheme.Dark, name: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443", className: OrderService_scss_1.default.Button })));
};
exports.OrderMeta = OrderMeta;
