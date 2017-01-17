import ReduxPage from 'soya/lib/page/ReduxPage';
import ReactRenderer from 'soya/lib/page/react/ReactRenderer';
import register from 'soya/lib/client/Register';
import RenderResult from 'soya/lib/page/RenderResult';
import React from 'react';
import { routeRequirement } from '../../../../shared/routeRequirement.js';
import connect from 'soya/lib/data/redux/connect';

//segments
import ProductSegment from '../../../../segmentsAndServices/ProductSgmSrv/ProductSegment.js';
import SupplierSegment from '../../../../segmentsAndServices/SupplierSgmSrv/SupplierSegment.js';

// component
import ActionTab from '../../../../components/soya-component/dashboard/common/ActionTab/ActionTab.js';
import Navbar from '../../../../components/zetta/Navbar/Navbar.js';
import ProductItem from './componentInTabView/ProductItemComponent/ProductItemComponent.js';
import ProductDetail from './componentInTabView/ProductDetailComponent/ProductDetailComponent.js';
import Breadcrumb from '../../../../components/zetta/Breadcrumb/Breadcrumb.js';

const LIST_MENU = [
  {
    title: `Product's Item`,
    id: 'product_item'
  },
  {
    title:`Product Detail`,
    id:`product_detail`
  }
];
const DEFAULT_TAB = 'product_item';
class Component extends React.Component{
  constructor(props){
    super(props);
    this.state = {showTabbed: LIST_MENU[0].id, loading: false};
    this.tabView = {
      [ LIST_MENU[0].id ]: <ProductItem context={this.props.context}/>,
      [ LIST_MENU[1].id ]: <ProductDetail />
    }

  }
  componentDidMount(){
    this.actions = this.props.context.store.register(ProductSegment);
    this.setState({url: window.location.href});
  }
  static getSegmentDependencies() {
    return [ProductSegment, SupplierSegment];
  }

  static subscribeQueries(props, subscribe) {
    // REMEMBER subscribe is also GET to server
    // subscribe(DashboardSgmSrv.id(), props.userId, 'dashboard');
    subscribe(SupplierSegment.id(), 'supplierDetail', 'supplierDetail');
    subscribe(ProductSegment.id(), 'products', 'products');
  }
  handleTabClick(id){
    this.setState({showTabbed: id})
  }
  render(){
    return(
      <div>
        {/*TODO: all pages need notfication*/}
        <Navbar context={this.props.context} active={'SUPPLIERS'} />
        <ActionTab tabList={LIST_MENU}
                   defaultTabId={DEFAULT_TAB}
                   handleTabClick={this.handleTabClick.bind(this)}
                   context={this.props.context} tabId={'bcTab'} />
        {
          this.tabView[this.state.showTabbed]
        }
      </div>
    );
  }
}

const ProductDetailConnect = connect(Component);


class ProductDetailPage extends ReduxPage {
  static get pageName(){
    return 'Product Detail';
  }

  static getRouteRequirements() {
    return routeRequirement;
  }

  render(httpRequest, routeArgs, store, callback){
    let reactRenderer = new ReactRenderer();
    reactRenderer.head = '<title>Product Detail</title>';
    reactRenderer.body = React.createElement(ProductDetailConnect, {
      context: this.createContext(store)
    });
    let renderResult = new RenderResult(reactRenderer);
    callback(renderResult);
  }
}

register(ProductDetailPage);
export default ProductDetailPage;