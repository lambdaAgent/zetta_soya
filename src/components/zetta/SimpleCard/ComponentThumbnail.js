import React from 'react';
import SimpleCard from './SimpleCard';
import SimpleCardHeader from './SimpleCardHeader';

class ComponentThumbnail extends React.Component {
  render() {
    return (
      <SimpleCard>
        <SimpleCardHeader style={SimpleCardHeader.STYLE.PANEL_HEADING} title="Panel Header" />
        <SimpleCardHeader style={SimpleCardHeader.STYLE.SUB_HEADING} title="Sub Header" />
      </SimpleCard>
    );
  }
}

export default ComponentThumbnail;
