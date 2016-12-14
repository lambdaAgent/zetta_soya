import request from "superagent";
import BaseService from "../../soya-component/base/services/BaseService";

export default class BookingDetailService extends BaseService {
  static id() {
    return 'bookingdetail';
  }

  getBookingDetail(token, itineraryId) {
    return new Promise((resolve, reject) => {
      var data = {
        itineraryId: itineraryId
      };
      var apiRequest = this.createApiRequest(token, data);
      request.post(`${this.config.apiUrl}/api/v2/connectivity/domestic/booking-detail/get`).send(apiRequest).end((err, res) => {
        var result = this.createResultObject(err, res);
        resolve(result);
      });
    });
  }

  checkPurchase(token, itineraryId) {
    return new Promise((resolve, reject) => {
      var data = {
        itineraryId: itineraryId
      };
      var apiRequest = this.createApiRequest(token, data);
      request.post(`${this.config.apiUrl}/api/v2/connectivity/domestic/booking-detail/check-purchase`).send(apiRequest).end((err, res) => {
        var result = this.createResultObject(err, res);
        resolve(result);
      });
    });
  }

  forceIssue(token, itineraryId) {
    return new Promise((resolve, reject) => {
      var data = {
        itineraryId: itineraryId
      };
      var apiRequest = this.createApiRequest(token, data);
      request.post(`${this.config.apiUrl}/api/v2/connectivity/domestic/booking-detail/manual-issue`).send(apiRequest).end((err, res) => {
        var result = this.createResultObject(err, res);
        resolve(result);
      });
    });
  }

  markIssued(token, itineraryId) {
    return new Promise((resolve, reject) => {
      var data = {
        itineraryId: itineraryId
      };
      var apiRequest = this.createApiRequest(token, data);
      request.post(`${this.config.apiUrl}/api/v2/connectivity/domestic/booking-detail/send-email`).send(apiRequest).end((err, res) => {
        var result = this.createResultObject(err, res);
        resolve(result);
      });
    });
  }

  thirdPartyIssued(token, itineraryId, providerTxId, providerName, currency, purchasePrice, csUserId) {
    return new Promise((resolve, reject) => {
      var data = {
        itineraryId: itineraryId,
        providerTxId: providerTxId,
        providerName: providerName,
        purchasePrice: {
          currency: currency,
          amount: purchasePrice
        },
        csUserId: csUserId
      };
      var apiRequest = this.createApiRequest(token, data);
      request.post(`${this.config.apiUrl}/api/v2/connectivity/domestic/booking-detail/third-party-fulfillment`).send(apiRequest).end((err, res) => {
        var result = this.createResultObject(err, res);
        resolve(result);
      });
    });
  }
}