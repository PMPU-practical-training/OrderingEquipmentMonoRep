"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryMap = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const Category_1 = require("../Category/Category");
const CategoryMap_scss_1 = (0, tslib_1.__importDefault)(require("./CategoryMap.scss"));
const react_redux_1 = require("react-redux");
const User_1 = require("shared/entities/User");
const Button_1 = (0, tslib_1.__importStar)(require("@ui/Button/Button"));
const react_router_dom_1 = require("react-router-dom");
const catalogue_1 = require("@store/thunks/catalogue");
const CategoryMap = ({ group }) => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const history = (0, react_router_dom_1.useHistory)();
    const { role } = (0, react_redux_1.useSelector)((state) => state.user.data);
    const { currentGroup } = (0, react_redux_1.useSelector)((state) => state.catalogue);
    const handleDeleteGroup = () => {
        if (currentGroup &&
            window.confirm('Удаление группы подвлечет за собой удаление всех ее категорий. Вы уверены, что хотите удалить группу?')) {
            dispatch((0, catalogue_1.deleteGroup)(currentGroup.id));
        }
    };
    return (react_1.default.createElement("div", { className: CategoryMap_scss_1.default.CategoryMap },
        react_1.default.createElement("div", { className: CategoryMap_scss_1.default.CategoryMap__top },
            react_1.default.createElement("div", { className: CategoryMap_scss_1.default.CategoryMap__title }, group.name),
            role === User_1.UserRole.Editor && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(Button_1.default, { onClick: () => {
                        if (currentGroup) {
                            history.push(`/group/${currentGroup.id}/edit`);
                        }
                    }, className: CategoryMap_scss_1.default.CategoryMap__action, theme: Button_1.ButtonTheme.Light, name: "\u041F\u0440\u0430\u0432\u0438\u0442\u044C \u0433\u0440\u0443\u043F\u043F\u0443" }),
                react_1.default.createElement(Button_1.default, { onClick: () => {
                        handleDeleteGroup();
                    }, className: CategoryMap_scss_1.default.CategoryMap__action, theme: Button_1.ButtonTheme.Light, name: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0433\u0440\u0443\u043F\u043F\u0443" }),
                react_1.default.createElement(Button_1.default, { onClick: () => {
                        if (currentGroup) {
                            history.push(`/group/${currentGroup.id}/category/create`);
                        }
                    }, className: CategoryMap_scss_1.default.CategoryMap__action, theme: Button_1.ButtonTheme.Dark, name: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E" })))),
        group.categories.map((category, index) => (react_1.default.createElement(Category_1.Category, Object.assign({ groupId: group.id, key: category.name + index }, category))))));
};
exports.CategoryMap = CategoryMap;
