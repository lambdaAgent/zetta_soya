import ReduxPage from 'soya/lib/page/ReduxPage';
import ReactRenderer from 'soya/lib/page/react/ReactRenderer';
import register from 'soya/lib/client/Register';
import RenderResult from 'soya/lib/page/RenderResult';
import React from 'react';
import { routeRequirement } from '../../../../shared/routeRequirement.js';
import Form from 'soya/lib/data/redux/form/Form';
import { PageNotificationAction } from '../../../../components/soya-component/dashboard/common/PageNotification/PageNotification.js';
import createField from 'soya/lib/data/redux/form/createField';

// components
import Navbar from '../../../../components/zetta/Navbar/Navbar.js';
import TextBox from '../../../../components/soya-component/dashboard/common/FormControl/TextBox/TextBox.js';
import Button from '../../../../components/soya-component/dashboard/common/Button/Button.js';
import Dropdown from '../../../../components/soya-component/dashboard/common/FormControl/Dropdown/Dropdown.js';
import AutoCompleteInput from '../../../../components/soya-component/dashboard/common/AutoCompleteInput/AutoCompleteInput.js';
import Checkbox from '../../../../components/soya-component/dashboard/common/FormControl/Checkbox/Checkbox.js';
import CheckboxThumbnail from '../../../../components/soya-component/dashboard/common/FormControl/Checkbox/ComponentThumbnail.js';
const FORM_ID = 'ACCOUNT_ADD';

const suppliers = [
  {value: 'INDONESIA', searchString: 'Indonesia Bhinneka Tunggal Ika'},
  {value: 'MALAYSIA', searchString: 'Datuk Maringgi Malaysia'},
  {value: 'THAILAND', searchString: 'Bangkok Thailand Pantai'},
  {value: 'AFGANISTAN', searchString: 'Bom Afganistan ISIS'}
];
const role = [
  { text: 'Apple', value: 'apple' },
  { text: 'Banana', value: 'banana' },
  { text: 'Cranberry', value: 'cranberry' }
];
const roleOptions = [
  { text: 'Product 1', value: 'product1' },
  { text: 'Product 2', value: 'product2' },
  { text: 'Product 3', value: 'product3' }
];
const AutoCompleteComponent = props => {
  return <AutoCompleteInput {...props} />
};

const AutoCompleteField = createField(AutoCompleteComponent);

class Component extends React.Component {
  constructor(props){
    super(props);
    this._form = new Form(this.props.context.store, FORM_ID);
    this.notification = new PageNotificationAction(this.props.context.reduxStore);
  }

  render(){
    return(
      <div>
        <Navbar context={this.props.context} active={'ACCOUNT_MANAGEMENT'} />
        Add new Account
        <h1>Add New Account</h1>

        <label>User Type</label>
        <AutoCompleteField form={this._form} context={this.props.context}
                           name='supplier' options={suppliers} block={true}/>

        <label>Username</label>
        <AutoCompleteField form={this._form} context={this.props.context}
                           name='supplier' options={suppliers} block={true}/>

        <label>Role</label>
        <Dropdown name='role' options={role} context={this.props.context} form={this._form}/>

        <Checkbox name='role' options={roleOptions}
                  context={this.props.context} form={this._form} />
        <Checkbox name='status' context={this.props.context} form={this._form}
                  style={Checkbox.STYLE.SWITCH}
                  conditionalText={{true:'active' , false: 'off'}} />


        <Button>Add Item</Button>
      </div>
    );
  }
}

class AccountAddPage extends ReduxPage {
  static get pageName(){
    return 'Account Add';
  }

  static getRouteRequirements() {
    return routeRequirement;
  }

  render(httpRequest, routeArgs, store, callback){
    let reactRenderer = new ReactRenderer();
    reactRenderer.head = '<title>Account Add</title>';
    reactRenderer.body = React.createElement(Component, {
      context: this.createContext(store)
    });
    let renderResult = new RenderResult(reactRenderer);
    callback(renderResult);
  }
}

register(AccountAddPage);
export default AccountAddPage;