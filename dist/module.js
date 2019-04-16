define(["app/core/app_events","app/core/core_module","app/core/utils/datemath","app/plugins/sdk","lodash","react"], function(__WEBPACK_EXTERNAL_MODULE_grafana_app_core_app_events__, __WEBPACK_EXTERNAL_MODULE_grafana_app_core_core_module__, __WEBPACK_EXTERNAL_MODULE_grafana_app_core_utils_datemath__, __WEBPACK_EXTERNAL_MODULE_grafana_app_plugins_sdk__, __WEBPACK_EXTERNAL_MODULE_lodash__, __WEBPACK_EXTERNAL_MODULE_react__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./module.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./datasource.ts":
/*!***********************!*\
  !*** ./datasource.ts ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var grafana_app_core_utils_datemath__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! grafana/app/core/utils/datemath */ "grafana/app/core/utils/datemath");
/* harmony import */ var grafana_app_core_utils_datemath__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(grafana_app_core_utils_datemath__WEBPACK_IMPORTED_MODULE_1__);
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};


var InfluxDatasource = /** @class */ (function () {
    /** @ngInject */
    function InfluxDatasource(instanceSettings, backendSrv, templateSrv) {
        this.backendSrv = backendSrv;
        this.templateSrv = templateSrv;
        this.type = 'influxdb-flux';
        this.url = instanceSettings.url.trim();
        this.username = instanceSettings.username;
        this.password = instanceSettings.password;
        this.name = instanceSettings.name;
        this.basicAuth = instanceSettings.basicAuth;
        this.withCredentials = instanceSettings.withCredentials;
        this.interval = (instanceSettings.jsonData || {}).timeInterval;
        this.bucket = (instanceSettings.jsonData || {}).bucket;
        this.supportAnnotations = true;
        this.supportMetrics = true;
        this.headers = { 'Content-Type': 'application/json' };
        if (typeof instanceSettings.basicAuth === 'string' && instanceSettings.basicAuth.length > 0) {
            this.headers['Authorization'] = instanceSettings.basicAuth;
        }
    }
    InfluxDatasource.prototype.prepareQueryTarget = function (target, options) {
        // Replace grafana variables
        var timeFilter = this.getTimeFilter(options);
        options.scopedVars.range = { value: timeFilter };
        var interpolated = this.templateSrv.replace(target.query, options.scopedVars, 'pipe');
        return __assign({}, target, { query: interpolated });
    };
    InfluxDatasource.prototype.query = function (options) {
        var _this = this;
        var queryTargets = options.targets;
        console.log('query option', options);
        //   .filter(target => target.query)
        //   .map(target => this.prepareQueryTarget(target, options));
        if (queryTargets.length === 0) {
            return Promise.resolve({ data: [] });
        }
        var queries = queryTargets.map(function (target) {
            var query = target.query, resultFormat = target.resultFormat;
            if (resultFormat === 'table') {
                return _this._seriesQuery(query, options)
                    .then(function (response) { return response.data; });
            }
            else {
                return _this._seriesQuery(query, options)
                    .then(function (response) { return response.data; });
            }
        });
        return Promise.all(queries).then(function (series) {
            return { data: series };
        });
    };
    //   annotationQuery(options) {
    //     if (!options.annotation.query) {
    //       return Promise.reject({
    //         message: 'Query missing in annotation definition',
    //       });
    //     }
    //     const {query} = options.annotation;
    //     const queryOptions = {
    //       scopedVars: {},
    //       ...options,
    //       silent: true,
    //     };
    //     const target = this.prepareQueryTarget({query}, queryOptions);
    //     return this._seriesQuery(target.query, queryOptions).then(response => {
    //       const results = parseResults(response.data);
    //       if (results.length === 0) {
    //         throw {message: 'No results in response from InfluxDB'};
    //       }
    //       const annotations = _.flatten(
    //         results.map(result => getAnnotationsFromResult(result, options.annotation))
    //       );
    //       return annotations;
    //     });
    //   }
    //   metricFindQuery(query: string, options?: any) {
    //     const interpreted = expandMacros(query);
    //     // Use normal querier in silent mode
    //     const queryOptions = {
    //       rangeRaw: {to: 'now', from: 'now - 1h'},
    //       scopedVars: {},
    //       ...options,
    //       silent: true,
    //     };
    //     const target = this.prepareQueryTarget({query: interpreted}, queryOptions);
    //     return this._seriesQuery(target.query, queryOptions).then(response => {
    //       const results = parseResults(response.data);
    //       const values = _.uniq(_.flatten(results.map(getValuesFromResult)));
    //       return values
    //         .filter(value => value && value[0] !== '_') // Ignore internal fields
    //         .map(value => ({text: value}));
    //     });
    //   }
    InfluxDatasource.prototype._seriesQuery = function (query, options) {
        // if (!query) {
        //   return Promise.resolve({data: ''});
        // }
        var url = '/collections';
        if (query.collection && query.query) {
            if (query.query === 'Facets') {
                url = url + "/" + query.collection + "/facets";
            }
            else if (query.query === 'Queries') {
                url = url + "/" + query.collection + "/bookmarks";
            }
        }
        return this._emmaQuery(query, url, options);
    };
    InfluxDatasource.prototype._emmaQuery = function (query, url, options) {
        return this._emmaRequest('GET', url, query, options);
    };
    InfluxDatasource.prototype.doRequest = function (options) {
        options.withCredentials = this.withCredentials;
        options.headers = this.headers;
        return this.backendSrv.datasourceRequest(options);
    };
    InfluxDatasource.prototype.testDatasource = function () {
        //const query: Query = {};
        // if (this.bucket.indexOf('/') < 0) {
        //   return Promise.resolve({
        //     status: 'error',
        //     message: 'The bucket is missing a retention policy',
        //   });
        // }
        // return this._emmaRequest('POST', '/grafana/query', query)
        //   .then(res => {
        //     if (res && res.data && res.data.trim()) {
        //       return {
        //         status: 'success',
        //         message: 'Data source connected and database found.',
        //       };
        //     }
        //     return {
        //       status: 'error',
        //       message:
        //         'Data source connected, but has no data. Verify the "bucket" field and make sure the bucket has data.',
        //     };
        //   })
        //   .catch(err => {
        //     return {status: 'error', message: err.message};
        //   });
        return this.doRequest({
            url: this.url + "/",
            method: "GET",
        }).then(function (response) {
            console.log(response);
            if (response.status === 200) {
                return {
                    status: "success",
                    message: "Data source is working",
                    title: "Success"
                };
            }
            return {
                status: "error",
                message: "Data source is not working",
                title: "Error"
            };
        });
    };
    InfluxDatasource.prototype._emmaRequest = function (method, url, query, options) {
        var params = {};
        if (this.username) {
            params.u = this.username;
            params.p = this.password;
        }
        var req = {
            method: method,
            url: this.url + url,
            params: params,
            data: query,
            precision: 'ms',
            inspect: { type: this.type },
        };
        req.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        if (this.basicAuth || this.withCredentials) {
            req.withCredentials = true;
        }
        if (this.basicAuth) {
            req.headers.Authorization = this.basicAuth;
        }
        return this.backendSrv.datasourceRequest(req).then(function (result) {
            console.log("response", result);
            return result;
        }, function (err) {
            if (err.status !== 0 || err.status >= 300) {
                if (err.data && err.data.error) {
                    throw {
                        message: 'InfluxDB Error: ' + err.data.error,
                        data: err.data,
                        config: err.config,
                    };
                }
                else {
                    throw {
                        message: 'Network Error: ' + err.statusText + '(' + err.status + ')',
                        data: err.data,
                        config: err.config,
                    };
                }
            }
        });
    };
    InfluxDatasource.prototype.getTimeFilter = function (options) {
        var from = this.getInfluxTime(options.rangeRaw.from, false);
        var to = this.getInfluxTime(options.rangeRaw.to, true);
        if (to === 'now') {
            return "start: " + from;
        }
        return "start: " + from + ", stop: " + to;
    };
    InfluxDatasource.prototype.getInfluxTime = function (date, roundUp) {
        if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isString(date)) {
            if (date === 'now') {
                return date;
            }
            var parts = /^now\s*-\s*(\d+)([d|h|m|s])$/.exec(date);
            if (parts) {
                var amount = parseInt(parts[1]);
                var unit = parts[2];
                return '-' + amount + unit;
            }
            date = grafana_app_core_utils_datemath__WEBPACK_IMPORTED_MODULE_1__["parse"](date, roundUp);
        }
        return date.toISOString();
    };
    return InfluxDatasource;
}());
/* harmony default export */ __webpack_exports__["default"] = (InfluxDatasource);


