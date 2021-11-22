"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const debounce_1 = (0, tslib_1.__importDefault)(require("lodash/debounce"));
const Sidebar_scss_1 = (0, tslib_1.__importDefault)(require("./Sidebar.scss"));
let kek = false;
let threshold = -2;
const Sidebar = ({ topLevelCategories, selectedCategory, onCategoryChange }) => {
    const sidebarRef = react_1.default.useRef(null);
    const mousePosition = react_1.default.useRef({ x: 0, prevX: 0 });
    const categoryToSelectRef = react_1.default.useRef({ category: null });
    const handleMouseMoveStopRef = react_1.default.useRef((0, debounce_1.default)(() => {
        if (categoryToSelectRef.current.category) {
            onCategoryChange(categoryToSelectRef.current.category);
        }
        threshold = -2;
    }, 100));
    const resetTresholdRef = react_1.default.useRef((0, debounce_1.default)(() => {
        if (kek) {
            return;
        }
        threshold = -2;
    }, 100));
    const handleSidebarMouseMove = (event) => {
        handleMouseMoveStopRef.current();
        if (mousePosition.current.x === event.clientX) {
            return;
        }
        mousePosition.current.prevX = mousePosition.current.x;
        mousePosition.current.x = event.clientX;
        if (mousePosition.current.x - mousePosition.current.prevX >= 0) {
            kek = true;
            threshold = 2;
            setTimeout(() => {
                if (mousePosition.current.x - mousePosition.current.prevX <= 1) {
                    threshold = -2;
                }
                kek = false;
            }, 25);
        }
    };
    const handleSidebarMouseLeave = (event) => {
        mousePosition.current.prevX = event.clientX;
        mousePosition.current.x = event.clientX;
        categoryToSelectRef.current.category = null;
    };
    const getMouseDirection = () => mousePosition.current.prevX - mousePosition.current.x;
    const handleCategoryMouseEnter = (category) => {
        const direction = getMouseDirection();
        if (direction >= threshold) {
            onCategoryChange(category);
            categoryToSelectRef.current.category = null;
            resetTresholdRef.current();
        }
        else {
            categoryToSelectRef.current.category = category;
        }
    };
    return (react_1.default.createElement("div", { className: Sidebar_scss_1.default.Sidebar, ref: sidebarRef, onMouseMove: handleSidebarMouseMove, onMouseLeave: handleSidebarMouseLeave }, topLevelCategories.map((category, index) => (react_1.default.createElement("div", { key: category.name + index, className: `${Sidebar_scss_1.default.Sidebar__item} ${selectedCategory && category.name === selectedCategory.name ? Sidebar_scss_1.default.isActive : ''}`, onMouseEnter: () => handleCategoryMouseEnter(category) },
        react_1.default.createElement("span", null, category.name))))));
};
exports.Sidebar = Sidebar;
