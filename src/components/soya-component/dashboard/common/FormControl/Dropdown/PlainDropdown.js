import React, { PropTypes } from 'react';
import FormControl from '../FormControl';

import style from './PlainDropdown.mod.css';

class PlainDropdown extends FormControl {
  constructor(props) {
    super(props);
    this.dropDownStyle = style;
  }

  static get propTypes() {
    return Object.assign({}, FormControl.propTypes, {
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
      ]),
      defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
      ]),
      multiple: PropTypes.bool,
      options: PropTypes.arrayOf(PropTypes.shape({ text: PropTypes.string, value: PropTypes.string })),
      children: function(props, propName, componentName) {
        const childs = React.Children.toArray(props[propName]); // children elements
        const types = ['option'];

        for (const i in childs) {
          if (!React.isValidElement(childs[i]) || types.indexOf(childs[i].type) === -1) {
            return new Error(
              '`' + componentName + '` ' +
              'should have child of the following types: ' +
              ' `' + types.join('`, `') + '`.'
            );
          }
        }
      }
    });
  }

  /**
   * @override
   */
  _getPropAttributes() {
    const props = super._getPropAttributes();
    props.className = this.formStyle.formControl + (props.className? ' '+ props.className : '');

    delete props.options;
    delete props.children;
    return props;
  }

  render() {
    var i, option, boxes = [];
    if (this.props.options) {
      for (i = 0; i < this.props.options.length; i++) {
        option = this.props.options[i];
        boxes.push(<option key={i} value={option.value}>{option.text}</option>);
      }
    }
    if (boxes.length == 0) boxes = this.props.children;
    return (
      <div className={this.dropDownStyle.dropDownWrapper}>
        <select {...this._getPropAttributes()}>
          {boxes}
        </select>
      </div>
    );
  }
}

export default PlainDropdown;