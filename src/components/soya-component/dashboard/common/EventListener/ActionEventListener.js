import scope from 'soya/lib/scope';

class ActionEventListener {
  constructor(event, action, el) {
    this._el = el;
    this._event = event;
    this._action = action;

    if (scope.client && !this._el) {
      this._el = document;
    }
  }

  listen() {
    if (scope.client) {
      this._el.addEventListener(this._event, this._action, true);
    }
  }

  destroy() {
    if (scope.client) {
      this._el.removeEventListener(this._event, this._action, true);
    }
  }

  /**
   *
   * @param eventType: get from ActionEventListener.event
   * @param param: can be { el, callback } | callback depends on the eventType
   * @param el: can be null if it's document
   * @returns {ActionEventListener}
   */
  static createPredefinedEvent(eventType, param, el) {
    switch (eventType) {
      case ActionEventListener.event.SAVE_KEY: return new ActionEventListener('keydown', ActionEventListener.eventSaveKey(param), el);
      case ActionEventListener.event.CLICK_OUTSIDE: return new ActionEventListener('click', ActionEventListener.eventClickedOutside(param), el);
      case ActionEventListener.event.CTRL_K: return new ActionEventListener('keydown', ActionEventListener.eventSearchMenu(param), el);
    }
  }

  // ------------------- Predefined event -----------------------------------------------------------------------------
  static eventSaveKey(callback) {
    return event => {
      if (event.which == 83 && event.ctrlKey) {
        event.preventDefault();
        callback(event);
      }
    };
  }

  static eventClickedOutside(param) {
    const { el, callback } = param;
    return event => {
      if ((!el || !el.contains(event.target))) {
        callback(event);
      }
    };
  }

  static eventSearchMenu(callback) {
    return event => {
      if(event.which ===75 && event.ctrlKey){
        event.preventDefault();
        callback(event);
      }
    }
  }
  // ------------------------------------------------------------------------------------------------------------------

  // ----- eventType --------------------------------------------------------------------------------------------------
  static get event() {
    return {
      SAVE_KEY: 'SAVE_KEY',
      CLICK_OUTSIDE: 'CLICK_OUTSIDE',
      CTRL_K: 'CTRL_K'
    };
  }
}

export default ActionEventListener;
