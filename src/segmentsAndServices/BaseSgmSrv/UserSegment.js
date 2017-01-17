import Segment from 'soya/lib/data/redux/Segment';
import Load from 'soya/lib/data/redux/Load';
import update from 'react-addons-update';
import QueryResult from 'soya/lib/data/redux/QueryResult';

import UserService from '../services/UserService.js';

/**
 * State example:
 *
 * {
 *   state: '', // one of UserSegment.STATES
 *   token: 'hd982lhsadfal',
 *   tokenExpiry: 123123123, // timestamp
 *   tokenLastUpdated: 123123123, // timestamp
 *   username: 'ricky@traveloka.com',
 *   privileges: ['', '', '']
 * }
 *
 * Queries:
 *
 * 'user' --> Will fetch token from cookie if it's not loaded yet. Returns
 *            the entire segment state.
 *
 * @CLIENT_SERVER
 */

const ID = 'd.user';
const SET_USER_ACTION_TYPE = `${ID}.setUser`;
const REFRESH_TOKEN_ACTION_TYPE = `${ID}.refreshToken`;
const CLEAR_USER_ACTION_TYPE = `${ID}.clearUser`;

const STATES = {
  // No token available, need to log in.
  NOT_LOGGED_IN: 0,

  // Token was given but failed to fetch user profile. Need to log in.
  TOKEN_FAILURE: 1,

  // Token was given and user profile fetched successfully.
  // Client will still need to check if the token has expired or not though.
  LOGGED_IN: 2
};

const actionCreator = {
  setUser(token, tokenExpiry) {
    var load = new Load(ID);
    load.func = function(dispatch, query, services) {
      return new Promise((resolve, reject) => {
        var updated = (new Date()).getTime();
        var userService = services[UserService.id()];
        userService.saveTokenToCookies(token, tokenExpiry);
        userService.fetchUserInformation(token).then((userInfo) => {
          if (userInfo.state == UserService.STATES.OK && userInfo.data.status == 'SUCCESS') {
            dispatch({
              type: SET_USER_ACTION_TYPE,
              state: STATES.LOGGED_IN,
              updated: updated,
              token: token,
              tokenExpiry: tokenExpiry,
              username: userInfo.data.username,
              privileges: userInfo.data.privilegeIds
            });
          } else {
            dispatch({
              type: SET_USER_ACTION_TYPE,
              state: STATES.TOKEN_FAILURE,
              updated: updated,
              token: null,
              tokenExpiry: null,
              username: null,
              privileges: null
            });
          }
          resolve();
        }).catch(reject);
      });
    };
    return load;
  },
  loadFromCookie() {
    var load = new Load(ID);
    load.func = (dispatch, query, services) => {
      return new Promise((resolve, reject) => {
        var userService = services[UserService.id()];
        var tokenInfo = userService.fetchTokenFromCookies();
        if (tokenInfo != null) {
          dispatch(this.setUser(tokenInfo.token, tokenInfo.tokenExpiry)).then(resolve).catch(reject);
        } else {
          // If nothing from cookie to load, then the user has not logged in.
          dispatch({
            type: CLEAR_USER_ACTION_TYPE
          });
          resolve();
        }
      });
    };
    return load;
  },
  refreshToken() {
    var load = new Load(ID);
    load.func = (dispatch, query, services) => {
      return new Promise((resolve, reject) => {
        var userService = services[UserService.id()];
        query(UserSegment.id(), 'user').then((user) => {
          if (user == null || user.token == null) resolve();
          userService.refreshToken(user.token).then((result) => {
            if (result.state == UserService.STATES.OK && result.data.result == 'SUCCESS') {
              // Since we're refreshing the token, we assume that user profile
              // information doesn't change.
              var token = result.data.token;
              var tokenExpiry = result.data.expirationTimestamp;
              userService.saveTokenToCookies(token, tokenExpiry);
              dispatch({
                type: REFRESH_TOKEN_ACTION_TYPE,
                token: token,
                tokenExpiry: tokenExpiry
              });
            } else {
              // If there's an error, don't do anything. Just log the error.
              console.error('Unable to refresh token!', result);
            }
            resolve();
          }).catch(reject);
        }).catch(reject);
      });
    };
    return load;
  },
  clearUser() {
    var load = new Load(ID);
    load.func = (dispatch, query, services) => {
      return new Promise((resolve, reject) => {
        var userService = services[UserService.id()];
        userService.clearTokenFromCookies();
        dispatch({type: CLEAR_USER_ACTION_TYPE});
        resolve();
      });
    };
    return load;
  }
};

const INITIAL_STATE = {
  state: STATES.NOT_LOGGED_IN
};

const reducer = function(state, action) {
  if (state == null) state = INITIAL_STATE;
  switch (action.type) {
    case SET_USER_ACTION_TYPE:
      state = update(state, {
        token: {$set: action.token},
        tokenExpiry: {$set: action.tokenExpiry},
        state: {$set: action.state},
        updated: {$set: action.updated},
        username: {$set: action.username},
        privileges: {$set: action.privileges}
      });
      break;
    case REFRESH_TOKEN_ACTION_TYPE:
      state = update(state, {
        token: {$set: action.token},
        tokenExpiry: {$set: action.tokenExpiry}
      });
      break;
    case CLEAR_USER_ACTION_TYPE:
      state = INITIAL_STATE;
      break;
  }
  return state;
};

export default class UserSegment extends Segment {
  static get STATES() {
    return STATES;
  }

  static id() {
    return ID;
  }

  static getServiceDependencies() {
    return [UserService];
  }

  static getActionCreator() {
    return actionCreator;
  }

  static getReducer() {
    return reducer;
  }

  static generateQueryId() {
    return 'user';
  }

  static queryState(query, queryId, segmentState) {
    if (segmentState == null || !segmentState.hasOwnProperty('token')) {
      return QueryResult.notLoaded(segmentState);
    }
    return QueryResult.loaded(segmentState);
  }

  static createLoadFromQuery(query, queryId, segmentState) {
    // We only have one query, so we load from cookie.
    return actionCreator.loadFromCookie();
  }
}