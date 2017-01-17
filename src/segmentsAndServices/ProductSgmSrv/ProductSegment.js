import Segment from 'soya/lib/data/redux/Segment';
import Load from 'soya/lib/data/redux/Load';
import QueryResult from 'soya/lib/data/redux/QueryResult';
import update from 'react-addons-update';
import ProductService from './ProductService.js';

const ID = 'products_segment';
const FETCH_PRODUCT_BY_NAME = `${ID}.fetch_product_by_name`;
const FETCH_PRODUCTS = `${ID}.fetch_products`;

const actionCreator = {
  getProducts(supplierName){
    let load = new Load(ID);
    load.func = (dispatch, queryFunc, services) => {
      let _service = services[ProductService.id()];
      return new Promise((resolve, reject) => {
        // Use the service to fetch data.
        _service.fetchProducts(supplierName).then((data) => {
          // Set the data to segment state.
          dispatch({type: FETCH_PRODUCTS, data:data});
          resolve();
        }).catch(reject);
      });
    };
    return load;
  },
  getProductByName(supplierName, productName){
    let load = new Load(ID);
    load.func = (dispatch, queryFunc, services) => {
      let _service = services[SupplierService.id()];
      return new Promise((resolve, reject) => {
        // Use the service to fetch data.
        _service.fetchProductByName(supplierName, productName).then((data) => {
          // Set the data to segment state.
          dispatch({type: FETCH_PRODUCT_BY_NAME, data:data});
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
    case FETCH_PRODUCTS:
      state = Object.assign({}, state, action.data);
      break;
  }
  return state;
};

export default class ProductSegment extends Segment {
  static id() {
    return ID;
  }

  static getServiceDependencies() {
    return [ProductService];
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