import React from 'react';
import style from './Modal.css';

import Button from '../Button/Button';

class ModalConfirm extends React.Component {

  static get propTypes() {
    return {
      title: React.PropTypes.string,
      text: React.PropTypes.string,
      handleClose: React.PropTypes.func,
      handleConfirm: React.PropTypes.func,
      handleCancel: React.PropTypes.func
    };
  }

  static get defaultProps() {
    return {
      title: '',
      handleClose: () => {}
    };
  }

  onClickClose() {
    this.props.handleClose();
  }

  handleConfirm() {
    this.props.handleConfirm();
    this.props.handleClose();
  }

  handleCancel() {
    this.props.handleCancel();
    this.props.handleClose();
  }

  render() {
    return (
      <div className={style.modal + ' ' + style.absoluteCenter + ' ' + style.modalConfirm}>
        <div className={style.modalHeader}>{this.props.title}<a className={style.btnClose} onClick={() => this.onClickClose()}>Close</a></div>
        <div className={style.modalBody}>
          {this.props.text}
        </div>
        <div className={style.modalFooter}>
          <Button buttonStyle={Button.STYLE.PRIMARY} handleClick={() => this.handleConfirm()}>Confirm</Button>
          <Button handleClick={() => this.handleCancel()}>Cancel</Button>
        </div>
      </div>
    );
  }
}

export default ModalConfirm;
