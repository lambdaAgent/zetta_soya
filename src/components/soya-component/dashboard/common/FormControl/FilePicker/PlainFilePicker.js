import React, { PropTypes } from 'react';
import FormControl from '../FormControl';

import style from './PlainFilePicker.mod.css';

class FilePicker extends FormControl {

  /**
   * @override
   */
  static get propTypes() {
    return Object.assign({}, {
      helpText: PropTypes.node
    }, FormControl.propTypes)
  }

  /**
   * @override
   */
  render() {
    return (
      <div>
        <input {...this._getPropAttributes()} type='file' />
        <p className={style.helpBlock}>{this.props.helpText}</p>
      </div>
    );
  }

  /**
   * @protected
   */
  _getPropAttributes() {
    const props = super._getPropAttributes();
    props.className = this.formStyle.formControl + (props.className? ' '+ props.className : '');

    delete props.helpText;
    return props;
  }
}

export default FilePicker;
