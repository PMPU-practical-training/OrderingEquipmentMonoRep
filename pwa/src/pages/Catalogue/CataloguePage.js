"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CataloguePage = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const CatalogueMenu_1 = require("@components/CatalogueMenu/CatalogueMenu");
const Footer_1 = require("@components/Footer/Footer");
const Header_1 = require("@components/Header/Header");
const Container_1 = require("@ui/Container/Container");
const react_redux_1 = require("react-redux");
const catalogue_1 = require("@store/thunks/catalogue");
const catalogue_2 = require("@store/slices/catalogue");
const CataloguePage = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const catalogue = (0, react_redux_1.useSelector)((state) => state.catalogue);
    react_1.default.useEffect(() => {
        dispatch((0, catalogue_1.getCatalogue)());
    }, []);
    react_1.default.useEffect(() => {
        if (catalogue.groups.length) {
            dispatch(catalogue_2.catalogueSlice.actions.setCurrentGroup(catalogue.groups[0]));
        }
    }, [catalogue.groups]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Header_1.Header, { isInteractive: true }),
        react_1.default.createElement(Container_1.Container, null,
            react_1.default.createElement(CatalogueMenu_1.CatalogueMenu, null)),
        react_1.default.createElement(Footer_1.Footer, null)));
};
exports.CataloguePage = CataloguePage;
