import React from 'react';

class Tab extends React.Component {
  static get propTypes() {
    return {
      disabled: React.PropTypes.bool,
      title: React.PropTypes.string,
    };
  }

  static get defaultProps() {
    return {

    };
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default Tab;