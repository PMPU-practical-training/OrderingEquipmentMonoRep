"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubcatalogueMenu = void 0;
const tslib_1 = require("tslib");
const Button_1 = (0, tslib_1.__importStar)(require("@ui/Button/Button"));
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const Category_1 = require("@components/CatalogueMenu/partials/Category/Category");
const Breadcrumbs_1 = require("@components/Breadcrumbs/Breadcrumbs");
const react_redux_1 = require("react-redux");
const SubcatalogueMenu_scss_1 = (0, tslib_1.__importDefault)(require("./SubcatalogueMenu.scss"));
const react_router_dom_1 = require("react-router-dom");
const catalogue_1 = require("@store/thunks/catalogue");
const User_1 = require("shared/entities/User");
const SubcatalogueMenu = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const history = (0, react_router_dom_1.useHistory)();
    const { currentGroup, currentCategory } = (0, react_redux_1.useSelector)((state) => state.catalogue);
    const { role } = (0, react_redux_1.useSelector)((state) => state.user.data);
    const handleDeleteCategory = () => {
        if (currentCategory &&
            window.confirm('Удаление категории подвлечет за собой удаление всех ее подкатегорий и товаров. Вы уверены, что хотите удалить категорию?')) {
            dispatch((0, catalogue_1.deleteCategory)(currentCategory.id));
        }
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { className: SubcatalogueMenu_scss_1.default.Subcatalogue__meta },
            react_1.default.createElement(Breadcrumbs_1.Breadcrumbs, null),
            react_1.default.createElement("div", { className: SubcatalogueMenu_scss_1.default.SubcatalogueButtons }, role === User_1.UserRole.Editor && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(Button_1.default, { onClick: () => {
                        if (currentGroup && currentCategory) {
                            history.push(`/group/${currentGroup.id}/category/${currentCategory.id}/edit`);
                        }
                    }, className: SubcatalogueMenu_scss_1.default.SubcatalogueButtons__button, theme: Button_1.ButtonTheme.Light, name: "\u041F\u0440\u0430\u0432\u0438\u0442\u044C \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E" }),
                react_1.default.createElement(Button_1.default, { onClick: handleDeleteCategory, className: SubcatalogueMenu_scss_1.default.SubcatalogueButtons__button, theme: Button_1.ButtonTheme.Light, name: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E" }),
                react_1.default.createElement(Button_1.default, { onClick: () => {
                        if (currentGroup && currentCategory) {
                            history.push(`/group/${currentGroup.id}/category/${currentCategory.id}/subcategory/create`);
                        }
                    }, className: SubcatalogueMenu_scss_1.default.SubcatalogueButtons__button, theme: Button_1.ButtonTheme.Dark, name: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043F\u043E\u0434\u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E" }))))),
        currentCategory && react_1.default.createElement(Category_1.Category, Object.assign({}, currentCategory))));
};
exports.SubcatalogueMenu = SubcatalogueMenu;
