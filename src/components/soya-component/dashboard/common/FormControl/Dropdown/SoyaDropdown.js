import React, { PropTypes } from 'react';
import createField from 'soya/lib/data/redux/form/createField';
import Dropdown from './PlainDropdown';

class SoyaDropdown extends Dropdown {
  /**
   * @required
   */
  static connectId() {
    return 'SoyaDropdown';
  }

  /**
   * @override
   */
  static get propTypes() {
    return Object.assign({}, Dropdown.propTypes, {
      form: PropTypes.object,
      context: PropTypes.object
    });
  }

  componentWillMount() {
    this._updateValue();
  }

  componentDidUpdate() {
    this._updateValue();
  }

  _updateValue() {
    if (this.props.options && this.props.options.length > 0 && typeof this.props.handleChange === 'function' && !this.props.value) {
      this.props.handleChange(this.props.options[0].value);
    } else if (this.props.children && this.props.children.length > 0 && typeof this.props.handleChange === 'function' && !this.props.value) {
      this.props.handleChange(this.props.children[0].props.value);
    }
  }

  /**
   * @override
   */
  _getPropAttributes() {
    const props = super._getPropAttributes();
    props.onChange = this._handleChange.bind(this);

    delete props.form;
    delete props.context;

    return props;
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

export default createField(SoyaDropdown);