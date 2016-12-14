import React, { PropTypes } from 'react';
import createField from 'soya/lib/data/redux/form/createField';
import PlainCheckbox from './PlainCheckbox';

class SoyaCheckbox extends PlainCheckbox {
  static connectId() {
    return 'SoyaSwitch';
  }

  static get propTypes() {
    return Object.assign({}, PlainCheckbox.propTypes, {
      form: PropTypes.object.isRequired,
      context: PropTypes.object.isRequired
    });
  }

  _getPropAttributes() {
    const props = super._getPropAttributes();
    props.onChange = this._handleChange.bind(this);

    props.checked = (props.value && (props.value === 'true' || props.value === true)) || false;

    delete props.form;
    delete props.context;

    return props;
  }

  _handleChange(event) {
    if (typeof this.props.handleChange === 'function') {
      this.props.handleChange(event.target.checked);
    }
  }
}

export default createField(SoyaCheckbox);
