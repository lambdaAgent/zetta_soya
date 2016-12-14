import React from 'react';

class ComponentDoc extends React.Component {
  render() {
    return (
      <div>
        Contain 3 types of textbox
        <ul>
          <li><b>TextBox</b>: A simple textbox</li>
          <li><b>EditableLabel</b>: A label that has <code>edit</code> button in which when clicked will turn the Label into a TextBox</li>
          <li><b>StaticText</b>: A simple text display connected to FormSegment, useful for showing read only value from form</li>
        </ul>
      </div>
    );
  }
}

export default ComponentDoc;
