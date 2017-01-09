import React, { PropTypes } from 'react';
import PageNotificationSegment from './PageNotificationSegment';
import connect from 'soya/lib/data/redux/connect';
import HorizontalBarLoading from '../Loading/HorizontalBarLoading';

import style from './PageNotification.mod.css';

let TIMER = 0;
const NOTIF_LIFE_TIME = 5000; // ms

class PageNotification extends React.Component {
  static get propTypes() {
    return {
      result: PropTypes.shape({
        notification: PropTypes.boolean
      })
    };
  }

  static getSegmentDependencies() {
    return [PageNotificationSegment];
  }

  static subscribeQueries(props, subscribe) {
    subscribe(PageNotificationSegment.id(), PageNotification.name, 'notification');
  }

  static show(store, actionCreator, mode, content, autoHide = true) {
    const newState = { show: true, mode, content };
    store.dispatch(
      actionCreator.createUpdateAction({
        [PageNotification.name]: { $set: newState }
      })
    );

    if (autoHide) {
      clearTimeout(TIMER);
      TIMER = setTimeout(() => {
        PageNotification.dismiss(store, actionCreator);
      }, NOTIF_LIFE_TIME);
    }
  }

  static showSuccess(store, actionCreator, content) {
    PageNotification.show(store, actionCreator, PageNotification.mode.SUCCESS, content);
  }
  static showError(store, actionCreator, content) {
    PageNotification.show(store, actionCreator, PageNotification.mode.ERROR, content);
  }
  static showInfo(store, actionCreator, content) {
    PageNotification.show(store, actionCreator, PageNotification.mode.INFO, content);
  }
  static showWarning(store, actionCreator, content) {
    PageNotification.show(store, actionCreator, PageNotification.mode.WARNING, content);
  }
  static showLoading(store, actionCreator, content) {
    PageNotification.show(store, actionCreator, PageNotification.mode.LOADING, null, false);
  }

  static dismiss(store, actionCreator) {
    const newState = {
      show: false
    };
    store.dispatch(
      actionCreator.createUpdateAction({
        [PageNotification.name]: { $merge: newState }
      })
    );
  }

  _handleDismiss() {
    PageNotification.dismiss(
      this.props.getReduxStore(),
      this.props.getActionCreator(PageNotificationSegment.id())
    );
    this.props.userHandleDismiss();
  }

  static get mode() {
    return {
      ERROR: 'error',
      SUCCESS: 'success',
      INFO: 'info',
      WARNING: 'warning',
      LOADING: 'loading'
    };
  }

  _formatBody(mode, content) {
    switch (mode) {
      case PageNotification.mode.LOADING:
        return (
          <div className={style.body}>
            <div className={style.icon}>
              <HorizontalBarLoading color={'#212121'} />
            </div>
            <div className={style.content} dangerouslySetInnerHTML={{ __html: content }}></div>
          </div>
        );
      case PageNotification.mode.INFO:
      case PageNotification.mode.WARNING:
      case PageNotification.mode.ERROR:
      case PageNotification.mode.SUCCESS:
      default:
        return (
          <div className={style.body}>
            <div className={style.content} dangerouslySetInnerHTML={{ __html: content }}></div>
          </div>
        );
    }
  }

  render() {
    const defaultState = this.props.result.notification || { show: false, mode: PageNotification.mode.INFO, content: '' };
    const classOpen = (defaultState.show) ? style.open : '';
    return (
      <div className={style.wrapper + ' ' + style[defaultState.mode] + ' ' + classOpen}>
        {this._formatBody(defaultState.mode, defaultState.content)}
        <a href='javascript:;' onClick={this._handleDismiss.bind(this)} className={style.dismissButton}>×</a>
      </div>
    );
  }
}

class PageNotificationAction {
  constructor(store) {
    this.store = store;
    this.actionCreator = this.store.register(PageNotificationSegment);
  }
  showSuccess(content) {
    PageNotification.show(this.store, this.actionCreator, PageNotification.mode.SUCCESS, content);
  }
  showError(content) {
    PageNotification.show(this.store, this.actionCreator, PageNotification.mode.ERROR, content);
  }
  showInfo(content) {
    PageNotification.show(this.store, this.actionCreator, PageNotification.mode.INFO, content);
  }
  showWarning(content) {
    PageNotification.show(this.store, this.actionCreator, PageNotification.mode.WARNING, content);
  }
  showLoading() {
    PageNotification.show(this.store, this.actionCreator, PageNotification.mode.LOADING, null, false);
  }
  show(mode, content) {
    PageNotification.show(this.store, this.actionCreator, mode, content);
  }
  dismiss() {
    PageNotification.dismiss(this.store, this.actionCreator);
  }
  static get mode() {
    return PageNotification.mode;
  }
}

export { PageNotificationSegment, PageNotificationAction, PageNotification };
export default connect(PageNotification);
