"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const tslib_1 = require("tslib");
const Service_1 = require("../Service");
class CategoryService extends Service_1.Service {
    getProducts(path, token, params) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const { categoryId } = path;
            const { filters, page, inPage } = params;
            const url = `group/${categoryId}/products?`;
            const urlParams = new URLSearchParams();
            if (filters) {
                urlParams.append('filters', encodeURIComponent(JSON.stringify(filters)));
            }
            if (page !== null) {
                urlParams.append('page', page.toString());
            }
            if (inPage) {
                urlParams.append('limit', inPage.toString());
            }
            return this.get({
                url: `${url}${urlParams.toString()}`,
                token,
            });
        });
    }
}
exports.CategoryService = CategoryService;
