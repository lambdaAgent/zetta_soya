import React from 'react';

import ModalRegister from './ModalRegister.js';
import ModalContainer from './ModalContainer.js';
import Button from '../Button/Button.js';
import ModalSegment from './ModalSegment.js';
import ModalBase from './ModalBase.js'

class SampleModal extends ModalBase {
  static type() {
    return 'SampleModal';
  }

  static okButtonEventName(modalId) {
    return `${SampleModal.type()}.${modalId}`;
  }

  emitEvent() {
    this.props.context.emitter.emit(SampleModal.okButtonEventName(this.props.id), `You're cool!`);
  }

  render() {
    var style = ModalBase.style;
    return <div className={style.simpleModal}>
      <div className={style.modalHeader}>Sample Modal</div>
      <div className={style.modalBody}>
        {this.props.message}
      </div>
      <div className={style.modalFooter}>
        <Button buttonSize={Button.SIZE.DEFAULT} buttonStyle={Button.STYLE.PRIMARY} handleClick={this.emitEvent.bind(this)}>OK</Button>&nbsp;&nbsp;
        <Button buttonSize={Button.SIZE.DEFAULT} buttonStyle={Button.STYLE.RED} handleClick={this.props.removeSelf}>Close</Button>
      </div>
    </div>;
  }
}

export default class ModalContainerThumbnail extends React.Component {
  static get sampleModalId() {
    return '1';
  }

  componentWillMount() {
    // Pass ModalRegister to other components that might need to create a modal window.
    this.modalRegister = new ModalRegister();
    this.modalRegister.register(SampleModal);
    this.actions = this.props.context.reduxStore.register(ModalSegment);

    // Listen to the modal window ok button being clicked!
    let eventName = SampleModal.okButtonEventName(ModalContainerThumbnail.sampleModalId);
    this.props.context.emitter.on(eventName, this.modalOkButtonHandler);
  }

  openModal() {
    var openModalAction = this.actions.add(ModalContainerThumbnail.sampleModalId, SampleModal.type(), {
      message: 'Hello, this is sample modal!'
    });
    this.props.context.store.dispatch(openModalAction);
  }

  modalOkButtonHandler(data) {
    alert(`I got the message: ${data}`);
  }

  render() {
    return <div>
      <Button buttonSize={Button.SIZE.DEFAULT} buttonStyle={Button.STYLE.PRIMARY} handleClick={this.openModal.bind(this)}>
        Open Modal
      </Button>
      <ModalContainer modalRegister={this.modalRegister} context={this.props.context} emitter={this.emitter} />
    </div>;
  }
}