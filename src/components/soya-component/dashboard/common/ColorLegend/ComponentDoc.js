import React from 'react';

class ComponentDoc extends React.Component {
  render() {
    return (
      <div>
        <h3>Property Description</h3>
        <ul>
          <li>colors
            <p>
              this props is a array list which each array is a object have <b>color</b> and <b>description</b> property. 
              <b>Color</b> have to be filled a hexadecimal css color and <b>Description</b> is a any string which describe a color. 
            </p>
          </li>
          <li>zIndex (optional)
            <p>You can filled this with default value (you can see at example)</p>
          </li>
        </ul>
      </div>
    );
  }
}

export default ComponentDoc;
