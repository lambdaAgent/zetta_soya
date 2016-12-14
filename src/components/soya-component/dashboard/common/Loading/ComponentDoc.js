import React from 'react';
import HorizontalBarLoading from './HorizontalBarLoading';
import BallClipRotate from './BallClipRotate';

class ComponentDoc extends React.Component {
  render() {
    return (
      <div>
        <h3>HorizontalBarLoading Size</h3>
        <ul>
          {Object.keys(HorizontalBarLoading.SIZE).map((o, i) => <li key={i}>{o} : <code>HorizontalBarLoading.SIZE.{o}</code></li>)}
        </ul>
        <h3>BallClipRotate Size</h3>
        <ul>
          {Object.keys(BallClipRotate.SIZE).map((o, i) => <li key={i}>{o} : <code>BallClipRotate.SIZE.{o}</code></li>)}
        </ul>
      </div>
    );
  }
}

export default ComponentDoc;
