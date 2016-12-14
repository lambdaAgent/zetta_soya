import React from 'react';
import style from './DashboardLayout.css';

import SideNav, { Content } from '../SideNav/SideNav';
import TopBar, { Left, Right, TwoLayerTitle } from '../TopBar/TopBar';

class DashboardLayout extends React.Component {

  static get propTypes() {
    return {
      title: React.PropTypes.string,
      subtitle: React.PropTypes.string,
      user: React.PropTypes.string,
      menuData: React.PropTypes.array,
    };
  }

  static get defaultProps() {
    return {
      user: 'traveloka',
      menuData: []
    };
  }

  componentWillMount() {
    this.state = {
      menuData: this.props.menuData,
    };
  }

  toggleMenuOpen(isOpen) {
    if (isOpen == null) isOpen = !this.state.isMenuOpen;
    this.setState({
      isMenuOpen: isOpen,
    });
  }

  render() {
    return (
      <div>
        <TopBar isMenuOpen={this.state.isMenuOpen}>
          <Left>
            <TwoLayerTitle title={this.props.title} subtitle={this.props.subtitle}/>
          </Left>
          <Right>
            <b>Hello, <a href={'/token'}>{this.props.user}</a></b>
          </Right>
        </TopBar>
        <SideNav menuData={this.state.menuData}
                 isMenuOpen={this.state.isMenuOpen}
                 handleMenuOpen={(isOpen) => this.toggleMenuOpen(isOpen)}
        />
        <Content isMenuOpen={this.state.isMenuOpen}>
          {this.props.children}
        </Content>
      </div>
    );
  }
}

export default DashboardLayout;
