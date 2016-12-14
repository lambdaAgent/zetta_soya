import React from 'react';
import Button from './Button';

class ComponentDoc extends React.Component {
  render() {
    return (
      <div>
        <h3>Size</h3>
        <ul>
          {Object.keys(Button.SIZE).map((o, i) => <li key={i}>{o} : <code>Button.SIZE.{o}</code></li>)}
        </ul>
        <h3>Style</h3>
        <ul>
          {Object.keys(Button.STYLE).map((o, i) => <li key={i}>{o} : <code>Button.STYLE.{o}</code></li>)}
        </ul>
        <h3>Action Handler</h3>
        <ul>
          <li>handleClick: function(event)</li>
          <li>onClick: function(event)</li>
        </ul>
      </div>
    );
  }
}

export default ComponentDoc;
