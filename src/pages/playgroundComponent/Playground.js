import ReduxPage from 'soya/lib/page/ReduxPage';
import ReactRenderer from 'soya/lib/page/react/ReactRenderer';
import register from 'soya/lib/client/Register';
import RenderResult from 'soya/lib/page/RenderResult';
import React from 'react';
import { routeRequirement } from '../../shared/routeRequirement.js';


class Playground extends React.Component {
  constructor(props){
    super(props);
  }


  render(){
    return(
      <div>
         Playground
      </div>
    );
  }
}

class PlaygroundPage extends ReduxPage {
  static get pageName(){
    return 'Item Add';
  }

  static getRouteRequirements() {
    return routeRequirement;
  }

  render(httpRequest, routeArgs, store, callback){
    let reactRenderer = new ReactRenderer();
    reactRenderer.head = '<title>Item Add</title>';
    reactRenderer.body = React.createElement(Playground, {
      context: this.createContext(store)
    });
    let renderResult = new RenderResult(reactRenderer);
    callback(renderResult);
  }
}

register(PlaygroundPage);
export default PlaygroundPage;