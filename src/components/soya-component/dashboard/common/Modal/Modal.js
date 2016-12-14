import React from 'react';
import ClassNames from 'classnames';
import style from './Modal.css';

class Modal extends React.Component {

  static get propTypes() {
    return {
      title: React.PropTypes.string,
      handleClose: React.PropTypes.func,
      size: React.PropTypes.number,
    };
  }

  static get defaultProps() {
    return {
      title: '',
      handleClose: () => {}}
    ;
  }

  onClickClose() {
    this.props.handleClose();
  }

  render() {
    return (
      <div className={ClassNames(style.modal, style.absoluteCenter, style['modalSize' + this.props.size])}>
        <div className={style.modalHeader}>{this.props.title}<a className={style.btnClose} onClick={() => this.onClickClose()}>Close</a></div>
        <div className={style.modalBody}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
