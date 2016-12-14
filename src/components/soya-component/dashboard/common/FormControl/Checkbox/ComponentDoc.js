import React from 'react';
import Checkbox from './Checkbox';

class ComponentDoc extends React.Component {
  render() {
    return (
      <div>
        <h3>Style</h3>
        <ul>
          {Object.keys(Checkbox.STYLE).map((o, i) => <li key={i}>{o} : <code>Checkbox.STYLE.{o}</code></li>)}
        </ul>
      </div>
    );
  }
}

export default ComponentDoc;
