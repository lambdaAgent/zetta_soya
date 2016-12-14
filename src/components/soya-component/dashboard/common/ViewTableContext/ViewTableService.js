import BaseService from '../../../base/services/BaseService.js';

import request from 'superagent';

export default class ViewTableService extends BaseService {
  static id() {
    return 'vt';
  }

  fetchViewTableData(token, spec) {
    return new Promise((resolve, reject) => {
      var apiRequest = this.createApiRequest(token, spec);
      request.post(spec.url).send(apiRequest).end((err, res) => {
        var resultObject = this.createResultObject(err, res);
        resolve(resultObject);
      });
    });
  }
}