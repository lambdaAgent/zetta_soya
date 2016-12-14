import ReduxPage from 'soya/lib/page/ReduxPage';
import ReactRenderer from 'soya/lib/page/react/ReactRenderer';
import register from 'soya/lib/client/Register';
import RenderResult from 'soya/lib/page/RenderResult';
import React from 'react';
import { routeRequirement } from '../../../shared/routeRequirement.js';

// component
import ActionTab from '../../../components/soya-component/dashboard/common/ActionTab/ActionTab.js';
import Navbar from '../../../components/zetta/Navbar/Navbar.js';
import ProductItem from './componentInTabView/ProductItemComponent.js';
import ProductDetail from './componentInTabView/ProductDetailComponent.js';


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
    this.state = {showTabbed: LIST_MENU[0].id};
    this.tabView = {
      [ LIST_MENU[0].id ]: <ProductItem context={this.props.context}/>,
      [ LIST_MENU[1].id ]: <ProductDetail />
    }

  }
  handleTabClick(id){
    this.setState({showTabbed: id})
  }
  render(){
    return(
      <div>
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
};

class ProductAddPage extends ReduxPage {
  static get pageName(){
    return 'Product Detail';
  }

  static getRouteRequirements() {
    return routeRequirement;
  }

  render(httpRequest, routeArgs, store, callback){
    let reactRenderer = new ReactRenderer();
    reactRenderer.head = '<title>Product Detail</title>';
    reactRenderer.body = React.createElement(Component, {
      context: this.createContext(store)
    });
    let renderResult = new RenderResult(reactRenderer);
    callback(renderResult);
  }
}

register(ProductAddPage);
export default ProductAddPage;