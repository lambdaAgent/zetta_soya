import React from 'react';
import Authorize from './Authorize.js';
import UserHeader from './UserHeader.js';
import SideNav from '../SideNav/SideNav.js';

export default class AuthorizeWithHeader extends React.Component {
  render() {
    return <div>
      <Authorize {...this.props}>
        <UserHeader context={this.props.context} />
        <SideNav context={this.props.context} menuData={this.props.menuData} />
        <div style={{marginTop: '70px', marginLeft: '75px', marginBottom: '25px', marginRight: '25px'}}>
          {this.props.children}
        </div>
      </Authorize>
    </div>
  }
}