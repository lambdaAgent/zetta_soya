import ReduxPage from 'soya/lib/page/ReduxPage';
import ReactRenderer from 'soya/lib/page/react/ReactRenderer';
import register from 'soya/lib/client/Register';
import RenderResult from 'soya/lib/page/RenderResult';
import React from 'react';
import {routeRequirement} from '../../../shared/routeRequirement.js';

// component
import Navbar from '../../../components/zetta/Navbar/Navbar.js';
import SupplierProduct from './componentInTabsView/SupplierProductComponent.js';
import SupplierDetail from './componentInTabsView/SupplierDetailComponent.js';
import ActionTab from '../../../components/soya-component/dashboard/common/ActionTab/ActionTab.js';
import Breadcrumb from '../../../components/zetta/Breadcrumb/Breadcrumb.js';



const sampleSuppliers = [
  {
    supplierName: 'PT. something',
    marketManager: 'Dimas',
    _id: '1234ds',
    urlPath: '/suppliers/'
  }
];
const LIST_MENU = [
  {
    title: `Supplier's Product`,
    id: 'supplier_product'
  },
  {
    title:`Supplier Detail`,
    id:`supplier_detail`
  }
];
const DEFAULT_TAB = `supplier_product`;
// const supplierTableHeader = ['Supplier Name', 'Market Manager', 'Action'];
// const FORM_ID = 'supplier';
const required = function required(value) {
  if (!value || value == null || value == '') return 'This field is required.';
  return true;
};


class Component extends React.Component {
  constructor(props){
    super(props);
    this.state = {showTabbed: LIST_MENU[0].id, url:''};
    this.tabView = {
      [ LIST_MENU[0].id ]: <SupplierProduct message={'hello'} context={this.props.context}/>,
      [ LIST_MENU[1].id ]: <SupplierDetail />
    }

  }
  componentWillMount(){
    // this._form = new Form(this.props.context.store, FORM_ID);
  }
  componentDidMount(){
    this.setState({url: window.location.href});
  }

  handleTabClick(id){
    this.setState({showTabbed: id});
  }


  render(){
    let showedComponent;
    return <div>
      <Navbar context={this.props.context} active={'SUPPLIERS'} />
      <Breadcrumb path={this.state.url} />
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



class SupplierDetailPage extends ReduxPage {
  static get pageName(){
    return 'Supplier Detail';
  }

  static getRouteRequirements() {
    return routeRequirement;
  }

  render(httpRequest, routeArgs, store, callback){
    let reactRenderer = new ReactRenderer();
    reactRenderer.head = '<title>Supplier Detail</title>';
    reactRenderer.body = React.createElement(Component, {
      context: this.createContext(store)
    });
    let renderResult = new RenderResult(reactRenderer);
    callback(renderResult);
  }
}

register(SupplierDetailPage);
export default SupplierDetailPage;
