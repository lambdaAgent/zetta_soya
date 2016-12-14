import React from 'react';
import createField from 'soya/lib/data/redux/form/createField';
import style from './TextField.css';

class TextField extends React.Component {

  static get propTypes() {
    return {
      form: React.PropTypes.object,
      context: React.PropTypes.object,
      value: React.PropTypes.string,
      label: React.PropTypes.string,
      isDisabled: React.PropTypes.bool,
      errorMessages: React.PropTypes.array,
      inline: React.PropTypes.bool,
      type: React.PropTypes.string,
    };
  }

  static get defaultProps() {
    return {
      value: '',
      inline: false,
      type: 'text',
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
    this.props.handleChange(event.target.value, event);
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
                <input type={this.props.type}
                       className={style.formControl}
                       disabled={this.props.isDisabled}
                       onChange={this.handleChange.bind(this)}
                       onBlur={this.handleBlur.bind(this)}
                       value={this.props.value}
                />
                {this.props.customAction ? this.renderCustomAction(): null}
              </td>
            </tr>
          </tbody>
        </table>
      );
    }

    return (
      <div className={style.formGroup}>
        {this.props.label ? <label>{this.props.label}</label> : null}
        <input type="text"
               {...this.props}
               className={style.formControl}
               disabled={this.props.isDisabled}
               onChange={this.handleChange.bind(this)}
               onBlur={this.handleBlur.bind(this)}
               value={this.props.value}
        />
        {this.props.customAction ? this.renderCustomAction(): null}
      </div>
    );
  }
}

export default createField(TextField);
