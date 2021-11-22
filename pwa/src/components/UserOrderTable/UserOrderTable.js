"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserOrderTable = void 0;
const tslib_1 = require("tslib");
const order_1 = require("@store/thunks/order");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_redux_1 = require("react-redux");
const UserOrderTable_scss_1 = (0, tslib_1.__importDefault)(require("./UserOrderTable.scss"));
const Order_1 = require("shared/entities/Order");
const UserOrderTable = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const user = (0, react_redux_1.useSelector)((state) => state.user);
    const { orders } = (0, react_redux_1.useSelector)((state) => state.order);
    react_1.default.useEffect(() => {
        dispatch((0, order_1.getUserOrders)());
    }, [user]);
    if (!orders.length) {
        return null;
    }
    const renderStatus = (order) => {
        switch (order.status) {
            case Order_1.OrderStatus.Approved:
                return 'Подтвержден редактором';
            case Order_1.OrderStatus.Rejected:
                return 'Отклонен редактором';
            case Order_1.OrderStatus.Verified:
                return 'Проверен экспертом';
            default:
                return 'Открыт';
        }
    };
    return (react_1.default.createElement("table", { className: UserOrderTable_scss_1.default.Table },
        react_1.default.createElement("tr", { className: UserOrderTable_scss_1.default.Table__row },
            react_1.default.createElement("th", { className: UserOrderTable_scss_1.default.Table__heading }, "\u041D\u043E\u043C\u0435\u0440"),
            react_1.default.createElement("th", { className: UserOrderTable_scss_1.default.Table__heading }, "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435"),
            react_1.default.createElement("th", { className: UserOrderTable_scss_1.default.Table__heading }, "\u0414\u0430\u0442\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F"),
            react_1.default.createElement("th", { className: UserOrderTable_scss_1.default.Table__heading }, "\u0421\u0442\u0430\u0442\u0443\u0441")),
        orders.map(order => (react_1.default.createElement("tr", { key: order.id },
            react_1.default.createElement("td", { className: UserOrderTable_scss_1.default.Table__item }, order.meta.orderNumber),
            react_1.default.createElement("td", { className: UserOrderTable_scss_1.default.Table__item }, order.name),
            react_1.default.createElement("td", { className: UserOrderTable_scss_1.default.Table__item }, `${new Date(order.createdAt).getDate()}.${new Date(order.createdAt).getMonth()}.${new Date(order.createdAt).getFullYear()}`),
            react_1.default.createElement("td", { className: UserOrderTable_scss_1.default.Table__item }, renderStatus(order)))))));
};
exports.UserOrderTable = UserOrderTable;
