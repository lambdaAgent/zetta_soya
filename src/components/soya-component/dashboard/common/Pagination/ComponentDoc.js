import React from 'react';

class ComponentDoc extends React.Component {
  render() {
    return (
      <div>
        <h3>Action Handler</h3>
        <ul>
          <li>{"actionHandler: function({ currentPage })"}</li>
        </ul>
      </div>
    );
  }
}

export default ComponentDoc;
