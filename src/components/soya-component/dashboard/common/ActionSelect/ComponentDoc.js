import React from 'react';

class ComponentDoc extends React.Component {
  render() {
    return (
      <div>
        <h5>Property Description</h5>
        <ul>
          <li>Data
            <p>
              This props contain a object which consist of <b>title</b> and <b>listOptions</b>. 
              <b>Title</b> is a anything string and <b>listOoptions</b> is array of object. 
              Each Object cotain <b>text</b> and <b>func</b> property. <b>text</b> is a string, and <b>func</b> is a function to handle when onclick of item.  
            </p>
          </li>
        </ul>
      </div>
    );
  }
}

export default ComponentDoc;
