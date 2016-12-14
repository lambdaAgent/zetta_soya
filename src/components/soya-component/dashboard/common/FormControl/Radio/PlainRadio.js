import React, { PropTypes } from 'react';
import FormControl from '../FormControl';

/**
 * Usage
 * ---------------------------------
 * <Radio name='rdGender' value='male' text='Laki Laki' />
 */
class Radio extends FormControl {
  constructor(props) {
    super(props);
    this.radioStyle = require('./PlainRadio.mod.css');
  }

  /**
   * This not call FormControl default propTypes
   */
  static get propTypes() {
    return Object.assign({}, FormControl.propTypes, {
      text: PropTypes.string,
      value: PropTypes.string,
      defaultChecked: PropTypes.bool,
      checked: PropTypes.bool
    });
  }

  /**
   * @override
   */
  _getPropAttributes() {
    let props = super._getPropAttributes();
    props.className = this.formStyle.formControl;

    delete props.text;
    return props;
  }

  render() {
    const rdClassName = this.radioStyle.radio +(this.props.className? ' '+this.props.className: '');
    return (
      <div className={rdClassName}>
        <input {...this._getPropAttributes()} type='radio' />
        <label>{this.props.text}</label>
      </div>
    );
  }
}

export default Radio;