import React from 'react';
import ActionTab from './ActionTab';

class ComponentDoc extends React.Component {
  render() {
    return (
      <div>
        <h3>Property Description</h3>
        <ul>
          <li>listMenu 
            <p>
              This props contains array of object where consist of <b>title</b> and <b>id</b>. Id is used when onclick a tab and send <b>id</b> for getting data from server. Please see example for details.
            </p>
          </li>
          <li>HandleTabClick      
            <p>
              This props is a function for handle tab click. Function can be contains getting data from server or anything process. 
            </p>
          </li>
          <li>Context
            <p>
              This is a props which we get from soya. we just have to send context to TabBookingCenter component.
            </p>
          </li>
          <li>tabId
            <p>
              This props is a id for Tab Segment. The Id will be registered to Tab Segment.
            </p>
          </li>
        </ul>
      </div>
    );
  }
}

export default ComponentDoc;
