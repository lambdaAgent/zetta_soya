import React from 'react';
import createModal from '../ModalDisplay/createModal.js';
import Form from 'soya/lib/data/redux/form/Form';
import style from '../ModalDisplay/modal.mod.css';
import FormSegment from 'soya/lib/data/redux/form/FormSegment';

import { required } from '../../base/validator/general.js';
import Button from '../Button/Button.js';
import TextArea from '../FormControl/TextArea/TextArea.js';

class ReasonModal extends React.Component {
  componentWillMount() {
    this.form = new Form(this.props.context.store, this.props.namespace);
  }

  save() {
    this.form.submit((result) => {
      if (!result.isValid) return;
      this.props.handleSave(
        this.props.modalId,
        result.values[`${this.props.modalId}-reason`]
      );
      this.props.removeSelf();
    });
  }

  render() {
    let topOffset = this.props.index * 50;
    let leftOffset = this.props.index * 50;
    return <div className={style.simpleModal} style={{top: `${topOffset}px`, left: `${leftOffset}px`}}>
      <div className={style.modalBody}>
        <div>
          <h4>Reason</h4>
          <TextArea name={`${this.props.modalId}-reason`} form={this.form} minHeight={100} changeValidators={[required]} context={this.props.context} />
        </div>
      </div>
      <div className={style.modalFooter}>
        <Button buttonSize={Button.SIZE.DEFAULT} buttonStyle={Button.STYLE.LINK} handleClick={this.props.removeSelf}>Cancel</Button>&nbsp;&nbsp;
        <Button buttonSize={Button.SIZE.DEFAULT} buttonStyle={Button.STYLE.PRIMARY} handleClick={this.save.bind(this)}>Proceed</Button>
      </div>
    </div>;
  }
}

export default createModal(ReasonModal);