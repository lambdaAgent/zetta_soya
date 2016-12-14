import React from 'react';
import createModal from '../ModalDisplay/createModal.js';

import style from '../ModalDisplay/modal.mod.css';
import BallClipRotate from '../Loading/BallClipRotate.js';

class LoadingModal extends React.Component {
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
      <div className={style.simpleModal} style={{ top: `${topOffset}px`, width: '170px', left: `${leftOffset}px` }}>
        <div className={style.modalBody} style={{textAlign: 'center'}}>
          <p style={{ fontSize: '20px' }}>Please wait</p>
          <BallClipRotate color="green" />
        </div>
      </div>
    );
  }
}

export default createModal(LoadingModal);
