import React from 'react';

class ComponentDoc extends React.Component {
  render() {
    return (
      <div>
        Accordion component only handle behaviour, to implement visual aspect of the accordion please create React Element which extends <b>AccordionItem</b> (See <b>SimpleAccordion</b> for example).
        <h4>Props explanation</h4>
        <ul>
          <li><b>type</b>: an extension of AccordionItem that will handle the visual.</li>
          <li>
            <b>items</b>: Array of object that will be passed to each AccordionItem as data props. Shape of the object is a contract made by AccordionItem data props (See <b>SimpleAccordion</b>).
          </li>
          <li><b>itemProps</b>: Object that will be passed to all AccordionItem as props</li>
        </ul>
      </div>
    );
  }
}

export default ComponentDoc;
