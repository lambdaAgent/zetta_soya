import React from 'react';
import style from './Modal.css';

import Modal from './Modal';
import ModalConfirm from './ModalConfirm';

class ModalLayer extends React.Component {

  static get propTypes() {
    return {
      modalType: React.PropTypes.string,
      modalData: React.PropTypes.object,
      handleClose: React.PropTypes.func
    };
  }

  static get defaultProps() {
    return {
      modalType: 'MODAL_DEFAULT',
      modalData: {},
      handleClose: () => {}
    };
  }

  get TYPE() {
    return {
      MODAL_DEFAULT: 'MODAL_DEFAULT',
      MODAL_CONFIRM: 'MODAL_CONFIRM',
    }
  }

  render() {
    let modalWindow;
    const TYPE = this.TYPE;
    switch (this.props.modalType) {
      case TYPE.MODAL_DEFAULT:
        modalWindow = <Modal handleClose={() => this.props.handleClose()} {...this.props.modalData}>
            {this.props.modalData.text}
            {this.props.modalData.content}
          </Modal>;
        break;
      case TYPE.MODAL_CONFIRM:
        modalWindow = <ModalConfirm title={this.props.modalData.title}
                                    text={this.props.modalData.text}
                                    handleClose={() => this.props.handleClose()}
                                    handleConfirm={() => this.props.modalData.handleConfirm ? this.props.modalData.handleConfirm() : null}
                                    handleCancel={() => this.props.modalData.handleConfirm ? this.props.modalData.handleCancel() : null}
        />;
        break;
    }
    return (
      <div className={style.modalLayer}>
        <div className={style.modalOverlayBlack}>
          <div className={style.modalContainer}>
            {modalWindow}
          </div>
        </div>
      </div>
    );
  }
}

export default ModalLayer;
