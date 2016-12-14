import React, { PropTypes } from 'react';
import FormControl from '../FormControl';
import TextAreaAutoSize from '../../../external/TextAreaAutoSize/TextAreaAutoSize';

class TextArea extends FormControl {
  constructor(props) {
    super(props);
    this.textAreaStyle = require('./PlainTextArea.mod.css');
  }

  static get propTypes() {
    return Object.assign({}, FormControl.propTypes, {
      value: PropTypes.string
    });
  }

  /**
   * @override
   */
  _getPropAttributes() {
    const props = super._getPropAttributes();
    props.className = this.formStyle.formControl +' '+ this.textAreaStyle.textArea + (props.className? ' '+ props.className : '');
    return props;
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

    return (<div style={{position: 'relative'}}>
      <TextAreaAutoSize {...this._getPropAttributes()} />
      {error}
    </div>);
  }
}

export default TextArea;