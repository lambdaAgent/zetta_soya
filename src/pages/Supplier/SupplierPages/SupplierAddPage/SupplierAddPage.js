import ReduxPage from 'soya/lib/page/ReduxPage';
import ReactRenderer from 'soya/lib/page/react/ReactRenderer';
import register from 'soya/lib/client/Register';
import RenderResult from 'soya/lib/page/RenderResult';
import React from 'react';
import {routeRequirement} from '../../../../shared/routeRequirement.js';
import Form from 'soya/lib/data/redux/form/Form';
import SupplierSegment from '../../../../segmentsAndServices/SupplierSgmSrv/SupplierSegment.js';

// component
import Navbar from '../../../../components/zetta/Navbar/Navbar.js';
import Button from '../../../../components/soya-component/dashboard/common/Button/Button.js';
import TextBox from '../../../../components/soya-component/dashboard/common/FormControl/TextBox/TextBox.js';
import TextArea from '../../../../components/soya-component/dashboard/common/FormControl/TextArea/TextArea.js';
import Radio from '../../../../components/soya-component/dashboard/common/FormControl/Radio/Radio.js';
import Dropdown from '../../../../components/soya-component/dashboard/common/FormControl/Dropdown/Dropdown.js';
import PageNotificationThumbnail from '../../../../components/soya-component/dashboard/common/PageNotification/ComponentThumbnail.js';
import PageNotificationContainer, { PageNotificationAction } from '../../../../components/soya-component/dashboard/common/PageNotification/PageNotification.js';
import Breadcrumb from '../../../../components/zetta/Breadcrumb/Breadcrumb.js';
import ReactGoogleMap from '../../../../components/soya-component/dashboard/external/GoogleMaps/GoogleMaps.js';

const FORM_ID = 'addSupplierForm';
const required = function required(value) {
  if (!value || value == null || value == '') return 'This field is required.';
  return true;
};


class Component extends React.Component {
  constructor(props){
    super(props);
    this.state = {url: ""};
    this.submit = this.submit.bind(this);

  }
  componentDidMount(){
    this._form = new Form(this.props.context.store, FORM_ID);
    this.actions = this.props.context.store.register(SupplierSegment);
    this.notification = new PageNotificationAction(this.props.context.reduxStore);
    this.setState({url: window.location.href});
  }

  submit(e){
    const self = this;
    let submittedForm = {};
    let callback = function(result) {
      if (result.isValid) {
        self.props.context.store.dispatch(self.actions.addSupplierByName(submittedForm, self.props.context.router));
        //if 200 then redirect
      }
    };

    let formWideValidation = function(data) {
      const errorMessages = validateEmptyInputs(data);
      // if (errorMessages.length > 0) {
      //   return {
      //     isValid: false,
      //     errorMessages: errorMessages
      //   }
      // }

      submittedForm = data;
      return {isValid: false, errorMessages:{}};
    };
    this._form.submit(callback, formWideValidation);
  }



