import appEvents from 'grafana/app/core/app_events';
import {QueryCtrl} from 'grafana/app/plugins/sdk';

import './partials/editor_component';

export class InfluxFluxQueryCtrl extends QueryCtrl {
  static templateUrl = 'partials/query.editor.html';

  dataPreview: string;
  defaultBucket: string;
  resultRecordCount: string;
  resultTableCount: string;
  resultFormats: any[];
  collections: any[];
  queries: any[];
  bookmarks: any[];
  facets: any[];

  /** @ngInject **/
  constructor($scope, $injector) {
    super($scope, $injector);

    this.resultRecordCount = '';
    this.resultTableCount = '';

    if (this.target.query === undefined) {
      this.target.query = {};
    }

    this.defaultBucket = this.datasource.bucket;
    this.resultFormats = [
      {text: 'Time series', value: 'time_series'},
      {text: 'Table', value: 'table'},
    ];

    appEvents.on('ds-request-response', this.onResponseReceived, $scope);
    this.panelCtrl.events.on('refresh', this.onRefresh, $scope);
    this.panelCtrl.events.on('data-received', this.onDataReceived, $scope);
  }

  onDataReceived = dataList => {
    console.log("datalist", dataList);
    // this.resultRecordCount = dataList.reduce((count, model) => {
    //   const records =
    //     model.type === 'table' ? model.rows.length : model.datapoints.length;
    //   return count + records;
    // }, 0);
    this.resultTableCount = dataList[0].collections.length;
    this.collections = dataList[0].collections;
    this.queries = dataList[0].queries;
    this.bookmarks = dataList[0].bookmarks;
    this.facets = dataList[0].facets;

  };

  onResponseReceived = response => {
    console.log('onResponseReceived', response.data)
    this.dataPreview = JSON.stringify(response.data);
    this.collections = response.data.collections;
  };

  onRefresh = () => {
    this.dataPreview = '';
    this.resultRecordCount = '';
    this.resultTableCount = '';
  };

  onChange = nextQuery => {
    console.log('nextQuery', nextQuery);
    this.target.query = nextQuery;
  };

  onExecute = () => {
    console.log('Influx refresh metric data', this.target);
    this.panelCtrl.refresh();
  };

  requestMetadata = query => {
    return this.datasource.metricFindQuery(query);
  };

  getCollapsedText() {
    return this.target.query;
  }
}
