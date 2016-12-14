import Form from 'soya/lib/data/redux/form/Form';
import ReduxPage from 'soya/lib/page/ReduxPage';
import ReactRenderer from 'soya/lib/page/react/ReactRenderer';
import register from 'soya/lib/client/Register';
import RenderResult from 'soya/lib/page/RenderResult';
import React from 'react';
import {routeRequirement} from '../../shared/routeRequirement.js';

// component
import Navbar from '../../components/zetta/Navbar/Navbar.js';
import Account from './componentInTabView/AccountComponent.js';
import Role from './componentInTabView/RoleComponent.js';
import ActionTab from '../../components/soya-component/dashboard/common/ActionTab/ActionTab.js';

// const FORM_ID = 'contact';
const required = function required(value) {
  if (!value || value == null || value == '') return 'This field is required.';
  return true;
};

const LIST_MENU = [
  {
    title: `Role`,
    id: 'role'
  },
  {
    title:`Account`,
    id:`account`
  }
];
const DEFAULT_TAB = 'role';
const FORM_ID = 'ACCOUNT_DETAIL'
class Component extends React.Component {
  constructor(props){
    super(props);
    this.state = {showTabbed: LIST_MENU[0].id};
    this._form  = new Form(this.props.context.store, FORM_ID);
    this.tabView = {
      [ LIST_MENU[0].id ]: <Role />,
      [ LIST_MENU[1].id ]: <Account context={this.props.context} form={this._form}/>
    }
  }
  componentWillMount(){
    // this._form = new Form(this.props.context.store, FORM_ID);
  }

  handleTabClick(id){
    this.setState({showTabbed: id})
  }

  render(){
    return <div>
      <Navbar context={this.props.context} active={'ACCOUNT_MANAGEMENT'} />
        <ActionTab tabList={LIST_MENU}
                   defaultTabId={DEFAULT_TAB}
                   handleTabClick={this.handleTabClick.bind(this)}
                   context={this.props.context} tabId={'bcTab'} />

        {
          this.tabView[this.state.showTabbed]
        }
    </div>
  }
}

class AccountManagement extends ReduxPage {
  static get pageName(){
    return 'AccountManagement';
  }

  static getRouteRequirements() {
    return routeRequirement;
  }

  render(httpRequest, routeArgs, store, callback){
    let reactRenderer = new ReactRenderer();
    reactRenderer.head = '<title>Account Management</title>';
    reactRenderer.body = React.createElement(Component, {
      context: this.createContext(store)
    });
    let renderResult = new RenderResult(reactRenderer);
    callback(renderResult);
  }
}

register(AccountManagement);
export default AccountManagement;
