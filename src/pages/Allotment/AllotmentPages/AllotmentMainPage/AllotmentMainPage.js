import Form from 'soya/lib/data/redux/form/Form';
import ReduxPage from 'soya/lib/page/ReduxPage';
import ReactRenderer from 'soya/lib/page/react/ReactRenderer';
import register from 'soya/lib/client/Register';
import RenderResult from 'soya/lib/page/RenderResult';
import React from 'react';
import {routeRequirement} from '../../../../shared/routeRequirement.js';

// component
import Navbar from '../../../../components/zetta/Navbar/Navbar.js';

// const FORM_ID = 'contact';
const required = function required(value) {
  if (!value || value == null || value == '') return 'This field is required.';
  return true;
};


class Component extends React.Component {

  render(){
    return <div>
      <Navbar context={this.props.context} active={'ALLOTMENT'} />
    </div>
  }
}

class AllotmentPage extends ReduxPage {
  static get pageName(){
    return 'Allotment';
  }

  static getRouteRequirements() {
    return routeRequirement;
  }

  render(httpRequest, routeArgs, store, callback){
    let reactRenderer = new ReactRenderer();
    reactRenderer.head = '<title>Allotment</title>';
    reactRenderer.body = React.createElement(Component, {
      context: this.createContext(store)
    });
    let renderResult = new RenderResult(reactRenderer);
    callback(renderResult);
  }
}

register(AllotmentPage);
export default AllotmentPage;
