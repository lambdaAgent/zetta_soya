import React from 'react';

class ComponentDoc extends React.Component {
  render() {
    return (
      <div>
        <p>A header component which provide left and right container. Default position is fix, but for the sake of demo it'll be set absolute.</p>
        <h3>Child Component</h3>
        <ul>
          <li>{"<Left />"}</li>
          <li>{"<Right />"}</li>
        </ul>
      </div>
    );
  }
}

export default ComponentDoc;
