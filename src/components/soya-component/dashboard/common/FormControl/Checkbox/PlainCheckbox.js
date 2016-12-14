import React, { PropTypes } from 'react';
import FormControl from '../FormControl';
import Classnames from 'classnames';

import style from './PlainCheckbox.mod.css';

class PlainCheckbox extends FormControl {
  static get STYLE() {
    return {
      DEFAULT : style.checkBox,
      SWITCH : style.switch,
      SMALL_SWITCH: style.smallSwitch
    };
  }

  static get propTypes() {
    return Object.assign({}, FormControl.propTypes, {
      text: PropTypes.string,
      conditionalText: PropTypes.shape({
        true: PropTypes.string,
        false: PropTypes.string
      }), // Allow conditional text based on value
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
      ]),
      style: PropTypes.string,
      defaultChecked: PropTypes.bool, // use defaultChecked for interactive checkbox
      checked: PropTypes.bool // use checked for readonly checkbox
    });
  }
  
  componentWillMount() {
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * @override
   */
  _getPropAttributes() {
    const props = super._getPropAttributes();
    props.className = this.formStyle.formControl;
    props.value = props.value === undefined ? false : props.value;

    delete props.text;
    delete props.style;
    return props;
  }
  
  handleClick(event) {
    if (this.props.stopPropagateClick) {
      event.stopPropagation();
    }
  }

  render() {
    const cbClassName = Classnames(this.props.style ? this.props.style : style.checkBox, this.props.className);
    return (
      <div className={cbClassName}>
        <input {...this._getPropAttributes()} onClick={this.handleClick} type='checkbox' />
        {this.props.text != null ? <label>{this.props.text}</label> : null}
        {this.props.conditionalText ? <label>{this.props.conditionalText[this.props.value || false]}</label> : null}
      </div>
    );
  }
}

export default PlainCheckbox;