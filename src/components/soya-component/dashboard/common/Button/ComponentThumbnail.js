import React from 'react';
import Button from './Button';

class ComponentThumbnail extends React.Component {
  render() {
    return (
      <div>
        <Button buttonSize={Button.SIZE.DEFAULT}
                buttonStyle={Button.STYLE.PRIMARY}
                handleClick={() => {}}
        >
          Button
        </Button>&nbsp;
      </div>
    );
  }
}

export default ComponentThumbnail;
