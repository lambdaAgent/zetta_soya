import request from 'superagent';

import BaseService from '../../soya-component/base/services/BaseService'

export default class BookingCenterService extends BaseService {
  static id() {
    return 'bookingCenterService';
  }

  forceIssue(token, list) {
    return new Promise((resolve, reject) => {
      var data = {
        itineraryId: list
      };
      var apiRequest = this.createApiRequest(token, data);
      request.post(`${this.config.apiUrl}/api/v2/connectivity/domestic/booking-center/reissue`).send(apiRequest).end((err, res) => {
        var result = this.createResultObject(err, res);
        resolve(result);
      });
    });
  }

  checkPurchase(token, list) {
    return new Promise((resolve, reject) => {
      var data = {
        itineraryId: list
      };
      var apiRequest = this.createApiRequest(token, data);
      request.post(`${this.config.apiUrl}/api/v2/connectivity/domestic/booking-center/check-purchase`).send(apiRequest).end((err, res) => {
        var result = this.createResultObject(err, res);
        resolve(result);
      });
    });
  }
}