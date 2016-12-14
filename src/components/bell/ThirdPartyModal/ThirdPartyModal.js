import React from "react";
import FormSegment from "soya/lib/data/redux/form/FormSegment";
import Form from "soya/lib/data/redux/form/Form";
import {required} from "../../soya-component/dashboard/base/validator/general.js";
import createModal from "../../soya-component/dashboard/common/ModalDisplay/createModal.js";
import Button from "../../soya-component/dashboard/common/Button/Button.js";
import TextBox from "../../soya-component/dashboard/common/FormControl/TextBox/TextBox.js";
import KeyValueGroup from "../../soya-component/dashboard/common/KeyValueGroup/KeyValueGroup.js";
import style from "../../soya-component/dashboard/common/ModalDisplay/modal.mod.css";
import {requiredDigit} from "../Util/ConnectivityUtil";

class ThirdPartyModal extends React.Component{
  componentWillMount(){
    this._form = new Form(this.props.context.store, this.props.namespace);
    this._actions = this.props.context.store.register(FormSegment);
    this._keyValueGroupData = [
      {label: '3rd Supplier Name', value: <TextBox name='thirdSupplierName' placeholder={this.props.data.supplierName} form={this._form} changeValidators={[required]} context={this.props.context} />},
      {label: '3rd Supplier Price', value: <div><span>IDR <TextBox name='thirdSupplierPrice' placeholder={this.props.data.supplierPrice} form={this._form} changeValidators={[requiredDigit]} context={this.props.context}/></span></div>},
      {label: '3rd Supplier Transaction ID', value: <TextBox name='thirdSupplierTxId' placeholder={this.props.data.supplierTxId} form={this._form} changeValidators={[required]} context={this.props.context} />}
    ]
  };

  save() {
    this._form.submit((result) => {
      if (!result.isValid) return;
      this.props.handleSave(
        this.props.id,
        { 
          supplierName: result.values['thirdSupplierName'],
          purchaseCurrency: "IDR",
          purchasePrice: result.values['thirdSupplierPrice'],
          supplierTxId: result.values['thirdSupplierTxId']
        }
      );
      this.props.removeSelf();
    });
  }
  
  render(){
    let topOffset = this.props.index * 50;
    let leftOffset = this.props.index * 50;
    return <div>
      <div className={style.simpleModal} style={{top: `${topOffset}px`, left: `${leftOffset}px`}}>
        <div className={style.modalBody}>
          <KeyValueGroup data={this._keyValueGroupData} />
        </div>
        <div className={style.modalFooter}>
          <Button buttonSize={Button.SIZE.DEFAULT} buttonStyle={Button.STYLE.LINK} handleClick={this.props.removeSelf}>Cancel</Button>&nbsp;&nbsp;
          <Button buttonSize={Button.SIZE.DEFAULT} buttonStyle={Button.STYLE.PRIMARY} handleClick={this.save.bind(this)}>Save</Button>
        </div>
      </div>;
    </div>;         
  }
}

export default createModal(ThirdPartyModal);

