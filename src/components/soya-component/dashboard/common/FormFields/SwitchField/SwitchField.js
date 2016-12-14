import React from 'react';
import createField from 'soya/lib/data/redux/form/createField';
import style from './TextField.css';

class SwitchField extends React.Component {

  static get propTypes() {
    return {
      form: React.PropTypes.object,
      context: React.PropTypes.object,
      value: React.PropTypes.bool,
      label: React.PropTypes.string,
      isDisabled: React.PropTypes.bool,
      errorMessages: React.PropTypes.array,
      inline: React.PropTypes.bool,
      type: React.PropTypes.string,
    };
  }

  static get defaultProps() {
    return {
      value: false,
      inline: false,
    };
  }

  static connectId() {
    return 'TextField';
  }

  componentWillMount() {
    this.prevValidatedValue = null;
  }

  handleChange(event) {
    // Always run async validation if value is changed at least once.
    this.prevValidatedValue = null;
    this.props.handleChange(event.target.checked, event);
  }

  handleBlur(event) {
    if (this.prevValidatedValue !== this.props.value) {
      this.prevValidatedValue = this.props.value;
      this.props.handleAsyncValidation(this.props.value, event);
    }
  }

  renderCustomAction() {
    return (
      <button className={style.btnAction} onClick={() => this.props.customAction(this.props.value)}>
        {this.props.customActionLabel ? this.props.customActionLabel : '>>'}
      </button>
    )
  }

  render() {
    if (this.props.inline) {
      return (
        <table className={style.inlineWrapper}>
          <tbody>
            <tr>
              <td width={120}>{this.props.label ? <b>{this.props.label}</b> : null}</td>
              <td>
                <label className={style.switch}>
                  <input type='checkbox'
                         disabled={this.props.isDisabled}
                         onChange={this.handleChange.bind(this)}
                         onBlur={this.handleBlur.bind(this)}
                         checked={this.props.value}
                  />
                  <div className={style.slider + ' ' + style.round}></div>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      );
    }

    return (
      <div className={style.formGroup}>
        {this.props.label ? <label>{this.props.label}</label> : null}
        <label className={style.switch}>
          <input type='checkbox'
                 disabled={this.props.isDisabled}
                 onChange={this.handleChange.bind(this)}
                 onBlur={this.handleBlur.bind(this)}
                 value={this.props.value}
          />
          <div className={style.slider + ' ' + style.round}></div>
        </label>
        {this.props.customAction ? this.renderCustomAction(): null}
      </div>
    );
  }
}

export default createField(SwitchField);
