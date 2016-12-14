import Segment from "soya/lib/data/redux/Segment";
import UserSegment from '../../soya-component/base/segments/UserSegment.js';
import BookingDetailService from "./BookingDetailService.js";
import update from "react-addons-update";
import QueryResult from "soya/lib/data/redux/QueryResult";
import Load from "soya/lib/data/redux/Load";

const ID = 'bookingDetail';
const SET_BOOKING = `${ID}.setBooking`;

const actionCreator = {
  getBookingDetail(itineraryId) {
    var load = new Load(ID);
    load.func = function(dispatch, query, services) {
      return new Promise((resolve, reject) => {
        query(UserSegment.id(), 'user').then((user) => {
          if (!user || !user.token) {
            resolve();
            return;
          }
          var bookingDetailService = services[BookingDetailService.id()];
          bookingDetailService.getBookingDetail(user.token, itineraryId).then((result) => {
            dispatch({
              type: SET_BOOKING,
              itineraryId: itineraryId,
              result: result
            });
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
    case SET_BOOKING:
      state = update(state, {
        [action.itineraryId]: {$set: action.result},
      });
      break;
  }
  return state;
};

/**
 * {
 *   '10001': {
 *      state: ..,
 *      data: {},
 *      errorMessage: '..'
  *   },
  *   ...
 * }
 */
export default class BookingDetailSegment extends Segment {
  static id() {
    return ID;
  }

  static getSegmentDependencies() {
    return [UserSegment];
  }

  static getServiceDependencies() {
    return [BookingDetailService];
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


  static queryState(query, queryId, segmentState) {
    if (segmentState == null || !segmentState.hasOwnProperty(query)) {
      return QueryResult.notLoaded(null);
    }
    return QueryResult.loaded(segmentState[query]);
  }

  static createLoadFromQuery(query, queryId, segmentState) {
    return actionCreator.getBookingDetail(query);
  }
}