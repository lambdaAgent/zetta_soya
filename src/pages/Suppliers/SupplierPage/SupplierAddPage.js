import ReduxPage from 'soya/lib/page/ReduxPage';
import ReactRenderer from 'soya/lib/page/react/ReactRenderer';
import register from 'soya/lib/client/Register';
import RenderResult from 'soya/lib/page/RenderResult';
import React from 'react';
import {routeRequirement} from '../../../shared/routeRequirement.js';
import Form from 'soya/lib/data/redux/form/Form';

// component
import Navbar from '../../../components/zetta/Navbar/Navbar.js';
import Button from '../../../components/soya-component/dashboard/common/Button/Button.js';
import TextBox from '../../../components/soya-component/dashboard/common/FormControl/TextBox/TextBox.js';
import TextArea from '../../../components/soya-component/dashboard/common/FormControl/TextArea/TextArea.js';
import Radio from '../../../components/soya-component/dashboard/common/FormControl/Radio/Radio.js';
import Dropdown from '../../../components/soya-component/dashboard/common/FormControl/Dropdown/Dropdown.js';
import PageNotificationThumbnail from '../../../components/soya-component/dashboard/common/PageNotification/ComponentThumbnail.js';
import { PageNotificationAction } from '../../../components/soya-component/dashboard/common/PageNotification/PageNotification.js';
import Breadcrumb from '../../../components/zetta/Breadcrumb/Breadcrumb.js';

const FORM_ID = 'addSupplierForm';
const required = function required(value) {
  if (!value || value == null || value == '') return 'This field is required.';
  return true;
};


class Component extends React.Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
    this._form = new Form(this.props.context.store, FORM_ID);
    this.notification = new PageNotificationAction(this.props.context.reduxStore);

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
    const breadcrumbPath = [{
      title:'supplier', routerName:'SUPPLIER'
    }, {
      title: 'supplier abc', path:'/supplier/productname'
    }, {
      title: 'product', routerName: 'PRODUCT'
    }];
    let showedComponent;
    //TODO data from server must be extended by extras

    return <div>
      <Navbar context={this.props.context} active={'SUPPLIERS'} />
      <PageNotificationThumbnail context={this.props.context}/>
      <Breadcrumb array={breadcrumbPath} context={this.props.context} />
      <h1>Create New Supplier</h1>
      <label>Company Name</label>
      <TextBox form={this._form} context={this.props.context}
               name='companyName' placeholder='Type here to see demo...'/>

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

      <label>Market Manager</label>
      <Dropdown name="marketManager">
        <option>{'Dimas'}</option>
        <option>{'how can this page has information about supplier?'}</option>
      </Dropdown>
      <button  onClick={(e) => window.location.href="/suppliers" }>Save Supplier, if success ask server to redirect and send the message</button>
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
