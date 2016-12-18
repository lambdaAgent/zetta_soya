import ReduxPage from 'soya/lib/page/ReduxPage';
import ReactRenderer from 'soya/lib/page/react/ReactRenderer';
import register from 'soya/lib/client/Register';
import RenderResult from 'soya/lib/page/RenderResult';
import React from 'react';
import { routeRequirement } from '../../../../shared/routeRequirement.js';
import Form from 'soya/lib/data/redux/form/Form';
import { PageNotificationAction } from '../../../../components/soya-component/dashboard/common/PageNotification/PageNotification.js';

// components
import Navbar from '../../../../components/zetta/Navbar/Navbar.js';
import TextBox from '../../../../components/soya-component/dashboard/common/FormControl/TextBox/TextBox.js';
import Button from '../../../../components/soya-component/dashboard/common/Button/Button.js';
import Breadcrumb from '../../../../components/zetta/Breadcrumb/Breadcrumb.js';

const FORM_ID = 'PRODUCT_ADD'

class Component extends React.Component {
  constructor(props){
    super(props);
    this._form = new Form(this.props.context.store, FORM_ID);
    this.notification = new PageNotificationAction(this.props.context.reduxStore);
  }


  render(){
    return(
      <div>
        <Navbar context={this.props.context} active={'SUPPLIERS'}/>
        <Breadcrumb path={window ? window.location.href : ""} />
        <h1>Add New Product</h1>

        <label>Nama Objek Wisata</label>
        <TextBox form={this._form} context={this.props.context}
                 name='item_name' placeholder="name item"/>

      </div>
    );
  }
}

class ProductAddPage extends ReduxPage {
  static get pageName(){
    return 'Product Add';
  }

  static getRouteRequirements() {
    return routeRequirement;
  }

  render(httpRequest, routeArgs, store, callback){
    let reactRenderer = new ReactRenderer();
    reactRenderer.head = '<title>Product Add</title>';
    reactRenderer.body = React.createElement(Component, {
      context: this.createContext(store)
    });
    let renderResult = new RenderResult(reactRenderer);
    callback(renderResult);
  }
}

register(ProductAddPage);
export default ProductAddPage;