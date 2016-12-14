import React from 'react';
import style from './DashboardHeader.css';

class DashboardHeader extends React.Component {

  static get propTypes() {
    return {
      fixed: React.PropTypes.bool,
    };
  }

  static get defaultProps() {
    return {
      fixed: false,
    };
  }

  render() {
    const child = {
      left: <Left />,
      right: <Right />,
      center: <Center />,
    };
    React.Children.forEach(this.props.children, cmp => {
      if (cmp.type.name === 'Left') {
        child.left = cmp;
      } else if (cmp.type.name === 'Right') {
        child.right = cmp;
      } else {
        child.center = cmp;
      }
    });
    if (this.props.fixed) {
      return (
        <div>
          <div className={style.headerBar} />
          <div className={style.headerBar + ' ' + style.fixed}>
            {child.left}
            {child.center}
            {child.right}
          </div>
        </div>
      );
    }
    return (
      <div className={style.headerBar}>
        {child.left}
        {child.center}
        {child.right}
      </div>
    )
  }

}

export class Left extends React.Component {
  render() {
    return (
      <div className={style.left}>
        {this.props.children}
      </div>
    )
  }
}

export class Right extends React.Component {
  render() {
    return (
      <div className={style.right}>
        {this.props.children}
      </div>
    )
  }
}

export class Center extends React.Component {
  render() {
    return (
      <div className={style.center}>
        {this.props.children}
      </div>
    )
  }
}

export default DashboardHeader;
