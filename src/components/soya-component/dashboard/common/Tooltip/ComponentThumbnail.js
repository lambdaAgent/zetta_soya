import React from 'react';
import HoverTooltip from './HoverTooltip';
import ConfirmTooltip from './ConfirmTooltip';

class ComponentThumbnail extends React.Component {
  render() {
    return (
      <div>
        <h5>Confirm tooltip</h5>
        <ConfirmTooltip onOk={() => { alert('You clicked confirm') }}>
          <a href='javascript:'>Click here</a>
        </ConfirmTooltip>

        <h5>Hover tooltip</h5>
        <HoverTooltip text='Hover tooltip content'>Hover here...</HoverTooltip>
      </div>
    );
  }
}

export default ComponentThumbnail;
