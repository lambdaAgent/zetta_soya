import LocalSegment from 'soya/lib/data/redux/segment/local/LocalSegment';
import ActionNameUtil from 'soya/lib/data/redux/segment/ActionNameUtil';
import update from 'react-addons-update';

/**
 * TODO: Sem add comments.
 *
 * @CLIENT_SERVER
 */

const ID = 'accordion';

const EXPAND_ACTION_TYPE = ActionNameUtil.generate(ID, 'EXPAND');
const EXPAND_ALL_ACTION_TYPE = ActionNameUtil.generate(ID, 'EXPAND_ALL');
const COLLAPSE_ACTION_TYPE = ActionNameUtil.generate(ID, 'COLLAPSE');
const COLLAPSE_ALL_ACTION_TYPE = ActionNameUtil.generate(ID, 'COLLAPSE_ALL');
const UNMOUNT_BODY_ACTION_TYPE = ActionNameUtil.generate(ID, 'UNMOUNT_BODY');
const UNMOUNT_BODY_ALL_ACTION_TYPE = ActionNameUtil.generate(ID, 'UNMOUNT_BODY_ALL');

const actionCreator = {
  expand(accordionId, accordionItemIndex) {
    return {
      type: EXPAND_ACTION_TYPE,
      accordionId: accordionId,
      accordionItemIndex: accordionItemIndex,
      state: { expand: true, mount: true }
    };
  },
  expandAll(accordionId) {
    return {
      type: EXPAND_ALL_ACTION_TYPE,
      accordionId: accordionId,
      state: { expand: true, mount: true }
    };
  },
  collapse(accordionId, accordionItemIndex) {
    return {
      type: COLLAPSE_ACTION_TYPE,
      accordionId: accordionId,
      accordionItemIndex: accordionItemIndex,
      state: { expand: false, mount: true }
    };
  },
  unmountBody(accordionId, accordionItemIndex) {
    return {
      type: UNMOUNT_BODY_ACTION_TYPE,
      accordionId: accordionId,
      accordionItemIndex: accordionItemIndex,
      state: { expand: false, mount: false }
    };
  },
  collapseAll(accordionId) {
    return {
      type: COLLAPSE_ALL_ACTION_TYPE,
      accordionId: accordionId,
      state: { expand: false, mount: true }
    };
  },
  unmountBodyAll(accordionId) {
    return {
      type: UNMOUNT_BODY_ALL_ACTION_TYPE,
      accordionId: accordionId,
      state: { expand: false, mount: false }
    };
  }
};

const reducer = function(state, action) {
  if (state === null || state === undefined) state = {};
  switch (action.type) {
    case EXPAND_ACTION_TYPE:
      return setState(state, action);
    case EXPAND_ALL_ACTION_TYPE:
      return setAllState(state, action);
    case COLLAPSE_ACTION_TYPE:
      return setState(state, action);
    case COLLAPSE_ALL_ACTION_TYPE:
      return setAllState(state, action);
    case UNMOUNT_BODY_ACTION_TYPE:
      return setState(state, action);
    case UNMOUNT_BODY_ALL_ACTION_TYPE:
      return setAllState(state, action);
  }
  return state;
};

const setState = function(state, action) {
  state = ensureAccordionExistence(state, action);
  state = update(state, {
    [action.accordionId]: {
      [action.accordionItemIndex+''] : {
        $set: {
          state: action.state,
          mount: action.mount
        }
      }
    }
  });
  return state;
};

const setAllState = function(state, action) {
  state = ensureAccordionExistence(state, action);
  const items = state[action.accordionId];
  for(const _i in items) {
    if (items.hasOwnProperty(_i)) {
      state = update(state, {
        [action.accordionId]: {
          [_i+''] : {
            $set: {
              state: action.state,
              mount: action.mount
            }
          }
        }
      });
    }
  }
  return state;
};

const ensureAccordionExistence = function(state, action) {
  const accordion = state[action.accordionId];
  if (accordion == null) {
    state = update(state, { [action.accordionId]: { $set: {} } });
  }
  return state;
};

export default class AccordionSegment extends LocalSegment {
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