import React, { PropTypes } from 'react';
import update from 'react-addons-update';
import createField from 'soya/lib/data/redux/form/createField';
import Classnames from 'classnames';

import FormControl from '../FormControl';
import Checkbox from './PlainCheckbox';
import style from './CheckboxGroup.mod.css';

class CheckboxGroup extends FormControl {
  constructor(props) {
    super(props);
    this.checkListStyle = style;
  }

  /**
   * @required
   */
  static connectId() {
    return 'CheckboxGroup';
  }

  /**
   * @override
   */
  static get propTypes() {
    return Object.assign({}, FormControl.propTypes, {
      options: PropTypes.arrayOf(PropTypes.shape({ text: PropTypes.string, value: PropTypes.string })).isRequired,
      form: PropTypes.object.isRequired,
      context: PropTypes.object.isRequired
    });
  }

  /**
   * @override
   */
  _getPropAttributes() {
    const props = super._getPropAttributes();
    props.className = Classnames(this.checkListStyle.checkList, props.className);

    delete props.options;
    delete props.style;

    delete props.form;
    delete props.context;
    return props;
  }

  _getCurrentValue() {
    return this.props.value? this.props.value : {};
  }

  _handleCheck(event) {
    let nextValue;
    const isChecked = event.target.checked,
      value = event.target.value;
    const currentValue = this._getCurrentValue();

    if (isChecked) {
      nextValue = update(currentValue, {
        [value]: { $set: true }
      });
    } else {
      nextValue = update(currentValue, {
        [value]: { $set: false }
      });
    }
    this.props.handleChange(nextValue);
  }

  render() {
    let i, option, id, boxes = [];
    const currentValue = this._getCurrentValue();

    for (i = 0; i < this.props.options.length; i++) {
      option = this.props.options[i];
      id = 'cb_' +this.props.form.getFormId()+ '_' +this.props.name+ '_' +i;

      boxes.push(
        <Checkbox id={id} key={id} name={id}
          style={Checkbox.STYLE.DEFAULT}
          text={option.text} value={option.value}
          defaultChecked={currentValue[option.value]}
          onChange={this._handleCheck.bind(this)}
          disabled={this.props.disabled}
        />
      );
    }

    return (
      <div {...this._getPropAttributes()}>
        {boxes}
        {this.props.errorMessages.length > 0 ? <span>{this.props.errorMessages[0]}</span> : null}
      </div>
    );
  }
}

export default createField(CheckboxGroup);