import React from 'react';
import style from './StaticField.css';

class StaticField extends React.Component {

  static get propTypes() {
    return {
      value: React.PropTypes.string,
      label: React.PropTypes.string,
      inline: React.PropTypes.bool,
    };
  }

  static get defaultProps() {
    return {
      inline: false,
    };
  }

  render() {
    if (this.props.inline) {
      return (
        <table className={style.inlineWrapper}>
          <tr>
            <td width={120}>{this.props.label ? <b>{this.props.label}</b> : null}</td>
            <td>
              {this.props.value || this.props.children}
            </td>
          </tr>
        </table>
      );
    }

    return (
      <div className={style.formGroup}>
        {this.props.label ? <label>{this.props.label}</label> : null}
        <p>{this.props.value || this.props.children}</p>
      </div>
    );
  }
}

export default StaticField;
