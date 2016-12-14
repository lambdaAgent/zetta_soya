import LocalSegment from 'soya/lib/data/redux/segment/local/LocalSegment';
import ActionNameUtil from 'soya/lib/data/redux/segment/ActionNameUtil';
import QueryResult from 'soya/lib/data/redux/QueryResult';

import update from 'react-addons-update';

/**
 * State structure:
 *
 * <pre>
 *   {
 *     tab1: 0,
 *     tab2: 1
 *   }
 * </pre>
 *
 * @CLIENT_SERVER
 */

const ID = 'actionTab';
const SET_ACTIVE_TAB_ACTION_TYPE = ActionNameUtil.generate(ID, 'SET');
const SET_DEFAULT_TAB_ACTION_TYPE = ActionNameUtil.generate(ID, 'SET_DEFAULT');

const actionCreator = {
  'set': (id, activeIndex) => {
    return {
      type: SET_ACTIVE_TAB_ACTION_TYPE,
      activeIndex: activeIndex,
      id: id
    }
  },
  setDefault: (id, activeIndex) => {
    return {
      type: SET_DEFAULT_TAB_ACTION_TYPE,
      activeIndex: activeIndex,
      id: id
    }
  }
};

const reducer = function(state, action) {
  if (state == null) state = {};
  switch (action.type) {
    case SET_ACTIVE_TAB_ACTION_TYPE:
      state = update(state, { [action.id]: { $set: action.activeIndex}});
      break;
    case SET_DEFAULT_TAB_ACTION_TYPE:
      if (state[action.id] == null) {
        state = update(state, {
          [action.id]: {$set: action.activeIndex}
        });
      }
      break;
  }
  return state;
};

export default class ActionTabSegment extends LocalSegment {
  static id() {
    return ID;
  }

  static getActionCreator() {
    return actionCreator;
  }

  static getReducer() {
    return reducer;
  }
}