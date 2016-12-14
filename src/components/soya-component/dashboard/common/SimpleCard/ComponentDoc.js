import React from 'react';
import KeyValueContainer from './SimpleCard';

class ComponentDoc extends React.Component {
  render() {
    return (
      <div>
        <h3>Usage</h3>
        <p>
          Contains two components. <code>SimpleCard</code> is the card container.
          You can use it as an all-purpose card container as it will render its children.
        </p>
        <p>
          <code>SimpleCardHeader</code> is a header component you can use that goes with it.
          It has two styles, <code>PANEL_HEADING</code> and <code>SUB_HEADING</code>
          as you can see in the example.
        </p>
      </div>
    );
  }
}

export default ComponentDoc;
