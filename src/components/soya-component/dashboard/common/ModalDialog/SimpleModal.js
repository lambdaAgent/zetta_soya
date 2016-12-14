import React from 'react';
import Component from '../../base/Component';

import Button from '../Button/Button.js';
import ModalBase from './ModalBase';

const style = ModalBase.style;

/**
 * Generic modal component
 *
 * Usage
 * ---------------------------------
 * const addModalAction = this.modalActions.add(SimpleModal, 'ModalId', {
 *    data: {
 *      header: 'Sample Modal',
 *      body: <div></div>
 *    },
 *    context: this.props.context,
 *    eventEmitter: this.props.eventEmitter
 * });
 * this.store.dispatch(addModalAction);
 */
  
class SimpleModal extends Component.ContextComponent {
  static type() {
    return 'SimpleModal';
  }

  static getCancelEvent(modalId) {
    return SimpleModal.modalType + '.' + 'cancel.' + modalId;
  }

  static getConfirmEvent(modalId) {
    return SimpleModal.modalType + '.' + 'confirm.' + modalId;
  }

  static getWorkingEvent(modalId) {
    return SimpleModal.modalType + '.' + 'working.' + modalId;
  }

  componentWillMount() {
    this.setState({ working: false });
    this.props.eventEmitter.on(SimpleModal.getWorkingEvent(this.props.id), data => {
      this.setState({ working: data });
    });
  }

  handleOk() {
    this.props.eventEmitter.emit(SimpleModal.getConfirmEvent(this.props.id));
  }

  handleCancel() {
    this.props.eventEmitter.emit(SimpleModal.getCancelEvent(this.props.id));
    this.props.removeSelf();
  }

  render() {
    const cssLevel = {
      top: this.props.level * 20,
      left: this.props.level * 20
    };

    return (
      <div className={style.simpleModal} level={this.props.level} style={cssLevel}>
        <div className={style.modalHeader}>
          {this.props.data.header}
          <a href='javascript:;' onClick={this.handleCancel.bind(this)} className={style.closeBtn}>×</a>
        </div>
        <div className={style.modalBody}>
          {this.props.data.body}
        </div>
        <div className={style.modalFooter}>
          <Button buttonStyle={Button.STYLE.LINK} onClick={this.handleCancel.bind(this)}>Cancel</Button>&nbsp;&nbsp;&nbsp;
          <Button working={this.state.working} buttonStyle={Button.STYLE.BLUE} onClick={this.handleOk.bind(this)}>{this.props.data.okText ? this.props.data.okText : 'OK'}</Button>
        </div>
      </div>
    );
  }
}

export default SimpleModal;
