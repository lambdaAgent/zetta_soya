import React from 'react';
import style from './Toast.css';

class Toast extends React.Component {

  static get propTypes() {
    return {
      handleClose: React.PropTypes.func,
    };
  }

  static get defaultProps() {
    return {};
  }

  handleClose() {
    this.props.handleClose();
  }

  render() {
    return (
      <div className={style.toast}>
        <span className={style.toastMessage}>{this.props.children}</span>
        <a className={style.toastClose} onClick={() => this.handleClose()}>close</a>
      </div>
    );
  }
}

export default Toast;
