import Segment from 'soya/lib/data/redux/Segment';
import UserSegment from '../../base/segments/UserSegment.js';
import PaymentInfoService from '../services/PaymentInfoService.js';
import update from 'react-addons-update';
import QueryResult from 'soya/lib/data/redux/QueryResult';
import Load from 'soya/lib/data/redux/Load';

const ID = 'paymentInfo';
const SET_ACTION_TYPE = `${ID}.set`;

const actionCreator = {
  'set': function(itineraryId, data) {
    return {
      type: SET_ACTION_TYPE,
      itineraryId: itineraryId,
      data: data
    };
  },
  load(itineraryId) {
    let load = new Load(ID);
    load.func = (dispatch, query, services) => {
      return new Promise((resolve, reject) => {
        query(UserSegment.id(), 'user').then((user) => {
          // If token is null or unloaded, don't continue, let the query be
          // not loaded.
          if (!user || !user.token) {
            resolve();
            return;
          }
          var paymentInfoService = services[PaymentInfoService.id()];
          paymentInfoService.fetchPaymentInfo(user.token, itineraryId).then((payload) => {
            dispatch(this.set(itineraryId, payload));
            resolve();
          }).catch(reject);
        }).catch(reject);
      });
    };
    return load;
  }
};

const reducer = function(state, action) {
  if (state == null) state = {};
  switch (action.type) {
    case SET_ACTION_TYPE:
      state = update(state, {
        [action.itineraryId]: {$set: action.data}
      });
      break;
  }
  return state;
};


export default class PaymentInfoSegment extends Segment {
  static id() {
    return ID;
  }

  static getServiceDependencies() {
    return [PaymentInfoService];
  }

  static getSegmentDependencies() {
    return [UserSegment];
  }

  static getActionCreator() {
    return actionCreator;
  }

  static getReducer() {
    return reducer;
  }

  static generateQueryId(query) {
    return query;
  }

  static createLoadFromQuery(query, queryId, segmentState) {
    return actionCreator.load(query);
  }

  static queryState(query, queryId, segmentState) {
    if (segmentState != null && segmentState.hasOwnProperty(query)) {
      return QueryResult.loaded(segmentState[query]);
    }
    return QueryResult.notLoaded();
  }
}