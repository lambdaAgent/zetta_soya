import React from 'react';
import ClassNames from 'classnames';

import style from './TopBar.mod.css';
import layout from '../../shared/layout.mod.css';

class TopBar extends React.Component {

  static get propTypes() {
    return {
      isMenuOpen: React.PropTypes.bool,
    };
  }

  static get defaultProps() {
    return {
      isMenuOpen: false,
    };
  }

  render() {
    const child = {};
    React.Children.forEach(this.props.children, cmp => {
      if (cmp.type.name === 'Left') {
        child.left = cmp;
      } else {
        child.right = cmp;
      }
    });
    return (
      <header style={this.props.style} className={ClassNames(style.navBar, this.props.className, {[style.menuOpen]: this.props.isMenuOpen})}>
        <div className={layout.containerFluid}>
          {child.left}
          {child.right}
        </div>
      </header>
    );
  }
}

export class Left extends React.Component {
  render() {
    return (
      <div className={style.navBarLeft}>{this.props.children}</div>
    );
  }
}

export class Right extends React.Component {
  render() {
    return (
      <div className={style.navBarRight}>{this.props.children}</div>
    );
  }
}

export class TwoLayerTitle extends React.Component {
  render() {
    return (
      <div className={`${style.navBarPageTitle} ${style.twoLayer}`}>
        <b>{this.props.subtitle}</b>
        {this.props.title}
      </div>
    );
  }
}

export default TopBar;
