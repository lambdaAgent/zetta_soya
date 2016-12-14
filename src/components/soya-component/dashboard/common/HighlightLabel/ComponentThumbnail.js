import React from 'react';
import HighlightLabel from './HighlightLabel';

class ComponentThumbnail extends React.Component {
  render() {
    return (
      <div>
        <HighlightLabel labelStyle={HighlightLabel.STYLE.DEFAULT} text='Default' />&nbsp;
        <HighlightLabel labelStyle={HighlightLabel.STYLE.BLUE} text='Blue' />&nbsp;
        <HighlightLabel labelStyle={HighlightLabel.STYLE.YELLOW} text='Yellow' />
      </div>
    );
  }
}

export default ComponentThumbnail;
