import React, { PropTypes }  from 'react';

// Version of checkbox
import PlainCheckbox from './PlainCheckbox';
import SoyaCheckbox from './SoyaCheckbox';
import CheckboxGroup from './CheckboxGroup';

class CheckboxWrapper extends React.Component {
  static get propTypes() {
    return Object.assign({}, PlainCheckbox.propTypes, {
      form: PropTypes.object,
      context: PropTypes.object
    });
  }

  static get STYLE() {
    return PlainCheckbox.STYLE;
  }

  render() {
    let Element = PlainCheckbox;
    if (this.props.options) {
      Element = CheckboxGroup;
    } else if (this.props.form) {
      Element = SoyaCheckbox;
    }

    return <Element {...this.props} />
  }
}

export default CheckboxWrapper;
