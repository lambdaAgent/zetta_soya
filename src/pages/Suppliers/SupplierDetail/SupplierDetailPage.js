import ReduxPage from 'soya/lib/page/ReduxPage';
import ReactRenderer from 'soya/lib/page/react/ReactRenderer';
import register from 'soya/lib/client/Register';
import RenderResult from 'soya/lib/page/RenderResult';
import React from 'react';
import {routeRequirement} from '../../../shared/routeRequirement.js';
import connect from 'soya/lib/data/redux/connect';

// component
import Navbar from '../../../components/zetta/Navbar/Navbar.js';
import SupplierProduct from './componentInTabsView/SupplierProductComponent.js';
import SupplierDetail from './componentInTabsView/SupplierDetailComponent.js';
import ActionTab from '../../../components/soya-component/dashboard/common/ActionTab/ActionTab.js';
import Breadcrumb from '../../../components/zetta/Breadcrumb/Breadcrumb.js';

//segment, use supplierPage Segment
import SupplierSegment from '../SupplierPage/SupplierSegment.js';
import ProductSegment from '../ProductPage/ProductSegment.js';

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

  }
  componentDidMount(){
    this.setState({url: window.location.href});
    this.supplierActions = this.props.context.store.register(SupplierSegment);
    this.productActions = this.props.context.store.register(ProductSegment);
    const supplierName = window.location.href.split('/').slice(-1)[0];
    this.props.context.store.dispatch(this.supplierActions.getSupplierByName(supplierName));
  }

  static getSegmentDependencies() {
    return [SupplierSegment, ProductSegment];
  }

  static subscribeQueries(props, subscribe) {
    // subscribe(DashboardSegment.id(), props.userId, 'dashboard');
    subscribe(SupplierSegment.id(), 'supplierDetail', 'supplierDetail');
    subscribe(ProductSegment.id(), 'products', 'products');
  }

  handleTabClick(id){
    this.setState({showTabbed: id});
  }

  render(){
    var self = this;
    if('supplierDetail' in this.props.result && this.props.result.supplierDetail) {
      self.tabView = {
        [ LIST_MENU[0].id ]: <SupplierProduct products={this.props.result.supplierDetail.products} context={this.props.context}/>,
        [ LIST_MENU[1].id ]: <SupplierDetail supplierDetail={this.props.result.supplierDetail}/>
      };
    }

    let showedComponent;
    return <div>
      <Navbar context={this.props.context} active={'SUPPLIERS'} />
      <Breadcrumb path={this.state.url} />
      <ActionTab tabList={LIST_MENU}
                 defaultTabId={DEFAULT_TAB}
                 handleTabClick={this.handleTabClick.bind(this)}
                 context={this.props.context} tabId={'bcTab'} />
      { (this.tabView) ?
        this.tabView[this.state.showTabbed]
        : null
      }
    </div>
  }
}

const SupplierConnect = connect(Component);

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
    reactRenderer.body = React.createElement(SupplierConnect, {
      context: this.createContext(store)
    });
    let renderResult = new RenderResult(reactRenderer);
    callback(renderResult);
  }
}

register(SupplierDetailPage);
export default SupplierDetailPage;
