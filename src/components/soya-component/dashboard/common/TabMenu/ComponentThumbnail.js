import React from 'react';
import { TabMenu, TabMenuItem } from './TabMenu';

class ComponentThumbnail extends React.Component {
  render() {
    return (
      <div>
        <h5>Plain TabMenu</h5>
        <TabMenu>
          <TabMenuItem title='Flight'>
            <p>flight view... Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea animi perspiciatis maiores ut commodi? Blanditiis voluptas,
              officiis nam asperiores unde distinctio consequuntur minima incidunt dolorum, laboriosam fugiat illo sapiente similique.</p>
          </TabMenuItem>
          <TabMenuItem title='Hotel'>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea animi perspiciatis maiores ut commodi? Blanditiis voluptas,
              officiis nam asperiores unde distinctio consequuntur minima incidunt dolorum, laboriosam fugiat illo sapiente similique. hotel view...</p>
          </TabMenuItem>
        </TabMenu>
        <h5>With control</h5>
        <TabMenu enableControl addTabHandler={count => { console.log(count) }} closeTabHandler={index => { console.log(index) }}>
          <TabMenuItem title='Flight'>
            <p>Flight</p>
          </TabMenuItem>
          <TabMenuItem title='Hotel'>
            <p>Hotel</p>
          </TabMenuItem>
        </TabMenu>
      </div>
    );
  }
}

export default ComponentThumbnail;
