import React, { PropTypes } from 'react';
import FilePicker from './PlainFilePicker';
import createField from 'soya/lib/data/redux/form/createField';

class SoyaFilePicker extends FilePicker {
  
  /**
   * @required
   */
  static connectId() {
    return 'SoyaFilePicker';
  }

  static get propTypes() {
    return Object.assign({}, {
      form: PropTypes.object,
      context: PropTypes.object
    }, FilePicker.propTypes);
  }

  /**
   * @override
   */
  _getPropAttributes() {
    const props = super._getPropAttributes();
    props.onChange = this._handleChange.bind(this);

    delete props.form;
    delete props.context;

    delete props.value; // due to security reasons
    return props;
  }
  
  /**
   * @protected
   */
  _handleChange(event) {
    if (typeof this.props.handleChange === 'function') {
      this.props.handleChange(event.target.files, event);
    }
  }
}

export default createField(SoyaFilePicker);