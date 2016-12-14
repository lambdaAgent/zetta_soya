import React from 'react';
import CircleButton from './CircleButton';

class ComponentThumbnail extends React.Component {
  render() {
    return <div>
      <CircleButton value='?' handleClick={() => {alert('circle button')}} buttonStyle={CircleButton.STYLE.GREEN} />
    </div>
  }
}

export default ComponentThumbnail;
