"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogueMenu = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const Button_1 = (0, tslib_1.__importStar)(require("@ui/Button/Button"));
const react_redux_1 = require("react-redux");
const user_1 = require("@store/slices/user");
const catalogue_1 = require("@store/slices/catalogue");
const react_router_dom_1 = require("react-router-dom");
const CategoryMap_1 = require("./partials/CategoryMap/CategoryMap");
const Sidebar_1 = require("./partials/Sidebar/Sidebar");
const CatalogueMenu_scss_1 = (0, tslib_1.__importDefault)(require("./CatalogueMenu.scss"));
const User_1 = require("shared/entities/User");
const CatalogueMenu = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const history = (0, react_router_dom_1.useHistory)();
    const { loading, groups, currentGroup } = (0, react_redux_1.useSelector)((state) => state.catalogue);
    const { role } = (0, react_redux_1.useSelector)((state) => state.user.data);
    const setCurrentGroup = (group) => {
        dispatch(catalogue_1.catalogueSlice.actions.setCurrentGroup(group));
    };
    if (loading !== user_1.LoadingStatus.Complete) {
        return null;
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        role === User_1.UserRole.Editor && (react_1.default.createElement("div", { className: CatalogueMenu_scss_1.default.CatalogueButtons },
            react_1.default.createElement(Button_1.default, { onClick: () => {
                    history.push('/group/create');
                }, className: CatalogueMenu_scss_1.default.CatalogueButtons__button, theme: Button_1.ButtonTheme.Dark, name: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0433\u0440\u0443\u043F\u043F\u0443 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439" }))),
        react_1.default.createElement("div", { className: CatalogueMenu_scss_1.default.CatalogueMenu },
            react_1.default.createElement(Sidebar_1.Sidebar, { topLevelCategories: groups, onCategoryChange: setCurrentGroup, selectedCategory: currentGroup }),
            currentGroup && react_1.default.createElement(CategoryMap_1.CategoryMap, { group: currentGroup }))));
};
exports.CatalogueMenu = CatalogueMenu;