  render(){
    const options = [
      { text: 'Apple', value: 'apple' },
      { text: 'Banana', value: 'banana' },
      { text: 'Cranberry', value: 'cranberry' }
    ];

    const businessCategoryOptions = [
      {text: 'Taman Hiburan', value: 'tamanHiburan'},
      {text: 'Atraksi Binatang', value: 'atraksiBinatang'},
      {text: 'Pertunjukan', value: 'pertunjukan'},
      {text: 'soo', value: 'soo'},
      {text: 'Atraksi Dalam Ruangan', value: 'atraksiDalamRuangan'},
      {text: 'Atraksi Luar Ruangan', value: 'atraksiLuarRuangan'},
      {text: 'Permainan Air', value: 'permainanAir'},
      // {title: 'Lainnya____', value: ''} // this is supposed to be bind to the e.target.value
    ];


    return <div>
      <Navbar context={this.props.context} active={'SUPPLIERS'} />
      <PageNotificationContainer context={this.props.context}/>

      {/*<Breadcrumb path={this.state.url} domain={'http://localhost:4000'} context={this.props.context} />*/}
      <h1>Create New Supplier</h1>
      <label>Company Name</label>
      <TextBox form={this._form} context={this.props.context}
               name='companyName' placeholder='Type here to see demo...'/>

      <ReactGoogleMap
        apiKey={"please put example apiKey"}
      />

      <label>TaxID NPWP/DKPP</label>
      <TextBox form={this._form} context={this.props.context}
               name='taxID' placeholder='Type here to see demo...'/>

      <label>Owner Name</label>
      <TextBox form={this._form} context={this.props.context}
               name='ownerName' placeholder='Type here to see demo...'/>

      <label>Main Company Address</label>
      <TextArea form={this._form} context={this.props.context}
               name='companyAddress' placeholder='Type here to see demo...'/>

      <label>Owner Mobile Number</label>
      <TextBox form={this._form} context={this.props.context}
               name='ownerMobileNumber' placeholder='Type here to see demo...'/>

      <label>Owner Email</label>
      <TextBox form={this._form} context={this.props.context}
               name='ownerEmail' placeholder='Type here to see demo...'/>
      <label>Business Category</label>
      <Radio name='businessCategory' options={businessCategoryOptions} form={this._form} context={this.props.context} />

      <h4>TODO: Add other PIC, ask the team about details of this element</h4>
      <h4>payment??</h4>
      <h1>PIC</h1>
      <div> {/*This is another separate individual form */}
        <pre><code>How to know the number of PIC?? use this.state? </code></pre>
        <label>PIC Name</label>
        <TextBox form={this.form} context={this.props.context}
                 name="PICName" placeholder="type your name here"/>

        <pre><code>This button will show notification to tell the use to fill current PIC first </code></pre>
        <pre><code>Cannot add another PIC until the current PIC has all been field </code></pre>
        <Button>Add Other PIC</Button>
      </div>

      <div style={{border: "1px solid black"}}>
        Payment
        Terms Of Payment
        <Radio name='businessCategory' options={[{text: 'Daily' ,value: 'daily'}, {text: 'Weekly', value: 'weekly'}, {text: 'Monthly', value: 'monthly'}]} form={this._form} context={this.props.context} />
        <div>
          <label>Bank Name</label>

          <div style={{display: 'flex'}}>
            <div style={{width: "20%", display:"inline-block"}}>
              <Dropdown defaultValue={'BCA'}
                        form={this.form} context={this.props.context}>
                <option>{'BCA'}</option>
                <option>{'Mandiri'}</option>
                <option>{'Other'}</option>
              </Dropdown>
            </div>

            <div style={{width: "80%",display: 'inline-block'}}>
              <TextBox form={this.form} context={this.props.context}></TextBox>
            </div>
          </div>


          <label>Beneficiary Name</label>
          <TextBox form={this.form} context={this.props.context}></TextBox>

          <label>Bank Branch</label>
          <TextBox form={this.form} context={this.props.context}></TextBox>

          <label>Swift Code</label>
          <TextBox form={this.form} context={this.props.context}></TextBox>

          <label>Finance PIC Name</label>
          <TextBox form={this.form} context={this.props.context}></TextBox>

          <label>Mobile Number</label>
          <TextBox form={this.form} context={this.props.context}></TextBox>

          <label>Email</label>
          <TextBox form={this.form} context={this.props.context}></TextBox>
        </div>

      </div>

      <label>Market Manager</label>
      <Dropdown name="marketManager" form={this._form} context={this.props.context}>
        <option>{'Dimas'}</option>
        <option>{'how can this page has information about supplier?'}</option>
      </Dropdown>
      <button onClick={this.submit.bind(this)}>Save Supplier, if success ask server to redirect and send the message</button>
    </div>
  }
}



class SuppliersPage extends ReduxPage {
  static get pageName(){
    return 'Supplier_add';
  }

  static getRouteRequirements() {
    return routeRequirement;
  }

  render(httpRequest, routeArgs, store, callback){
    let reactRenderer = new ReactRenderer();
    reactRenderer.head = '<title>Supplier Add Page</title>';
    reactRenderer.body = React.createElement(Component, {
      context: this.createContext(store),
      userId: 'thisIsUserId'
    });
    let renderResult = new RenderResult(reactRenderer);
    callback(renderResult);
  }
}

register(SuppliersPage);
export default SuppliersPage;


function validateEmptyInputs(obj){
  let errorMessages = [];
  for (var key in obj){
    if( !Boolean(obj[key]) ){
      errorMessages.push({
        fieldName: key,
        messages: [`${key} cannot be empty`]
      });
    }
  }

  return errorMessages;
}