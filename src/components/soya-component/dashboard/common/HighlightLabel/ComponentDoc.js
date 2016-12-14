import React from 'react';
import HighlightLabel from './HighlightLabel';

class ComponentDoc extends React.Component {
  render() {
    return (
      <div>
        <h3>Style</h3>
        <ul>
          {Object.keys(HighlightLabel.STYLE).map((o, i) => <li key={i}>{o} : <code>HighlightLabel.STYLE.{o}</code></li>)}
        </ul>
      </div>
    );
  }
}

export default ComponentDoc;
