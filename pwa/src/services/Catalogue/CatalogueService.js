"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogueService = void 0;
const tslib_1 = require("tslib");
const Service_1 = require("@services/Service");
class CatalogueService extends Service_1.Service {
    getCatalogue(token) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.get({ url: 'group', token });
        });
    }
    createGroup(groupName, token) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.post({ url: 'group', body: { name: groupName }, isJSON: true, token });
        });
    }
    updateGroup(groupId, name, token) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.put({ url: `group/${groupId}`, body: { name }, isJSON: true, token });
        });
    }
    deleteGroup(groupId, token) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.delete({ url: `group/${groupId}`, token });
        });
    }
    createCategory(groupId, categoryName, token) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.post({ url: `group/${groupId}/category`, body: { name: categoryName }, isJSON: true, token });
        });
    }
    updateCategory(categoryId, name, token) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.put({ url: `group/${categoryId}`, body: { name }, isJSON: true, token });
        });
    }
    deleteCategory(categoryId, token) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.delete({ url: `group/${categoryId}`, token });
        });
    }
    createSubcategory(groupId, categoryId, body, token) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.post({ url: `group/${groupId}/category/${categoryId}/subcategory`, body, isJSON: true, token });
        });
    }
    updateSubcategory(categoryId, body, token) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.put({ url: `group/${categoryId}`, body, isJSON: true, token });
        });
    }
    deleteSubcategory(categoryId, token) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.delete({ url: `group/${categoryId}`, token });
        });
    }
    createProduct(groupId, categoryId, subcategoryId, body, token) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.post({
                url: `group/${groupId}/category/${categoryId}/subcategory/${subcategoryId}/product`,
                body,
                isJSON: true,
                token,
            });
        });
    }
}
exports.CatalogueService = CatalogueService;