/***/ }),

/***/ "./module.ts":
/*!*******************!*\
  !*** ./module.ts ***!
  \*******************/
/*! exports provided: Datasource, QueryCtrl, ConfigCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigCtrl", function() { return InfluxConfigCtrl; });
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datasource */ "./datasource.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Datasource", function() { return _datasource__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _query_ctrl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query_ctrl */ "./query_ctrl.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QueryCtrl", function() { return _query_ctrl__WEBPACK_IMPORTED_MODULE_1__["InfluxFluxQueryCtrl"]; });



var InfluxConfigCtrl = /** @class */ (function () {
    function InfluxConfigCtrl() {
    }
    InfluxConfigCtrl.templateUrl = 'partials/config.html';
    return InfluxConfigCtrl;
}());



/***/ }),

/***/ "./partials/editor_component.tsx":
/*!***************************************!*\
  !*** ./partials/editor_component.tsx ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var grafana_app_core_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! grafana/app/core/core_module */ "grafana/app/core/core_module");
/* harmony import */ var grafana_app_core_core_module__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(grafana_app_core_core_module__WEBPACK_IMPORTED_MODULE_1__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


/**
 * Angular wrapper around the FLux query field
 */
var Editor = /** @class */ (function (_super) {
    __extends(Editor, _super);
    function Editor(props) {
        var _this = _super.call(this, props) || this;
        _this.handleChange = function (selectedOption) {
            _this.setState({ selectedOption: selectedOption });
            console.log("Option selected:", selectedOption);
        };
        _this.handleChangeQuery = function (value) {
            var _a = _this.props, index = _a.index, change = _a.change;
            var query = _this.state.query;
            var edited = query !== value;
            _this.setState({ edited: edited, query: value });
            if (change) {
                change(value, index);
            }
        };
        _this.handlePressEnter = function () {
            var execute = _this.props.execute;
            if (execute) {
                execute();
            }
        };
        _this.state = {
            edited: false,
            query: props.query || '',
            selectedCollection: null,
            selectedQuery: null,
        };
        _this.collectionChange = _this.collectionChange.bind(_this);
        _this.queryChange = _this.queryChange.bind(_this);
        return _this;
    }
    Editor.prototype.collectionChange = function (event) {
        var _a = this.props, change = _a.change, execute = _a.execute;
        var selectedQuery = this.state.selectedQuery;
        var selectedCollection = event.target.value;
        this.setState({ selectedCollection: selectedCollection });
        console.log("Collection selected:", selectedCollection);
        if (change) {
            if (selectedCollection && selectedCollection !== "-1") {
                if (selectedQuery && selectedQuery !== "-1") {
                    console.log("call change from collection change");
                    change({ query: selectedQuery, collection: selectedCollection });
                    execute();
                }
            }
        }
    };
    Editor.prototype.queryChange = function (event) {
        var _a = this.props, change = _a.change, execute = _a.execute;
        var selectedCollection = this.state.selectedCollection;
        var selectedQuery = event.target.value;
        this.setState({ selectedQuery: selectedQuery });
        console.log("Query selected:", selectedQuery);
        if (change) {
            if (selectedQuery && selectedQuery !== "-1") {
                if (selectedCollection && selectedCollection !== "-1") {
                    console.log("call change from query change");
                    change({ query: selectedQuery, collection: selectedCollection });
                    execute();
                }
            }
        }
    };
    Editor.prototype.createBookmarksOrFacet = function () {
        var _a = this.props, bookmarks = _a.bookmarks, facets = _a.facets;
        if (bookmarks) {
            var selectBookmarkOption = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", { value: "-1" }, "Select bookmark");
            var bookmartItems_1 = [selectBookmarkOption];
            bookmarks.map(function (bookmark) {
                bookmartItems_1.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", { value: bookmark.id }, bookmark.label));
            });
            return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "gf-form" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", { className: "gf-form-label query-keyword" }, "Bookmarks"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "gf-form-select-wrapper" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", { className: "gf-form-input gf-size-auto", onChange: this.collectionChange }, bookmartItems_1))));
        }
        else if (facets) {
            var selectFacetOption = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", { value: "-1" }, "Select facet");
            var facetItems_1 = [selectFacetOption];
            facets.map(function (facet) {
                facetItems_1.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", { value: facet.id }, facet.label));
            });
            return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "gf-form" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", { className: "gf-form-label query-keyword" }, "Facets"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "gf-form-select-wrapper" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", { className: "gf-form-input gf-size-auto", onChange: this.collectionChange }, facetItems_1))));
        }
        else {
            return null;
        }
    };
    Editor.prototype.render = function () {
        var _a = this.props, collections = _a.collections, queries = _a.queries;
        var selectCollectionOption = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", { value: "-1" }, "Select collection");
        var selectQueryOption = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", { value: "-1" }, "Select query");
        var collectionItems = [selectCollectionOption];
        var queryItems = [selectQueryOption];
        if (queries && queries.length > 0) {
            queries.map(function (query) {
                queryItems.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", { value: query }, query));
            });
        }
        if (collections && collections.length > 0) {
            collections.map(function (collection) {
                console.log("collectoin", collection);
                var option = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", { value: collection.id }, collection.label);
                console.log('option', option);
                collectionItems.push(option);
            });
        }
        console.log('collections', collections);
        console.log('collectionItems', collectionItems);
        console.log("queries", queries);
        console.log("queryItems", queryItems);
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "gf-form-inline", style: { height: 'initial' } },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "gf-form" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", { className: "gf-form-label query-keyword" }, "Collections"),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "gf-form-select-wrapper" },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", { className: "gf-form-input gf-size-auto", onChange: this.collectionChange }, collectionItems))),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "gf-form" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", { className: "gf-form-label query-keyword" }, "Queries"),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "gf-form-select-wrapper" },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", { className: "gf-form-input gf-size-auto", onChange: this.queryChange }, queryItems)))),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "gf-form-inline", style: { height: 'initial' } }, this.createBookmarksOrFacet())));
    };
    return Editor;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
