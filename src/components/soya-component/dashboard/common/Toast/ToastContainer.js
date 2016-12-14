import React from 'react';
import style from './Toast.css';

import Toast from './Toast';

class ToastContainer extends React.Component {

  static get propTypes() {
    return {
      handleClose: React.PropTypes.func,
      messages: React.PropTypes.array
    };
  }

  static get defaultProps() {
    return {
      messages: []
    };
  }

  handleClose(id) {
    let updatedMessage = this.props.messages;
    updatedMessage.splice(id,1);
    this.props.handleChange(updatedMessage);
  }

  handleCloseAll() {
    this.props.handleChange([]);
  }

  render() {
    let toasts = []
    for (let i = this.props.messages.length - 1; i >= 0; i--) {
      const message = this.props.messages[i];
      toasts.push(<Toast key={i} handleClose={() => this.handleClose(i)}>{message}</Toast>);
    }
    return (
      <div className={style.toastContainer}>
        {toasts}
        <div className={style.toast2}>
          <a className={style.toastCloseAll} onClick={() => this.handleCloseAll()}>close all</a>
        </div>
      </div>
    );
  }
}

export default ToastContainer;
