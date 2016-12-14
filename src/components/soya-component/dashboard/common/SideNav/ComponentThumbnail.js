import React from 'react';
import Component from '../../base/Component';
import smokesignals from 'soya/lib/event/smokesignals.js';
import SideNav from './SideNav';
// CSS
import icons from './component-thumbnail-files/icons.mod.css';

class NavMenu extends Component.ContextComponent {
  componentWillMount() {
    this.eventEmitter = {};
    smokesignals.convert(this.eventEmitter);
  }

  render() {
    const menuData = [
      {
        title: 'Sample Link',
        icon: `${icons.resource}`,
        links: [
          <a href='#'>Component Link</a>,
          { title: 'Second Link' , href: '#' },
          { title: 'Third Link' , href: '#' }
        ]
      },
      {
        title: 'Sample Link 2',
        icon: `${icons.resource}`,
        links: [
          <a href='#'>Component Link</a>,
          { title: 'Second Link' , href: '#' },
          { title: 'Third Link' , href: '#' }
        ]
      }
    ];

    return (
      <div style={{ position: 'relative', height: 300, width: 300 }}>
        <SideNav style={{ position: 'absolute' }} context={this.props.context} menuData={menuData} />
      </div>
    );
  }
}

export default NavMenu;
