import _ from 'lodash';

import * as dateMath from 'grafana/app/core/utils/datemath';
import { Query } from './models/query';

export default class InfluxDatasource {
  type: string;
  url: string;
  username: string;
  password: string;
  name: string;
  bucket: any;
  basicAuth: any;
  withCredentials: any;
  interval: any;
  supportAnnotations: boolean;
  supportMetrics: boolean;
  headers: any;

  /** @ngInject */
  constructor(instanceSettings, private backendSrv, private templateSrv) {
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
    this.headers = {'Content-Type': 'application/json'};
    if (typeof instanceSettings.basicAuth === 'string' && instanceSettings.basicAuth.length > 0) {
      this.headers['Authorization'] = instanceSettings.basicAuth;
    }
  }

  prepareQueryTarget(target, options) {
    // Replace grafana variables
    const timeFilter = this.getTimeFilter(options);
    options.scopedVars.range = {value: timeFilter};
    const interpolated = this.templateSrv.replace(target.query, options.scopedVars, 'pipe');
    return {
      ...target,
      query: interpolated,
    };
  }

  query(options) {
    const queryTargets = options.targets
    console.log('query option', options)
    //   .filter(target => target.query)
    //   .map(target => this.prepareQueryTarget(target, options));
    if (queryTargets.length === 0) {
      return Promise.resolve({data: []});
    }

    const queries = queryTargets.map(target => {
      const {query, resultFormat} = target;

      if (resultFormat === 'table') {
        return this._seriesQuery(query, options)
          .then(response => response.data)
      } else {
        return this._seriesQuery(query, options)
          .then(response => response.data)
      }
    });

    return Promise.all(queries).then((series: any) => {
      return {data: series};
    });
  }

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

  _seriesQuery(query: any, options?: any) {
    // if (!query) {
    //   return Promise.resolve({data: ''});
    // }
    let url = '/collections';

    if (query.collection && query.query) {
        if (query.query === 'Facets') {
            url = `${url}/${query.collection}/facets`
        } else if (query.query === 'Queries') {
            url = `${url}/${query.collection}/bookmarks`
        }
    }

    return this._emmaQuery(query, url, options);
  }

  _emmaQuery(query: any, url: string, options?: any) {
    return this._emmaRequest('GET', url, query, options);
  }

  doRequest(options: any) {
    options.withCredentials = this.withCredentials;
    options.headers = this.headers;

    return this.backendSrv.datasourceRequest(options);
  }

  testDatasource() {
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
      }).then((response: { status: number; }) => {
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
  }

  _emmaRequest(method: string, url: string, query: Query, options?: any) {
    let params: any = {};

    if (this.username) {
      params.u = this.username;
      params.p = this.password;
    }

    let req: any = {
      method: method,
      url: this.url + url,
      params: params,
      data: query,
      precision: 'ms',
      inspect: {type: this.type},
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

    return this.backendSrv.datasourceRequest(req).then(
      result => {
          console.log("response", result)
        return result;
      },
      function(err) {
        if (err.status !== 0 || err.status >= 300) {
          if (err.data && err.data.error) {
            throw {
              message: 'InfluxDB Error: ' + err.data.error,
              data: err.data,
              config: err.config,
            };
          } else {
            throw {
              message: 'Network Error: ' + err.statusText + '(' + err.status + ')',
              data: err.data,
              config: err.config,
            };
          }
        }
      }
    );
  }

  getTimeFilter(options) {
    const from = this.getInfluxTime(options.rangeRaw.from, false);
    const to = this.getInfluxTime(options.rangeRaw.to, true);
    if (to === 'now') {
      return `start: ${from}`;
    }
    return `start: ${from}, stop: ${to}`;
  }

  getInfluxTime(date, roundUp) {
    if (_.isString(date)) {
      if (date === 'now') {
        return date;
      }

      const parts = /^now\s*-\s*(\d+)([d|h|m|s])$/.exec(date);
      if (parts) {
        const amount = parseInt(parts[1]);
        const unit = parts[2];
        return '-' + amount + unit;
      }
      date = dateMath.parse(date, roundUp);
    }

    return date.toISOString();
  }
}
