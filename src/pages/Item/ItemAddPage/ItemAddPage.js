import ReduxPage from 'soya/lib/page/ReduxPage';
import ReactRenderer from 'soya/lib/page/react/ReactRenderer';
import register from 'soya/lib/client/Register';
import RenderResult from 'soya/lib/page/RenderResult';
import React from 'react';
import { routeRequirement } from '../../../shared/routeRequirement.js';
import Form from 'soya/lib/data/redux/form/Form';
import { PageNotificationAction } from '../../../components/soya-component/dashboard/common/PageNotification/PageNotification.js';

// components
import Navbar from '../../../components/zetta/Navbar/Navbar.js';
import TextBox from '../../../components/soya-component/dashboard/common/FormControl/TextBox/TextBox.js';
// import Button from '../../../../components/soya-component/dashboard/common/Button/Button.js';
// import Breadcrumb from '../../../../components/zetta/Breadcrumb/Breadcrumb.js';

const FORM_ID = 'ITEM_ADD';

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
        <h1>Add New Item</h1>

        <label>Nama Item</label>
        <TextBox form={this._form} context={this.props.context}
                 name='item_name' placeholder="name item"/>

        <label>Validity Period</label>
        <TextBox form={this._form} context={this.props.context}
                 name='item_name' placeholder="name item"/>

        <label>Active Allotment per week</label>


        <label>Maximum Group Size</label>
        <TextBox form={this._form} context={this.props.context}
                 name='item_name' placeholder="name item"/>

        <label>Minimum Group Size</label>
        <TextBox form={this._form} context={this.props.context}
                 name='item_name' placeholder="name item"/>

      </div>
    );
  }
}

class ItemAddPage extends ReduxPage {
  static get pageName(){
    return 'Item Add';
  }

  static getRouteRequirements() {
    return routeRequirement;
  }

  render(httpRequest, routeArgs, store, callback){
    let reactRenderer = new ReactRenderer();
    reactRenderer.head = '<title>Item Add</title>';
    reactRenderer.body = React.createElement(Component, {
      context: this.createContext(store)
    });
    let renderResult = new RenderResult(reactRenderer);
    callback(renderResult);
  }
}

register(ItemAddPage);
export default ItemAddPage;