import React from 'react';
import FormSegment from 'soya/lib/data/redux/form/FormSegment';
import Form from 'soya/lib/data/redux/form/Form';
import { required } from '../../base/validator/general.js';

import createModal from '../ModalDisplay/createModal.js';
import Button from '../Button/Button.js';
import FilePicker from '../FormControl/FilePicker/FilePicker';
import TextArea from '../FormControl/TextArea/TextArea.js';
import style from '../ModalDisplay/modal.mod.css';
  
class FilePickerModal extends React.Component{
  componentWillMount(){
    this._form = new Form(this.props.context.store, this.props.namespace);
  };

  save() {
    this._form.submit((result) => {
      if (!result.isValid) return;
      this.props.handleSave(
        result.values['file'],
        result.values['reason']
      );
      this.props.removeSelf();
    });
  }
  
  render(){
    let topOffset = this.props.index * 50;
    let leftOffset = this.props.index * 50;
    return <div>
      <div className={style.simpleModal} style={{top: `${topOffset}px`, left: `${leftOffset}px`}}>
        <div className={style.modalHeader}>
          Upload File
        </div>
        <div className={style.modalBody}>
          <FilePicker name='file' multiple={true} helpText='attach one file or more' form={this._form} context={this.props.context} />
          {this.props.data.reason ?
            <div>
              <TextArea name='reason' placeholder='Reason' form={this._form} minHeight={100}
                        changeValidators={[required]} context={this.props.context} />
            </div>
          : null}
        </div>
        <div className={style.modalFooter}>
          <Button buttonSize={Button.SIZE.DEFAULT} buttonStyle={Button.STYLE.LINK} handleClick={this.props.removeSelf}>Cancel</Button>&nbsp;&nbsp;
          <Button buttonSize={Button.SIZE.DEFAULT} buttonStyle={Button.STYLE.PRIMARY} handleClick={this.save.bind(this)}>Save</Button>
        </div>
      </div>;
    </div>;         
  }
}

export default createModal(FilePickerModal);

