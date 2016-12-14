import React, { PropTypes } from 'react';
import FormControl from '../FormControl';
import createField from 'soya/lib/data/redux/form/createField';

import style from './EditableLabel.mod.css';

class StaticText extends FormControl {
  static get propTypes() {
    return {
      form: PropTypes.object.isRequired,
      context: PropTypes.object.isRequired,
      clickAction: PropTypes.func
    };
  }

  static connectId() {
    return 'StaticText';
  }

  _getPropAttributes() {
    const props = super._getPropAttributes();

    delete props.form;
    delete props.context;

    delete props.style;
    return props;
  }

  clickAction(value) {
    if (this.props.clickAction)
      this.props.clickAction(value);
  }

  render() {
    const errorMessages = this.props.errorMessages ? this.props.errorMessages : [];
    const error = errorMessages.length > 0 ? (
      <div className={this.formStyle.inputStatus}>
        <span className={this.formStyle.errorMark}>!</span>
        <span className={this.formStyle.errorText}>
          <ul>
            {errorMessages.map((msg, idx) => <li key={idx}>{msg}</li>)}
          </ul>
        </span>
      </div>) : null;

    return (
      <div className={style.wrapper + ' ' + this.props.className} style={this.props.style}>
        <div className={style.label} onClick={this.clickAction.bind(this, this.props.value)}>{this.props.value}</div>
        <input style={{ display: 'none' }} {...this._getPropAttributes()} type='text' readOnly />
        {error}
      </div>
    );
  }
}

export default createField(StaticText);
