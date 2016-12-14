import React from 'react';
import createField from 'soya/lib/data/redux/form/createField';

import style from './DropdownField.css';

export class DropdownField extends React.Component {
  static get propTypes() {
    return {
      form: React.PropTypes.object,
      context: React.PropTypes.object,
      value: React.PropTypes.string,
      label: React.PropTypes.string,
      isDisabled: React.PropTypes.bool,
      errorMessages: React.PropTypes.array,
      options: React.PropTypes.array.isRequired,
      handleChangeCustom: React.PropTypes.func,
    };
  }

  static get defaultProps() {
    return {
      errorMessages: React.PropTypes.array,
      options: [],
      handleChangeCustom: () => {},
    };
  }

  static connectId() {
    return 'DropdownField';
  }

  componentWillMount() {
    // First option always automatically picked in a select box.
    if ((this.props.value == null || this.props.value == '') && this.props.options.length > 0) {
      this.props.handleChange(this.props.options[0].value);
    }
  }

  componentWillReceiveProps(nextProps) {
    // First option always automatically picked in a select box.
    // if ((this.props.value == null || this.props.value == '') && this.props.options.length > 0) {
    //   this.props.handleChange(this.props.options[0].value);
    // }
  }

  handleChange(event) {
    this.props.handleChange(event.target.value, event);
    this.props.handleChangeCustom(event.target.value);
  }

  render() {
    var i, value, options = [];
    for (i = 0; i < this.props.options.length; i++) {
      value = this.props.options[i].value;
      options.push(<option key={value} value={value}>{this.props.options[i].label}</option>);
    }

    if (this.props.inline) {
      return (
        <table className={style.inlineWrapper}>
          <tbody>
            <tr>
              <td width ={120}>{this.props.label ? <b>{this.props.label}</b> : null}</td>
              <td>
                <div className={style.selectBox + ' ' + style.selectBoxInline}>
                  <select value={this.props.value} disabled={this.props.isDisabled}
                          onChange={this.handleChange.bind(this)}>
                    {options}
                  </select>
                  {this.props.errorMessages.length > 0 ? <span>{this.props.errorMessages[0]}</span> : null}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      );
    }

    return (
      <div className={style.formGroup}>
        {this.props.label ? <label>{this.props.label}</label> : null}
        <div className={style.selectBox}>
          <select value={this.props.value} disabled={this.props.isDisabled}
                  onChange={this.handleChange.bind(this)}>
            {options}
          </select>
          {this.props.errorMessages.length > 0 ? <span>{this.props.errorMessages[0]}</span> : null}
        </div>
      </div>
    );
  }
}

export default createField(DropdownField);