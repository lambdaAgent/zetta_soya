import BaseService from '../../base/services/BaseService.js';
import request from 'superagent';

export default class PaymentInfoService extends BaseService {
  static id() {
    return 'paymentinfo';
  }

  fetchPaymentInfo(token, itineraryId) {
    return new Promise((resolve, reject) => {
      let url = `${this.config.apiUrl}/api/v2/optools/payment/info`;
      let requestObj = this.createApiRequest(token, {itineraryId : itineraryId});
      request.post(url)
        .send(requestObj)
        .end((err, res) => {
          if (res.ok) {
            var payload = JSON.parse(res.text);
            resolve(payload.data);
          } else {
            reject(new Error('Unable to fetch payment info due to unknown reason!'));
          }
        });
    });
  }
}