import React from 'react';
import Accordion from './Accordion';
import SimpleAccordion from './types/SimpleAccordion';

class ComponentThumbnail extends React.Component {
  render() {
    const items = [
      { text: '0' },
      { text: '1' }
    ];

    return (
      <div>
        <Accordion id='accordionId' context={this.props.context} type={SimpleAccordion} itemProps={{ context: this.props.context }} items={items} />
      </div>
    );
  }
}

export default ComponentThumbnail;
