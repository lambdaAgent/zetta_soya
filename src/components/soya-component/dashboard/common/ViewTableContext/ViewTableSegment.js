import Segment from 'soya/lib/data/redux/Segment';
import Load from 'soya/lib/data/redux/Load';
import update from 'react-addons-update';
import request from 'superagent';
import QueryResult from 'soya/lib/data/redux/QueryResult';

import UserSegment from '../../../base/segments/UserSegment.js';
import ViewTableService from './ViewTableService.js';

/**
 * Separates search spec and search results of a booking center into multiple
 * namespaces. When a search spec change action is dispatched, it will first
 * dispatch the search spec change and emptying the result. It then fetches
 * result to back-end and updates the result, which will in turn updates the
 * booking center. Example data:
 *
 * <pre>
 *   {
 *     namespace: {
 *       spec: {
 *         url: 'https://experience.main.tvlk.cloud/api/booking-center',
 *         page: 1,
 *         rowCount: 20,
 *         sortColumn: 'date',
 *         sortType: 'DESCENDING',
 *         filters: {
 *           date: {
 *             type: 'DATE_TIME',
 *             ...
 *           },
 *           ...
 *         }
 *       },
 *       result: {
 *         state: 'LOADED' // LOADING, INIT, LOADED
 *         response: {
 *           state: '' // One of BaseService.STATES,
 *           updated: 123123, // timestamp
 *           errorMessage: '...',
 *           data: {
 *             schema: {},
 *             totalRows: 1923,
 *             idColumn: 'transactionId',
 *             data: []
 *           }
 *         }
 *       }
 *     },
 *     ...
 *   }
 * </pre>
 *
 * There are two queries available, the search spec query and the result query.
 * The search spec query is a normal fetch query while the result query is a
 * load query.
 *
 * The search spec query:
 *
 * <pre>
 *   {
 *     type: 'spec',
 *     namespace: 'namespace'
 *   }
 * </pre>
 *
 * The result query:
 *
 * <pre>
 *   {
 *     type: 'result',
 *     namespace: 'namespace'
 *   }
 * </pre>
 *
 * To implement the search API, please see the corres..??
 *
 * @CLIENT_SERVER
 */

const ID = 'viewTable';
const STATE = {
  INIT: 0,
  LOADING: 1,
  LOADED: 3
};

const SET_SEARCH_SPEC_ACTION_TYPE = `${ID}.setSearchSpec`;
const SET_RESULT_ACTION_TYPE = `${ID}.setResult`;
const CREATE_NAMESPACE_ACTION_TYPE = `${ID}.createNamespace`;

const actionCreator = {
  createNamespace(namespace, spec) {
    return {
      type: CREATE_NAMESPACE_ACTION_TYPE,
      namespace: namespace,
      spec: spec
    };
  },
  updateSearch(namespace, spec) {
    var load = new Load(ID);
    load.func = (dispatch) => {
      // First update the search spec.
      dispatch(this.setSearchSpec(namespace, spec));
      // Then dispatch the load action.
      dispatch(this.loadNamespace(namespace, spec));
    };
    return load;
  },
  setSearchSpec(namespace, spec) {
    return {
      type: SET_SEARCH_SPEC_ACTION_TYPE,
      namespace: namespace,
      spec: spec
    }
  },
  setResult(namespace, payload) {
    return {
      namespace: namespace,
      type: SET_RESULT_ACTION_TYPE,
      payload: payload
    };
  },
  loadNamespace(namespace, spec) {
    var load = new Load(ID);
    load.func = (dispatch, query, services) => {
      // First dispatch the action that cleans the state.
      dispatch(this.setResult(namespace, {state: STATE.LOADING}));
      return new Promise((resolve, reject) => {
        query(UserSegment.id(), 'user').then((user) => {
          // If token is null or unloaded, don't continue, let the query be
          // not loaded.
          if (!user || !user.token) {
            resolve();
            return;
          }
          var viewTableService = services[ViewTableService.id()];
          viewTableService.fetchViewTableData(user.token, spec).then((result) => {
            dispatch(this.setResult(namespace, {
              state: STATE.LOADED,
              response: result
            }));
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
    case CREATE_NAMESPACE_ACTION_TYPE:
      // Don't update if namespace is already created.
      if (state.hasOwnProperty(action.namespace)) return state;
      state = update(state, {
        [action.namespace]: {$set: {
          spec: action.spec,
          result: { state: STATE.INIT }
        }}
      });
      break;
    case SET_RESULT_ACTION_TYPE:
      // Don't update if namespace isn't created yet.
      if (!state.hasOwnProperty(action.namespace)) return state;
      state = update(state, {
        [action.namespace]: {
          result: {$set: action.payload}
        }
      });
      break;
    case SET_SEARCH_SPEC_ACTION_TYPE:
      if (!state.hasOwnProperty(action.namespace)) return state;
      state = update(state, {
        [action.namespace]: {
          spec: {$set: action.spec},
          result: {$set: {
            state: STATE.LOADING
          }}
        }
      });
      break;
  }
  return state;
};

export default class ViewTableSegment extends Segment {
  // Can be used by users to determine the state of the view table.
  static get state() {
    return STATE;
  }

  static id() {
    return ID;
  }

  static getSegmentDependencies() {
    return [UserSegment];
  }

  static getServiceDependencies() {
    return [ViewTableService];
  }

  static getActionCreator() {
    return actionCreator;
  }

  static getReducer() {
    return reducer;
  }

  static generateQueryId(query) {
    return `${query.type}.${query.namespace}`;
  }

  static createLoadFromQuery(query, queryId, segmentState) {
    if (query.type != 'result') return null;
    var spec = segmentState[query.namespace].spec;
    return actionCreator.loadNamespace(query.namespace, spec);
  }

  static queryState(query, queryId, segmentState) {
    if (segmentState == null || segmentState[query.namespace] == null) return QueryResult.notLoaded();
    if (query.type == 'result') {
      // Result is only loaded if the state is LOADED. Otherwise it's not loaded yet.
      let loaded = segmentState[query.namespace].result && segmentState[query.namespace].result.state == STATE.LOADED;
      return new QueryResult(loaded, segmentState[query.namespace].result);
    } else if (query.type == 'spec') {
      return QueryResult.loaded(segmentState[query.namespace].spec);
    }
    throw new Error('Unrecognized query: ' + query);
  }
}