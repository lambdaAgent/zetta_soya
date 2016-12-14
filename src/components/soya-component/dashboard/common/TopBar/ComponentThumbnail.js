import React from 'react';
import TopBar, { Left, Right } from './TopBar';

class ComponentThumbnail extends React.Component {
  render() {
    return (
      <div style={{ position: 'relative', minWidth: '400px', height: '50px' }}>
        <TopBar style={{ position: 'absolute' }}>
          <Left>Left content</Left>
          <Right>Right content</Right>
        </TopBar>
      </div>
    );
  }
}

export default ComponentThumbnail;
