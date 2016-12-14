import React from 'react';
import style from './TopBarLayout.css';

import TopBar, { Left, Right, TwoLayerTitle } from '../TopBar/TopBar';

class TopBarLayout extends React.Component {

  static get propTypes() {
    return {
      title: React.PropTypes.string,
      subtitle: React.PropTypes.string,
      user: React.PropTypes.string
    };
  }

  static get defaultProps() {
    return { };
  }

  render() {
    return (
      <div>
        <TopBar>
          <Left>
            <TwoLayerTitle title={this.props.title} subtitle={this.props.subtitle}/>
          </Left>
          <Right>
            {this.props.user ? <b>Hello, <a href={'user'}>{this.props.user}</a></b> : null}
          </Right>
        </TopBar>
        <div className={style.content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default TopBarLayout;
