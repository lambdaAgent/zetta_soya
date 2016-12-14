import React, { PropTypes } from 'react';
import createField from 'soya/lib/data/redux/form/createField';

import FormControl from '../FormControl';
import Radio from './PlainRadio';
import style from './SoyaRadioGroup.mod.css';

class SoyaRadioGroup extends FormControl {
  constructor(props) {
    super(props);
    this.radioListStyle = style;
  }

  /**
   * @required
   */
  static connectId() {
    return 'SoyaRadioGroup';
  }

  /**
   * @override
   */
  static get propTypes() {
    return Object.assign({}, FormControl.propTypes, {
      options: PropTypes.arrayOf(PropTypes.shape({text: PropTypes.string, value: PropTypes.string})),
      form: PropTypes.object,
      context: PropTypes.object
    });
  }

  /**
   * @override
   */
  _getPropAttributes() {
    const props = super._getPropAttributes();
    props.className = this.radioListStyle.radioList + (props.className? ' '+ props.className : '');

    delete props.options;
    delete props.style;

    delete props.form;
    delete props.context;

    return props;
  }

  render() {
    console.log('soya radio');
    var i, option, id, radios = [];
    for (i = 0; i < this.props.options.length; i++) {
      option = this.props.options[i];
      id = 'rd_' + +this.props.form.getFormId()+ '_' +this.props.name+ '_' +i;
      radios.push(
        <Radio id={id} key={id} name={this.props.name}
               text={option.text} value={option.value}
               defaultChecked={this.props.value === option.value}
               onChange={this._handleChange.bind(this)}
               disabled={this.props.disabled} />
      );
    }

    return <div {...this._getPropAttributes()}>
      {radios}
      {this.props.errorMessages.length > 0 ? <span>{this.props.errorMessages[0]}</span> : null}
    </div>;
  }

  /**
   * @protected
   */
  _handleChange(event) {
    if (typeof this.props.handleChange === 'function') {
      this.props.handleChange(event.target.value, event);
    }
  }
}

export default createField(SoyaRadioGroup);