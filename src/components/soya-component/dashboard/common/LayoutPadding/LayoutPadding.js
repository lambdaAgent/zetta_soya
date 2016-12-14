import React from 'react';
import ClassNames from 'classnames';
import style from './LayoutPadding.css';

class Padding extends React.Component {

  static get propTypes() {
    return {};
  }

  static get defaultProps() {
    return {};
  }

  render() {
    const className = ClassNames(style.padding, {
      [style.left]  : this.props.all || this.props.left,
      [style.right] : this.props.all || this.props.right,
      [style.top]   : this.props.all || this.props.top,
      [style.bottom]: this.props.all || this.props.bottom,
    })
    return (
      <div className={className}>
          {this.props.children}
      </div>
    );
  }
}

export default Padding;
