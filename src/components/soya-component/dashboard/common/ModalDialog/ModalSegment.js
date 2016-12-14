import LocalSegment from 'soya/lib/data/redux/segment/local/LocalSegment';
import ActionNameUtil from 'soya/lib/data/redux/segment/ActionNameUtil';
import update from 'react-addons-update';

const ID = 'modal';

const addActionType = ActionNameUtil.generate(ID, 'ADD');
const setDataActionType = ActionNameUtil.generate(ID, 'SET_DATA');
const removeActionType = ActionNameUtil.generate(ID, 'REMOVE');
const removeAllActionType = ActionNameUtil.generate(ID, 'REMOVE_ALL');

const actionCreator = {
  add(modalId, modalType, props) {
    return {
      type: addActionType,
      modalId: modalId,
      modalType: modalType,
      props: props
    };
  },
  update(modalId, props) {
    return {
      type: setDataActionType,
      modalId: modalId,
      props: props
    };
  },
  remove(modalId) {
    return {
      type: removeActionType,
      modalId: modalId
    };
  },
  removeAll() {
    return {
      type: removeAllActionType
    };
  }
};

const reducer = function(state, action) {
  if (state == null) state = [];
  switch (action.type) {
    case addActionType:
      return addModal(state, action);
    case setDataActionType:
      return setModalData(state, action);
    case removeActionType:
      return removeModal(state, action);
    case removeAllActionType:
      return [];
  }
  return state;
};

const addModal = function(state, action) {
  state = removeModal(state, action);
  return update(state, { $push: [{
    modalId: action.modalId,
    modalType: action.modalType,
    props: action.props
  }] });
};

const setModalData = function(state, action) {
  const index = find(state, action.modalId);
  if (index <= -1) {
    return state;
  }
  return update(state, { [index]: { props: { $set:
  action.props
  } } });
};

const removeModal = function(state, action) {
  const index = find(state, action.modalId);
  if (index > -1) {
    state = update(state, { $splice: [[index, 1]] });
  }
  return state;
};

/**
 * @param {Object} state
 * @param {string} modalId
 * @returns {number}
 */
const find = function(state, modalId) {
  // Assuming that in a normal application, your modal window count won't
  // be more than 10, we need no indexes.
  let i, modal;
  for (i = 0; i < state.length; i++) {
    modal = state[i];
    if (modal.modalId == modalId) {
      return i;
    }
  }
  return -1;
};

export default class ModalSegment extends LocalSegment {
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