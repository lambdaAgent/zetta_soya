import React from 'react';
import createModal from './createModal.js';
import ModalDisplaySegment from './ModalDisplaySegment.js';
import Button from '../Button/Button.js';

import style from './modal.mod.css';

class SampleModal extends React.Component {
  callHandleClick() {
    this.props.handleClick(this.props.data);
  }
  
  render() {
    let topOffset = this.props.index * 50;
    let leftOffset = this.props.index * 50;
    return <div className={style.simpleModal} style={{top: `${topOffset}px`, left: `${leftOffset}px`}}>
      <div className={style.modalHeader}>Sample Modal</div>
      <div className={style.modalBody}>
        {this.props.message}
      </div>
      <div className={style.modalFooter}>
        <Button buttonSize={Button.SIZE.DEFAULT} buttonStyle={Button.STYLE.PRIMARY} handleClick={this.callHandleClick.bind(this)}>OK</Button>&nbsp;&nbsp;
        <Button buttonSize={Button.SIZE.DEFAULT} buttonStyle={Button.STYLE.RED} handleClick={this.props.removeSelf}>Close</Button>
      </div>
    </div>;
  }
}

var ConnectedSampleModal = createModal(SampleModal);

export default class ModalDisplayThumbnail extends React.Component {
  componentWillMount() {
    this.actions = this.props.context.store.register(ModalDisplaySegment);
  }

  render() {
    return <div>
      <Button buttonSize={Button.SIZE.DEFAULT} buttonStyle={Button.STYLE.PRIMARY} handleClick={this.launchModal.bind(this)}>Launch Modal</Button>&nbsp;
      <Button buttonSize={Button.SIZE.DEFAULT} buttonStyle={Button.STYLE.PRIMARY} handleClick={this.launchMultipleModal.bind(this)}>Launch Multiple Modal</Button>
      <ConnectedSampleModal namespace="modalDisplay" handleClick={this.handleClick.bind(this)} context={this.props.context} zIndex={1001} />
    </div>;
  }

  launchModal() {
    var addModal = this.actions.add('modalDisplay', '1', "You're cool!");
    this.props.context.store.dispatch(addModal);
  }

  launchMultipleModal() {
    this.props.context.store.dispatch(this.actions.add('modalDisplay', '1', "Modal number 1"));
    this.props.context.store.dispatch(this.actions.add('modalDisplay', '2', "Modal number 2"));
    this.props.context.store.dispatch(this.actions.add('modalDisplay', '3', "Modal number 3"));
    this.props.context.store.dispatch(this.actions.add('modalDisplay', '4', "Modal number 4"));
  }

  handleClick(data) {
    alert(`Accepted data: ${data}`);
  }
}