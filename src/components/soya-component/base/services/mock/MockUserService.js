import UserService from '../UserService.js';

/**
 * Mock service, used for testing. It goes without saying that you shouldn't
 * use this on production.
 */
export default class MockUserService extends UserService {
  fetchUserInformation(token) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let updated = (new Date()).getTime();
        resolve({
          state: BaseService.STATES.OK,
          updated: updated,
          data: {
            status: 'SUCCESS',
            username: 'ricky@traveloka.com',
            privilegeIds: ['LOGIN', 'BOOKING_CENTER', 'BOOKING_DETAIL']
          }
        });
      }, 700);
    });
  }

  login(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let updated = (new Date()).getTime();
        if (username == 'ricky@traveloka.com') {
          resolve({
            state: BaseService.STATES.OK,
            updated: updated,
            data: {
              result: 'SUCCESS',
              token: 'foo',
              tokenExpiry: updated + 10 * 60 * 1000
            }
          });
        } else if (username == 'ricky@gmail.com') {
          resolve({
            state: BaseService.STATES.OK,
            updated: updated,
            data: {
              result: 'SUCCESS',
              token: Math.random() + '',
              tokenExpiry: updated + 10 * 60 * 1000
            }
          });
        } else {
          resolve({
            state: BaseService.STATES.OK,
            updated: updated,
            data: {
              result: 'FAILED'
            }
          });
        }
      }, 300);
    });
  }

  refreshToken(token) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        var tokenPrefix = '', updated = (new Date()).getTime();
        if (token.startsWith('foo')) tokenPrefix = 'foo';
        resolve({
          state: BaseService.STATES.OK,
          updated: updated,
          data: {
            result: 'SUCCESS',
            token: tokenPrefix + Math.random(),
            expirationTimestamp: updated + 10 * 60 * 1000
          }
        });
      }, 300);
    });
  }
}