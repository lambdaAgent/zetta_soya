import Segment from 'soya/lib/data/redux/Segment';
import Load from 'soya/lib/data/redux/Load';
import QueryResult from 'soya/lib/data/redux/QueryResult';
import update from 'react-addons-update';
import DashboardService from './DashboardService.js';

const ID = 'dashboardPage';
const SET_ACTION_TYPE = `${ID}.set`;
const FETCH_SUPPLIER_NAMES = `${ID}.fetchSupplierNames`;
const FETCH_SUPPLIER = `${ID}.fetchSupplier`;

const actionCreator = {
  'set': function(userId, data) {
    return {
      type: SET_ACTION_TYPE,
      userId: userId,
      data: data
    };
  },
  load(userId) {
    let load = new Load(ID);
    load.func = (dispatch, queryFunc, services) => {
      let userService = services[DashboardService.id()];
      return new Promise((resolve, reject) => {
        // Use the service to fetch data.
        userService.fetchUserProfile(userId).then((data) => {
          // Set the data to segment state.
          dispatch(this.set(userId, data));
          resolve();
        }).catch(reject);
      });
    };
    return load;
  },
  getSupplierNames(){
    let load = new Load(ID);
    load.func = (dispatch, queryFunc, services) => {
      let _service = services[DashboardService.id()];
      return new Promise((resolve, reject) => {
        // Use the service to fetch data.
        _service.fetchSupplierName().then((data) => {
          // Set the data to segment state.
          dispatch({type: FETCH_SUPPLIER_NAMES, data:data});
          resolve();
        }).catch(reject);
      });
    };
    return load;
  },
  getSupplier(supplierName){
    let load = new Load(ID);
    load.func = (dispatch, queryFunc, services) => {
      let _service = services[DashboardService.id()];
      return new Promise((resolve, reject) => {
        _service.fetchSupplier(supplierName).then(data => {
          dispatch({type: FETCH_SUPPLIER, data:data});
          resolve();
        }).catch(reject);
      });
    };
    return load;
  }
};

const reducer = function(state, action) {
  // Initialize segments state if it's null.
  if (state == null) state = {};
  switch (action.type) {
    case SET_ACTION_TYPE:
      state = update(state, {
        [action.userId]: {$set: action.data}
      });
      break;
    case FETCH_SUPPLIER_NAMES:
      state = Object.assign({}, state, action.data);
      break;
    case FETCH_SUPPLIER:
      state = Object.assign({}, state, action.data);
      break;
  }
  return state;
};

export default class DashboardSegment extends Segment {
  static id() {
    return ID;
  }

  static getServiceDependencies() {
    return [DashboardService];
  }

  static getActionCreator() {
    return actionCreator;
  }

  // static getSegmentDependencise(){
  //   return [];
  // }

  static getReducer() {
    return reducer;
  }

  static generateQueryId(query) {
    return query;
  }

  static queryState(query, queryId, segmentState) {
    if (segmentState != null && segmentState.hasOwnProperty(query)) {
      return QueryResult.loaded(segmentState[query]);
    }
    return QueryResult.notLoaded();
  }

  static createLoadFromQuery(query, queryId, segmentState, services) {
    //return actionCreator.load(query);
  }
}