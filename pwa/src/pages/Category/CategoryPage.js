"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryPage = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importStar)(require("react"));
const Breadcrumbs_1 = require("@components/Breadcrumbs/Breadcrumbs");
const Filters_1 = require("@components/Filters/Filters");
const Footer_1 = require("@components/Footer/Footer");
const Header_1 = require("@components/Header/Header");
const Container_1 = require("@ui/Container/Container");
const react_redux_1 = require("react-redux");
const Product_1 = require("@components/Product/Product");
const react_router_dom_1 = require("react-router-dom");
const category_1 = require("@store/slices/category");
const category_2 = require("@store/thunks/category");
const catalogue_1 = require("@store/slices/catalogue");
const breadcrumbs_1 = require("@store/slices/breadcrumbs");
const user_1 = require("@store/slices/user");
const catalogue_2 = require("@store/thunks/catalogue");
const User_1 = require("shared/entities/User");
const CategoryPage_scss_1 = (0, tslib_1.__importDefault)(require("./CategoryPage.scss"));
const Button_1 = (0, tslib_1.__importStar)(require("@ui/Button/Button"));
const CategoryPage = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const history = (0, react_router_dom_1.useHistory)();
    const { groups, currentGroup, currentCategory, currentSubcategory } = (0, react_redux_1.useSelector)((state) => state.catalogue);
    const { products, loading, filters, inPage, page } = (0, react_redux_1.useSelector)((state) => state.category);
    const { role } = (0, react_redux_1.useSelector)((state) => state.user.data);
    const { categoryId, subcategoryId } = (0, react_router_dom_1.useParams)();
    const { search, pathname } = (0, react_router_dom_1.useLocation)();
    (0, react_1.useEffect)(() => {
        if (!groups.length && loading === user_1.LoadingStatus.Initial) {
            dispatch((0, catalogue_2.getCatalogue)());
        }
        if (!currentGroup && groups.length) {
            const groupContainingCategory = groups.find(group => group.categories.find(category => category.id === categoryId));
            if (groupContainingCategory) {
                dispatch(catalogue_1.catalogueSlice.actions.setCurrentGroup(groupContainingCategory));
            }
            else {
                history.push('/');
            }
        }
        if (currentGroup && !currentCategory) {
            const categoryContainingSubcategory = currentGroup.categories.find(category => category.id === categoryId);
            if (categoryContainingSubcategory) {
                dispatch(catalogue_1.catalogueSlice.actions.setCurrentCategory(categoryContainingSubcategory));
            }
            else {
                history.push('/');
            }
        }
        if (currentGroup && currentCategory) {
            const currentSubcategory = currentCategory.subcategories.find(subcategory => subcategory.id === subcategoryId);
            if (currentSubcategory) {
                dispatch(breadcrumbs_1.breadcrumbsSlice.actions.setBreadcrumbs([
                    {
                        name: currentGroup.name,
                        href: '/',
                    },
                    {
                        name: currentCategory.name,
                        href: `/category/${currentCategory.id}`,
                    },
                    {
                        name: currentSubcategory.name,
                        href: `/category/${currentCategory.id}/subcategory/${currentSubcategory.id}`,
                    },
                ]));
                dispatch(catalogue_1.catalogueSlice.actions.setCurrentSubcategory(currentSubcategory));
            }
            else {
                history.push('/');
            }
        }
    }, [groups, currentGroup, currentCategory]);
    (0, react_1.useEffect)(() => {
        const params = new URLSearchParams(search);
        const urlPage = params.get('page') || null;
        const urlInPage = params.get('inPage') || null;
        const urlFilters = params.get('filters') || null;
        if (urlPage) {
            dispatch(category_1.categorySlice.actions.setPage(urlPage));
        }
        if (urlInPage) {
            dispatch(category_1.categorySlice.actions.setInPage(urlInPage));
        }
        if (urlFilters) {
            dispatch(category_1.categorySlice.actions.setFilters(JSON.parse(decodeURIComponent(urlFilters))));
        }
    }, []);
    (0, react_1.useEffect)(() => {
        var _a;
        const params = new URLSearchParams(search);
        if (page) {
            params.set('page', page.toString());
        }
        if ((filters === null || filters === void 0 ? void 0 : filters.price) || ((_a = filters === null || filters === void 0 ? void 0 : filters.specifications) === null || _a === void 0 ? void 0 : _a.length)) {
            params.set('filters', encodeURIComponent(JSON.stringify(filters)));
        }
        else {
            params.delete('filters');
        }
        if (currentCategory) {
            dispatch((0, category_2.getProducts)({
                subcategoryId,
                categoryId: currentCategory.id,
                params: {
                    page,
                    inPage,
                    filters,
                },
            }));
        }
        if (params.toString() !== new URLSearchParams(search).toString()) {
            history.push({
                pathname,
                search: params.toString(),
            });
        }
    }, [currentCategory, page, inPage, filters]);
    const handleDeleteSubcategory = () => {
        if (window.confirm('Удаление подкатегории повлечет за собой удаление всех ее товаров. Вы уверены, что хотите удалить подкатегорию?')) {
            if (currentSubcategory) {
                dispatch((0, catalogue_2.deleteSubcategory)(currentSubcategory.id));
            }
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Header_1.Header, { isInteractive: true }),
        react_1.default.createElement(Container_1.Container, null,
            react_1.default.createElement("div", { className: CategoryPage_scss_1.default.Breadcrumbs },
                react_1.default.createElement(Breadcrumbs_1.Breadcrumbs, null)),
            react_1.default.createElement("div", { className: CategoryPage_scss_1.default.Actions }, role === User_1.UserRole.Editor && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(Button_1.default, { onClick: () => {
                        if (currentGroup && currentCategory && currentSubcategory) {
                            history.push(`/group/${currentGroup.id}/category/${currentCategory.id}/subcategory/${currentSubcategory.id}/edit`);
                        }
                    }, className: CategoryPage_scss_1.default.Category__action, theme: Button_1.ButtonTheme.Light, name: "\u041F\u0440\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u0434\u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E" }),
                react_1.default.createElement(Button_1.default, { onClick: handleDeleteSubcategory, className: CategoryPage_scss_1.default.Category__action, theme: Button_1.ButtonTheme.Light, name: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u043E\u0434\u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E" }),
                react_1.default.createElement(Button_1.default, { onClick: () => {
                        if (currentGroup && currentCategory && currentSubcategory) {
                            history.push(`/category/${currentCategory.id}/subcategory/${currentSubcategory.id}/product/create`);
                        }
                    }, className: CategoryPage_scss_1.default.Category__action, theme: Button_1.ButtonTheme.Dark, name: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u0437\u0438\u0446\u0438\u044E" })))),
            react_1.default.createElement("div", { className: CategoryPage_scss_1.default.Main },
                react_1.default.createElement(Filters_1.Filters, null),
                react_1.default.createElement("div", { className: CategoryPage_scss_1.default.Products__container }, products.map(product => (react_1.default.createElement(Product_1.Product, { key: product.id, product: product })))))),
        react_1.default.createElement(Footer_1.Footer, null)));
};
exports.CategoryPage = CategoryPage;
