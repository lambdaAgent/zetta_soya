import React from 'react';
import createModal from '../ModalDisplay/createModal.js';
import style from '../ModalDisplay/modal.mod.css';

import Button from '../Button/Button.js';

class ConfirmModal extends React.Component {
  static get propTypes() {
    return {
      removeSelf: React.PropTypes.func,
      handleConfirm: React.PropTypes.func,
      index: React.PropTypes.number,
      title: React.PropTypes.string,
      content: React.PropTypes.string,
    };
  }
  confirm() {
    this.props.removeSelf();
    this.props.handleConfirm();
  }

  cancel() {
    this.props.removeSelf();
  }

  render() {
    const topOffset = this.props.index * 50;
    const leftOffset = this.props.index * 50;
    return (
      <div
        className={style.simpleModal}
        style={{ top: `${topOffset}px`, left: `${leftOffset}px` }}
      >
        <div className={style.modalHeader}>{this.props.title}</div>
        <div className={style.modalBody}>
          {this.props.content}
        </div>
        <div className={style.modalFooter}>
          <Button buttonSize={Button.SIZE.DEFAULT} buttonStyle={Button.STYLE.LINK} handleClick={this.cancel.bind(this)}>{'Cancel'}</Button>&nbsp;&nbsp;
          <Button buttonSize={Button.SIZE.DEFAULT} buttonStyle={Button.STYLE.PRIMARY} handleClick={this.confirm.bind(this)}>{'Proceed'}</Button>
        </div>
      </div>
    );
  }
}

export default createModal(ConfirmModal);
