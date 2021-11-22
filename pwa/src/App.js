"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const ProtectedRoute_1 = require("@utils/ProtectedRoute");
const user_1 = require("@store/thunks/user");
const User_1 = require("./shared/entities/User");
const AuthPage_1 = require("./pages/Auth/AuthPage");
const CataloguePage_1 = require("./pages/Catalogue/CataloguePage");
const SubcataloguePage_1 = require("./pages/Subcatalogue/SubcataloguePage");
const CategoryPage_1 = require("./pages/Category/CategoryPage");
const ProductPage_1 = require("./pages/Product/ProductPage");
const SearchPage_1 = require("./pages/Search/SearchPage");
const CartPage_1 = require("./pages/Cart/CartPage");
const CreateUserPage_1 = require("./pages/CreateUser/CreateUserPage");
const EditUserPage_1 = require("./pages/EditUser/EditUserPage");
const CreateGroupPage_1 = require("./pages/CreateGroup/CreateGroupPage");
const EditGroupPage_1 = require("./pages/EditGroup/EditGroupPage");
const CreateCategoryPage_1 = require("./pages/CreateCategory/CreateCategoryPage");
const EditCategoryPage_1 = require("./pages/EditCategory/EditCategoryPage");
const CreateSubcategoryPage_1 = require("./pages/CreateSubcategory/CreateSubcategoryPage");
const EditSubcategoryPage_1 = require("./pages/EditSubcategory/EditSubcategoryPage");
const CreateProductPage_1 = require("./pages/CreateProductPage/CreateProductPage");
const EditProductPage_1 = require("./pages/EditProductPage/EditProductPage");
const ProfilePage_1 = require("./pages/Profile/ProfilePage");
const App = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    react_1.default.useEffect(() => {
        dispatch((0, user_1.verifyToken)());
    }, []);
    return (react_1.default.createElement(react_router_dom_1.Switch, null,
        react_1.default.createElement(ProtectedRoute_1.ProtectedRoute, { exact: true, path: "/", redirectRoute: "/auth", allowedUserRoles: [User_1.UserRole.Admin, User_1.UserRole.Editor, User_1.UserRole.Expert, User_1.UserRole.Purchaser], component: CataloguePage_1.CataloguePage }),
        react_1.default.createElement(ProtectedRoute_1.ProtectedRoute, { exact: true, path: "/user", redirectRoute: "/auth", allowedUserRoles: [User_1.UserRole.Admin, User_1.UserRole.Editor, User_1.UserRole.Expert, User_1.UserRole.Purchaser], component: ProfilePage_1.ProfilePage }),
        react_1.default.createElement(ProtectedRoute_1.ProtectedRoute, { exact: true, path: "/category/:categoryId", redirectRoute: "/auth", allowedUserRoles: [User_1.UserRole.Admin, User_1.UserRole.Editor, User_1.UserRole.Expert, User_1.UserRole.Purchaser], component: SubcataloguePage_1.SubcataloguePage }),
        react_1.default.createElement(ProtectedRoute_1.ProtectedRoute, { exact: true, path: "/category/:categoryId/subcategory/:subcategoryId", redirectRoute: "/auth", allowedUserRoles: [User_1.UserRole.Admin, User_1.UserRole.Editor, User_1.UserRole.Expert, User_1.UserRole.Purchaser], component: CategoryPage_1.CategoryPage }),
        react_1.default.createElement(ProtectedRoute_1.ProtectedRoute, { exact: true, path: "/category/:categoryId/subcategory/:subcategoryId/product/create", redirectRoute: "/auth", allowedUserRoles: [User_1.UserRole.Editor, User_1.UserRole.Purchaser, User_1.UserRole.Expert, User_1.UserRole.Admin], component: CreateProductPage_1.CreateProductPage }),
        react_1.default.createElement(ProtectedRoute_1.ProtectedRoute, { exact: true, path: "/category/:categoryId/subcategory/:subcategoryId/product/:productId", redirectRoute: "/auth", allowedUserRoles: [User_1.UserRole.Admin, User_1.UserRole.Editor, User_1.UserRole.Expert, User_1.UserRole.Purchaser], component: ProductPage_1.ProductPage }),
        react_1.default.createElement(ProtectedRoute_1.ProtectedRoute, { exact: true, path: "/category/:categoryId/subcategory/:subcategoryId/product/:productId/edit", redirectRoute: "/auth", allowedUserRoles: [User_1.UserRole.Admin, User_1.UserRole.Editor, User_1.UserRole.Expert, User_1.UserRole.Purchaser], component: EditProductPage_1.EditProductPage }),
        react_1.default.createElement(ProtectedRoute_1.ProtectedRoute, { exact: true, path: "/search/:query", redirectRoute: "/auth", allowedUserRoles: [User_1.UserRole.Admin, User_1.UserRole.Editor, User_1.UserRole.Expert, User_1.UserRole.Purchaser], component: SearchPage_1.SearchPage }),
        react_1.default.createElement(ProtectedRoute_1.ProtectedRoute, { exact: true, path: "/cart", redirectRoute: "/auth", allowedUserRoles: [User_1.UserRole.Admin, User_1.UserRole.Editor, User_1.UserRole.Expert, User_1.UserRole.Purchaser], component: CartPage_1.CartPage }),
        react_1.default.createElement(ProtectedRoute_1.ProtectedRoute, { exact: true, path: "/user/create", redirectRoute: "/auth", allowedUserRoles: [User_1.UserRole.Admin], component: CreateUserPage_1.CreateUserPage }),
        react_1.default.createElement(ProtectedRoute_1.ProtectedRoute, { exact: true, path: "/user/:userId/edit", redirectRoute: "/auth", allowedUserRoles: [User_1.UserRole.Admin], component: EditUserPage_1.EditUserPage }),
        react_1.default.createElement(ProtectedRoute_1.ProtectedRoute, { exact: true, path: "/group/create", redirectRoute: "/auth", allowedUserRoles: [User_1.UserRole.Editor], component: CreateGroupPage_1.CreateGroupPage }),
        react_1.default.createElement(ProtectedRoute_1.ProtectedRoute, { exact: true, path: "/group/:categoryId/edit", redirectRoute: "/auth", allowedUserRoles: [User_1.UserRole.Editor], component: EditGroupPage_1.EditGroupPage }),
        react_1.default.createElement(ProtectedRoute_1.ProtectedRoute, { exact: true, path: "/group/:categoryId/category/create", redirectRoute: "/auth", allowedUserRoles: [User_1.UserRole.Editor], component: CreateCategoryPage_1.CreateCategoryPage }),
        react_1.default.createElement(ProtectedRoute_1.ProtectedRoute, { exact: true, path: "/group/:groupId/category/:categoryId/edit", redirectRoute: "/auth", allowedUserRoles: [User_1.UserRole.Editor], component: EditCategoryPage_1.EditCategoryPage }),
        react_1.default.createElement(ProtectedRoute_1.ProtectedRoute, { exact: true, path: "/group/:groupId/category/:categoryId/subcategory/create", redirectRoute: "/auth", allowedUserRoles: [User_1.UserRole.Editor], component: CreateSubcategoryPage_1.CreateSubcategoryPage }),
        react_1.default.createElement(ProtectedRoute_1.ProtectedRoute, { exact: true, path: "/group/:groupId/category/:categoryId/subcategory/:subcategoryId/edit", redirectRoute: "/auth", allowedUserRoles: [User_1.UserRole.Editor], component: EditSubcategoryPage_1.EditSubcategoryPage }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/auth", component: AuthPage_1.AuthPage })));
};
exports.App = App;
