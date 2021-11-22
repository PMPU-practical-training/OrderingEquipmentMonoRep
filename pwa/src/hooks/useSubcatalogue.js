"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSubcatalogue = void 0;
const breadcrumbs_1 = require("@store/slices/breadcrumbs");
const catalogue_1 = require("@store/slices/catalogue");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const useSubcatalogue = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const history = (0, react_router_dom_1.useHistory)();
    const { groups, currentGroup } = (0, react_redux_1.useSelector)((state) => state.catalogue);
    const { categoryId } = (0, react_router_dom_1.useParams)();
    const attemptToSetCurrentGroup = () => {
        const groupContainingCategory = groups.find(group => group.categories.find(category => category.id === categoryId));
        if (groupContainingCategory) {
            dispatch(catalogue_1.catalogueSlice.actions.setCurrentGroup(groupContainingCategory));
        }
        else {
            history.push('/');
        }
    };
    const setCurrentCategory = () => {
        if (currentGroup) {
            const category = currentGroup.categories.find(category => category.id === categoryId);
            if (category) {
                dispatch(catalogue_1.catalogueSlice.actions.setCurrentCategory(category));
                dispatch(breadcrumbs_1.breadcrumbsSlice.actions.setBreadcrumbs([
                    {
                        name: currentGroup.name,
                        href: '/',
                    },
                    {
                        name: category.name,
                        href: `/category/${category.id}`,
                    },
                ]));
            }
        }
    };
    return { attemptToSetCurrentGroup, setCurrentCategory };
};
exports.useSubcatalogue = useSubcatalogue;
