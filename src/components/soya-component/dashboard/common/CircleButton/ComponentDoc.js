import React from 'react';
import CircleButton from '../CircleButton/CircleButton';
class ComponentDoc extends React.Component {
  render() {
    return (
      <div>
        <h3>Style</h3>
        <ul>
          {Object.keys(CircleButton.STYLE).map((o, i) => <li key={i}>{o} : <code>CircleButton.STYLE.{o}</code></li>)}
        </ul>
      </div>
    );
  }
}

export default ComponentDoc;
