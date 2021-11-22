"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryPage = void 0;
const tslib_1 = require("tslib");
const CreateCategoryForm_1 = require("@components/CreateCategoryForm/CreateCategoryForm");
const Footer_1 = require("@components/Footer/Footer");
const Header_1 = require("@components/Header/Header");
const useSubcatalogue_1 = require("@hooks/useSubcatalogue");
const user_1 = require("@store/slices/user");
const catalogue_1 = require("@store/thunks/catalogue");
const Container_1 = require("@ui/Container/Container");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const CreateCategoryPage = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const { attemptToSetCurrentGroup } = (0, useSubcatalogue_1.useSubcatalogue)();
    const { groups, currentGroup, loading } = (0, react_redux_1.useSelector)((state) => state.catalogue);
    const { categoryId } = (0, react_router_dom_1.useParams)();
    react_1.default.useEffect(() => {
        if (!groups.length && loading === user_1.LoadingStatus.Initial) {
            dispatch((0, catalogue_1.getCatalogue)());
        }
    }, []);
    if (!categoryId) {
        return react_1.default.createElement(react_router_dom_1.Redirect, { to: "/" });
    }
    if (!currentGroup && groups.length) {
        attemptToSetCurrentGroup();
    }
    if (loading === user_1.LoadingStatus.Ongoing) {
        return react_1.default.createElement("h1", null, "Loading...");
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Header_1.Header, { isInteractive: true }),
        react_1.default.createElement(Container_1.Container, null,
            react_1.default.createElement(CreateCategoryForm_1.CreateCategoryForm, null)),
        react_1.default.createElement(Footer_1.Footer, null)));
};
exports.CreateCategoryPage = CreateCategoryPage;
