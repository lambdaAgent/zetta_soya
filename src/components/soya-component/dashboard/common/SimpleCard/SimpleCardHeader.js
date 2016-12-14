import React from 'react';
import style from './SimpleCardHeader.mod.css';

export default class SimpleCardHeader extends React.Component {
  static get propTypes() {
    return {
      title: React.PropTypes.string,
      style: React.PropTypes.string
    };
  }

  static get STYLE() {
    return {
      PANEL_HEADING: style['panel-header'],
      SUB_HEADING: style['keyvalue-header']
    };
  }

  render() {
    return (
      <div className={this.props.style}>{this.props.title}</div>
    );
  }
}
