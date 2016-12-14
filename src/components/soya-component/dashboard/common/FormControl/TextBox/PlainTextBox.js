import React, { PropTypes } from 'react';
import FormControl from '../FormControl';
import BallClipRotate from '../../Loading/BallClipRotate';

import style from './PlainTextBox.mod.css';

class TextBox extends FormControl {
  constructor(props) {
    super(props);
    this.inputStyle = style;
  }

  static get propTypes() {
    return Object.assign({}, FormControl.propTypes, {
      placeholder: PropTypes.string,
      value: PropTypes.string,
      defaultValue: PropTypes.string,
      addOn: PropTypes.shape({
        position: PropTypes.string,
        text: PropTypes.string
      }),
      isPassword: PropTypes.bool
    });
  }

  /**
   * @override
   */
  _getPropAttributes() {
    const props = super._getPropAttributes();
    props.className = this.formStyle.formControl + (props.className ? ' ' + props.className : '');

    delete props.style;
    return props;
  }

  render() {
    const addOn = this.props.addOn ? <div className={this.formStyle.inputGroupAddon}><span>{this.props.addOn.text}</span></div> : null;
    const errorMessages = this.props.errorMessages ? this.props.errorMessages : [];
    const showLoading = this.props.isValidating ? { visibility: 'visible' } : { visibility: 'hidden' };

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
      <div style={this.props.style}
           className={this.formStyle.inputGroup + ' ' + ((errorMessages.length > 0) ? this.formStyle.inputError : '')}>
        {addOn && this.props.addOn.position === 'left' ? addOn : null}
        <input {...this._getPropAttributes()} type={this.props.isPassword ? 'password' : 'text'} />
        {addOn && this.props.addOn.position === 'right' ? addOn : null}
        <div style={showLoading} className={this.formStyle.inputStatus}><BallClipRotate color={'#00A651'} /></div>
        {error}
      </div>
    );
  }
}

export default TextBox;
