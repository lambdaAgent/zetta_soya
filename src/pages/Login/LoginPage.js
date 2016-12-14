import React from 'react';
import ReduxPage from 'soya/lib/page/ReduxPage';
import ReactRenderer from 'soya/lib/page/react/ReactRenderer';
import register from 'soya/lib/client/Register';
import RenderResult from 'soya/lib/page/RenderResult';
import {routeRequirement} from '../../shared/routeRequirement.js';

// components


class Login extends React.Component {
  constructor(props){
    super(props);

  }
  render(){
    return(
      <div>
        Login
      </div>
    )
  }
}

class LoginPage extends ReduxPage {
  static get pageName(){
    return 'Login';
  }

  static getRouteRequirements() {
    return routeRequirement;
  }

  render(httpRequest, routeArgs, store, callback){
    let reactRenderer = new ReactRenderer();
    reactRenderer.head = '<title>Login</title>';
    reactRenderer.body = React.createElement(Login, {
      context: this.createContext(store)
    });
    let renderResult = new RenderResult(reactRenderer);
    callback(renderResult);
  }
}

register(LoginPage);
export default LoginPage;