grafana_app_core_core_module__WEBPACK_IMPORTED_MODULE_1___default.a.directive('fluxEditor', [
    'reactDirective',
    function (reactDirective) {
        return reactDirective(Editor, ['change', 'database', 'execute', 'query', 'request', 'collections', 'queries', 'bookmarks', 'facets']);
    },
]);


/***/ }),

/***/ "./query_ctrl.ts":
/*!***********************!*\
  !*** ./query_ctrl.ts ***!
  \***********************/
/*! exports provided: InfluxFluxQueryCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfluxFluxQueryCtrl", function() { return InfluxFluxQueryCtrl; });
/* harmony import */ var grafana_app_core_app_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! grafana/app/core/app_events */ "grafana/app/core/app_events");
/* harmony import */ var grafana_app_core_app_events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(grafana_app_core_app_events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! grafana/app/plugins/sdk */ "grafana/app/plugins/sdk");
/* harmony import */ var grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _partials_editor_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./partials/editor_component */ "./partials/editor_component.tsx");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var InfluxFluxQueryCtrl = /** @class */ (function (_super) {
    __extends(InfluxFluxQueryCtrl, _super);
    /** @ngInject **/
    function InfluxFluxQueryCtrl($scope, $injector) {
        var _this = _super.call(this, $scope, $injector) || this;
        _this.onDataReceived = function (dataList) {
            console.log("datalist", dataList);
            // this.resultRecordCount = dataList.reduce((count, model) => {
            //   const records =
            //     model.type === 'table' ? model.rows.length : model.datapoints.length;
            //   return count + records;
            // }, 0);
            _this.resultTableCount = dataList[0].collections.length;
            _this.collections = dataList[0].collections;
            _this.queries = dataList[0].queries;
            _this.bookmarks = dataList[0].bookmarks;
            _this.facets = dataList[0].facets;
        };
        _this.onResponseReceived = function (response) {
            console.log('onResponseReceived', response.data);
            _this.dataPreview = JSON.stringify(response.data);
            _this.collections = response.data.collections;
        };
        _this.onRefresh = function () {
            _this.dataPreview = '';
            _this.resultRecordCount = '';
            _this.resultTableCount = '';
        };
        _this.onChange = function (nextQuery) {
            console.log('nextQuery', nextQuery);
            _this.target.query = nextQuery;
        };
        _this.onExecute = function () {
            console.log('Influx refresh metric data', _this.target);
            _this.panelCtrl.refresh();
        };
        _this.requestMetadata = function (query) {
            return _this.datasource.metricFindQuery(query);
        };
        _this.resultRecordCount = '';
        _this.resultTableCount = '';
        if (_this.target.query === undefined) {
            _this.target.query = {};
        }
        _this.defaultBucket = _this.datasource.bucket;
        _this.resultFormats = [
            { text: 'Time series', value: 'time_series' },
            { text: 'Table', value: 'table' },
        ];
        grafana_app_core_app_events__WEBPACK_IMPORTED_MODULE_0___default.a.on('ds-request-response', _this.onResponseReceived, $scope);
        _this.panelCtrl.events.on('refresh', _this.onRefresh, $scope);
        _this.panelCtrl.events.on('data-received', _this.onDataReceived, $scope);
        return _this;
    }
    InfluxFluxQueryCtrl.prototype.getCollapsedText = function () {
        return this.target.query;
    };
    InfluxFluxQueryCtrl.templateUrl = 'partials/query.editor.html';
    return InfluxFluxQueryCtrl;
}(grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_1__["QueryCtrl"]));



/***/ }),

/***/ "grafana/app/core/app_events":
/*!**************************************!*\
  !*** external "app/core/app_events" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_core_app_events__;

/***/ }),

/***/ "grafana/app/core/core_module":
/*!***************************************!*\
  !*** external "app/core/core_module" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_core_core_module__;

/***/ }),

/***/ "grafana/app/core/utils/datemath":
/*!******************************************!*\
  !*** external "app/core/utils/datemath" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_core_utils_datemath__;

/***/ }),

/***/ "grafana/app/plugins/sdk":
/*!**********************************!*\
  !*** external "app/plugins/sdk" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_plugins_sdk__;

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash__;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ })

/******/ })});;
//# sourceMappingURL=module.js.map