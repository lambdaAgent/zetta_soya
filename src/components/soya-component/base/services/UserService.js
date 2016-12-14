import Cookie from 'soya/lib/http/Cookie';
import request from 'superagent';

import BaseService from './BaseService.js';

const TOKEN_COOKIE = 'token';
const TOKEN_EXPIRY_COOKIE = 'tokenExpiry';

export default class UserService extends BaseService {
  static id() {
    return 'user';
  }

  saveTokenToCookies(token, tokenExpiry) {
    var tokenCookie = Cookie.createSession(TOKEN_COOKIE, token,
      this.config.cookieDomain, this.config.secureCookies);
    var tokenExpiryCookie = Cookie.createSession(TOKEN_EXPIRY_COOKIE, tokenExpiry,
      this.config.cookieDomain, this.config.secureCookies);
    this.cookieJar.set(tokenCookie);
    this.cookieJar.set(tokenExpiryCookie);
  }

  fetchTokenFromCookies() {
    var token = this.cookieJar.read(TOKEN_COOKIE);
    var tokenExpiry = this.cookieJar.read(TOKEN_EXPIRY_COOKIE);
    if (token != null && tokenExpiry != null) {
      return {
        token: token,
        tokenExpiry: parseInt(tokenExpiry)
      }
    }
    return null;
  }

  clearTokenFromCookies() {
    this.cookieJar.remove(TOKEN_COOKIE, this.config.cookieDomain);
    this.cookieJar.remove(TOKEN_EXPIRY_COOKIE, this.config.cookieDomain);
  }

  fetchUserInformation(token) {
    return new Promise((resolve, reject) => {
      var apiRequest = this.createApiRequest(token, {});
      request.post(`${this.config.apiUrl}/api/v2/optools/auth/getTokenInfo`)
        .send(apiRequest)
        .end((err, res) => {
          var result = this.createResultObject(err, res);
          resolve(result);
        });
    });
  }

  login(username, password) {
    return new Promise((resolve, reject) => {
      var data = {
        userName: username,
        password: password
      };
      var apiRequest = this.createApiRequest(null, data);
      request.post(`${this.config.apiUrl}/api/v2/optools/auth/login`).send(apiRequest).end((err, res) => {
        var result = this.createResultObject(err, res);
        resolve(result);
      });
    });
  }

  refreshToken(token) {
    return new Promise((resolve, reject) => {
      var apiRequest = this.createApiRequest(token, {});
      request.post(`${this.config.apiUrl}/api/v2/optools/auth/refresh`)
        .send(apiRequest)
        .end((err, res) => {
          var result = this.createResultObject(err, res);
          resolve(result);
        });
    });
  }
}