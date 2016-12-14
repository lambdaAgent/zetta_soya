import React from 'react';

import ActionTab from './ActionTab';

const listMenu = [
    {
      title: 'Urgent',
      id: 'urgent'
    },
    {
      title: 'Not Urgent',
      id: 'notUrgent'
    },
    {
      title: 'All',
      id: 'all'
    }
  ];

const handleTabClick = (id) => {};

class ComponentThumbnail extends React.Component {
  render() {
    return <ActionTab
      tabList={listMenu}
                      defaultTabId="urgent"
      handleTabClick={handleTabClick}
      context={this.props.context} tabId={'Tab1'}/>
    ;
  }
}

export default ComponentThumbnail;