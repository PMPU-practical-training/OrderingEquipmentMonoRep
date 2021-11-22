"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorOrderList = void 0;
const tslib_1 = require("tslib");
const order_1 = require("@store/thunks/order");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_redux_1 = require("react-redux");
const Link_1 = require("@ui/Link/Link");
const product_1 = require("@store/thunks/product");
const EditorOrderList_scss_1 = (0, tslib_1.__importDefault)(require("./EditorOrderList.scss"));
const Order_1 = require("shared/entities/Order");
const EditorOrderList = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const user = (0, react_redux_1.useSelector)((state) => state.user);
    const { orders } = (0, react_redux_1.useSelector)((state) => state.order);
    const { products } = (0, react_redux_1.useSelector)((state) => state.product);
    react_1.default.useEffect(() => {
        dispatch((0, order_1.getEditorOrders)());
        dispatch((0, product_1.getAllProducts)());
    }, [user]);
    if (!orders.length && !products.length) {
        return null;
    }
    const pendingOrders = orders.filter(order => order.status === Order_1.OrderStatus.Pending);
    return (react_1.default.createElement(react_1.default.Fragment, null, pendingOrders && (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h1", { className: EditorOrderList_scss_1.default.Label }, "\u0417\u0430\u044F\u0432\u043A\u0438, \u0442\u0440\u0435\u0431\u0443\u044E\u0449\u0438\u0435 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438"),
        react_1.default.createElement("div", { className: EditorOrderList_scss_1.default.List }, pendingOrders.map(pendingOrder => (react_1.default.createElement("div", { key: pendingOrder.id, className: EditorOrderList_scss_1.default.List__item },
            react_1.default.createElement("div", { className: EditorOrderList_scss_1.default.List__left },
                react_1.default.createElement("div", { className: EditorOrderList_scss_1.default.List__itemName },
                    pendingOrder.name,
                    react_1.default.createElement(Link_1.Link, { name: "(\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442)", className: EditorOrderList_scss_1.default.List__itemAction, onClick: () => dispatch((0, order_1.getDocument)(pendingOrder.id)) })),
                pendingOrder.products.map((orderProduct, index) => (react_1.default.createElement(Link_1.Link, { key: orderProduct.id, href: `/category/${orderProduct.breadcrumbs[1].id}/subcategory/${orderProduct.breadcrumbs[2].id}/product/${orderProduct.id}`, name: `${index + 1}. ${orderProduct.name} (${orderProduct.quantity} ед.)`, style: { fontSize: '14px', paddingLeft: '8px' } })))),
            react_1.default.createElement("div", { className: EditorOrderList_scss_1.default.List__itemActions },
                react_1.default.createElement(Link_1.Link, { name: "\u041F\u043E\u0434\u0432\u0435\u0440\u0434\u0438\u0442\u044C", className: EditorOrderList_scss_1.default.List__itemAction, onClick: () => { } }),
                react_1.default.createElement(Link_1.Link, { name: "\u041E\u0442\u043A\u043B\u043E\u043D\u0438\u0442\u044C", className: EditorOrderList_scss_1.default.List__itemAction, onClick: () => { } }))))))))));
};
exports.EditorOrderList = EditorOrderList;
