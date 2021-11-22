"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const tslib_1 = require("tslib");
const Service_1 = require("@services/Service");
class SearchService extends Service_1.Service {
    searchByName(name, token) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.get({ url: `product/search/${name}`, token });
        });
    }
}
exports.SearchService = SearchService;
