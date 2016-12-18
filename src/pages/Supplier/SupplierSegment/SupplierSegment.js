import Segment from 'soya/lib/data/redux/Segment';
import Load from 'soya/lib/data/redux/Load';
import QueryResult from 'soya/lib/data/redux/QueryResult';
import update from 'react-addons-update';
import SupplierService from './SupplierService.js';

const ID = 'suppliers_segment';
const FETCH_SUPPLIERS_WITH_MANAGER = `${ID}.fetch_supplier_with_manager`;
const FETCH_SUPPLIER_BY_NAME = `${ID}.fetch_supplier_by_name`;
const DELETE_SUPPLIER_BY_NAME = `${ID}.delete_supplier_by_name`;

const actionCreator = {
  getSupplierListWithMarketManager(){
    let load = new Load(ID);
    load.func = (dispatch, queryFunc, services) => {
      let _service = services[SupplierService.id()];
      return new Promise((resolve, reject) => {
        // Use the service to fetch data.
        _service.fetchSupplierListWithMarketManager().then((data) => {
          // Set the data to segment state.
          dispatch({type: FETCH_SUPPLIERS_WITH_MANAGER, data:data});
          resolve();
        }).catch(reject);
      });
    };
    return load;
  },
  getSupplierByName(supplierName){
    let load = new Load(ID);
    load.func = (dispatch, queryFunc, services) => {
      let _service = services[SupplierService.id()];
      return new Promise((resolve, reject) => {
        // Use the service to fetch data.
        _service.fetchSupplierByName(supplierName).then((data) => {
          // Set the data to segment state.
          dispatch({type: FETCH_SUPPLIER_BY_NAME, data:data});
          resolve();
        }).catch(reject);
      });
    };
    return load;
  },
  deleteSupplierByName(supplierName){
    let load = new Load(ID);
    load.func = (dispatch, queryFunc, services) => {
      let _service = services[SupplierService.id()];
      return new Promise((resolve, reject) => {
        _service.deleteSupplierByName(supplierName).then(data => {
          dispatch({type: DELETE_SUPPLIER_BY_NAME, data: data});
          resolve();
        }).catch(reject);
      });
    }
    return load;
  }
};

const reducer = function(state, action) {
  // Initialize segments state if it's null.
  if (state == null) state = {};
  switch (action.type) {
    case FETCH_SUPPLIERS_WITH_MANAGER:
      state = Object.assign({}, state, action.data);
      break;
    case FETCH_SUPPLIER_BY_NAME:
      state = Object.assign({}, state, action.data);
      break;
    case DELETE_SUPPLIER_BY_NAME:
      state = Object.assign({}, state, action.data);
      break;
  }
  return state;
};

export default class SupplierSegment extends Segment {
  static id() {
    return ID;
  }

  static getServiceDependencies() {
    return [SupplierService];
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