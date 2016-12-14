import LocalSegment from 'soya/lib/data/redux/segment/local/LocalSegment';
import ActionNameUtil from 'soya/lib/data/redux/segment/ActionNameUtil';
import QueryResult from 'soya/lib/data/redux/QueryResult';
import update from 'react-addons-update';

/**
 * Example data:
 *
 * <pre>
 *   {
 *     modals: {
 *       namespace: {
 *         modalId: {
 *           data: {...},
 *           first: true,
 *           index: 0
 *         },
 *         ...
 *       },
 *       ...
 *     },
 *     count: 2,
 *     usedIndexes: [true, null, true],
 *     nextIndex: 4
 *   }
 * </pre>
 *
 * On the insertion of new modal dialog, increment nextIndex.
 * On delete, simply set value in modals map into null.
 *
 * Since each modal dialog is self-contained (there's no ModalLayer anymore), we
 * don't need to return the entire modal dialog list as an ordered array.
 *
 * Since the modal dialog creator will be the one also rendering the modal
 * dialog component, we don't need to build complicated event emitters. The
 * modal dialog creator can simply assign a callback to the modal dialog
 * component that accepts also the data of the modal dialog component.
 *
 * Each modal dialog will be able to render more than one dialog of its type
 * within a constrained namespace. This, coupled with the fact that we no longer
 * need to send events between components makes modal ID obsolete.
 *
 * One thing that is missing will be the actual absolute order of these modals.
 * We need these order to properly render modal dialog's position on top of each
 * other (multiple modal dialogs!). We can opt to use index as a replacement,
 * but with some caveats.
 *
 * If we were to create a 4 modal dialogs, this will create indexes 0, 1, 2, and
 * 3. If somehow dialog index 2 is removed, this will leave number 3 in an
 * awkward position, but it won't change its position, so it's still acceptable.
 *
 * The problem is when all modals are removed, the next time we add a new modal
 * dialog, it will appear with offsets even though it's the first modal dialog.
 * We counter this by resetting nextIndex to zero if the modal window count
 * is zero after deletion.
 *
 * On remove all action, we need to explicitly set the nextIndex back to zero.
 *
 * However we still have the problem of each modal dialog component finding out
 * whether to render a colored overlay or a transparent one. We have to create
 * another variable that signifies whether the modal dialog is the first modal
 * dialog or not.
 *
 * On each insertion of new modal dialog we need to check if it's the first one,
 * and on each deletion of modal dialog we need to check if it's the lowest
 * index number.
 *
 * @CLIENT_SERVER
 */

const MAX_MODAL_WINDOW = 99999;
const ID = 'modalDisplay';

const addActionType = ActionNameUtil.generate(ID, 'ADD');
const setDataActionType = ActionNameUtil.generate(ID, 'SET_DATA');
const removeActionType = ActionNameUtil.generate(ID, 'REMOVE');
const removeAllActionType = ActionNameUtil.generate(ID, 'REMOVE_ALL');

const actionCreator = {
  add(namespace, modalId, data) {
    return {
      type: addActionType,
      namespace: namespace,
      modalId: modalId,
      data: data
    };
  },
  update(namespace, modalId, data) {
    return {
      type: setDataActionType,
      namespace: namespace,
      modalId: modalId,
      data: data
    };
  },
  remove(namespace, modalId) {
    return {
      type: removeActionType,
      namespace: namespace,
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
  if (state == null) state = createInitialData();
  switch (action.type) {
    case addActionType:
      return addModal(state, action);
    case setDataActionType:
      return setModalData(state, action);
    case removeActionType:
      return removeModal(state, action);
    case removeAllActionType:
      return createInitialData()();
  }
  return state;
};

const addModal = function(state, action) {
  state = ensureNamespaceExists(state, action);
  state = removeModal(state, action);
  let first = state.count == 0;
  let index = state.nextIndex;
  state = update(state, {
    count: {$set: state.count + 1},
    nextIndex: {$set: state.nextIndex + 1},
    modals: {
      [action.namespace]: {
        [action.modalId]: {
          $set: {
            index: index,
            first: first,
            data: action.data
          }
        }
      }
    }
  });
  return state;
};

const setModalData = function(state, action) {
  if (state.modals[action.namespace] == null ||
    state.modals[action.namespace][action.modalId] == null) {
    return state;
  }
  return update(state, {
    modals: {
      [action.namespace]: {
        [action.modalId]: {
          data: {$set: action.data}
        }
      }
    }
  });
};

const removeModal = function(state, action) {
  if (state.modals[action.namespace] == null ||
    state.modals[action.namespace][action.modalId] == null) {
    return state;
  }

  let removedModal = state.modals[action.namespace][action.modalId];
  state = update(state, {
    modals: {
      [action.namespace]: {
        [action.modalId]: {$set: null}
      }
    },
    count: {$set: state.count - 1}
  });

  if (state.count <= 0) {
    state = update(state, {
      nextIndex: { $set: 0 }
    });
  }

  if (removedModal.first && state.count > 0) {
    // We need to assign another first layer. We'll do an O(N) loop,
    // building an index would be a hassle, and it's not like we expect
    // more than 10 open modal windows at once anyway.
    let smallestIndex = MAX_MODAL_WINDOW, smallestNamespace, smallestModalId;
    let namespace, modalId, modal;
    for (namespace in state.modals) {
      if (!state.modals.hasOwnProperty(namespace)) continue;
      for (modalId in state.modals[namespace]) {
        if (!state.modals[namespace].hasOwnProperty(modalId)) continue;
        modal = state.modals[namespace][modalId];
        if (modal.index < smallestIndex) {
          smallestIndex = modal.index;
          smallestNamespace = namespace;
          smallestModalId = modalId;
        }
      }
    }
    state = update(state, {
      modals: {
        [smallestNamespace]: {
          [smallestModalId]: {
            first: {$set: true}
          }
        }
      }
    });
  }

  return state;
};

const ensureNamespaceExists = function(state, action) {
  if (!state.modals.hasOwnProperty(action.namespace)) {
    state = update(state, {
      modals: {
        [action.namespace]: {$set: {}}
      }
    });
  }
  return state;
};

const createInitialData = function() {
  return {
    modals: {},
    count: 0,
    nextIndex: 0,
    usedIndexes: []
  };
};

export default class ModalDisplaySegment extends LocalSegment {
  static id() {
    return ID;
  }

  static getActionCreator() {
    return actionCreator;
  }

  static getReducer() {
    return reducer;
  }

  static generateQueryId(query) {
    if (typeof query != 'string') {
      throw new Error('Please query the modal namespace wanted to have. Found: \'' + query + '\'.');
    }
    return query;
  }

  static queryState(query, queryId, segmentState) {
    if (segmentState == null || segmentState.modals == null) return QueryResult.loaded(null);
    return QueryResult.loaded(segmentState.modals[query]);
  }
}