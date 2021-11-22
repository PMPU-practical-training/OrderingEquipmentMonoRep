"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = exports.ErrorResponse = exports.SuccessResponse = exports.Response = exports.RequestMethod = exports.ResponseStatus = void 0;
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["OK"] = 200] = "OK";
    ResponseStatus[ResponseStatus["BadRequest"] = 400] = "BadRequest";
    ResponseStatus[ResponseStatus["NotFound"] = 404] = "NotFound";
    ResponseStatus[ResponseStatus["Unauthorized"] = 401] = "Unauthorized";
    ResponseStatus[ResponseStatus["Forbidden"] = 403] = "Forbidden";
    ResponseStatus[ResponseStatus["ServerError"] = 500] = "ServerError";
})(ResponseStatus = exports.ResponseStatus || (exports.ResponseStatus = {}));
var RequestMethod;
(function (RequestMethod) {
    RequestMethod["Post"] = "POST";
    RequestMethod["Get"] = "GET";
    RequestMethod["Put"] = "PUT";
    RequestMethod["Patch"] = "PATCH";
    RequestMethod["Delete"] = "DELETE";
})(RequestMethod = exports.RequestMethod || (exports.RequestMethod = {}));
class Response {
    constructor(status) {
        this.status = status;
    }
}
exports.Response = Response;
class SuccessResponse extends Response {
    constructor(status, data) {
        super(status);
        this.status = status;
        this.data = data;
    }
}
exports.SuccessResponse = SuccessResponse;
class ErrorResponse extends Response {
    constructor(status, error) {
        super(status);
        this.status = status;
        this.error = error;
    }
}
exports.ErrorResponse = ErrorResponse;
class Service {
    constructor() {
        this.baseUrl = `http://localhost:3000`;
    }
    methodRequiresBody(method) {
        return method === RequestMethod.Post || method === RequestMethod.Put || method === RequestMethod.Patch;
    }
    getHeaders(params, method) {
        const { headers: headersFromParams, token } = params;
        const headers = new Headers(headersFromParams);
        if (token) {
            headers.append('authorization', `Bearer ${token}`);
        }
        if (this.methodRequiresBody(method)) {
            if (params.isJSON) {
                headers.set('Content-Type', 'application/json');
            }
        }
        return headers;
    }
    getBody(params) {
        const { body, isJSON } = params;
        if (isJSON) {
            return JSON.stringify(body);
        }
        return body;
    }
    getRequestInit(params, method) {
        const requestInit = {};
        requestInit.headers = this.getHeaders(params, method);
        requestInit.method = method;
        requestInit.cache = 'default';
        if (this.methodRequiresBody(method)) {
            requestInit.body = this.getBody(params);
        }
        return requestInit;
    }
    handleRequest(params, method) {
        const requestParams = Object.assign({}, this.defaultParams, params);
        const { url } = requestParams;
        return new Promise((resolve, _) => {
            fetch(`${this.baseUrl}/${url}`, this.getRequestInit(requestParams, method))
                .then(_response => {
                _response
                    .json()
                    .then(body => {
                    let response;
                    if (_response.ok) {
                        response = new SuccessResponse(_response.status, body.data);
                    }
                    else {
                        response = new ErrorResponse(_response.status, body.error);
                    }
                    resolve(response);
                })
                    .catch(error => {
                    console.log(error);
                });
            })
                .catch(error => {
                console.log(error);
            });
        });
    }
    get(params) {
        return this.handleRequest(params, RequestMethod.Get);
    }
    post(params) {
        return this.handleRequest(params, RequestMethod.Post);
    }
    patch(params) {
        return this.handleRequest(params, RequestMethod.Patch);
    }
    put(params) {
        return this.handleRequest(params, RequestMethod.Put);
    }
    delete(params) {
        return this.handleRequest(params, RequestMethod.Delete);
    }
}
exports.Service = Service;
