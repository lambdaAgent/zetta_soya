import React, { PropTypes } from 'react';
import Component from '../../base/Component';

class FormControl extends Component.ContextComponent {
  constructor(props) {
    super(props);
    this.formStyle = require('./FormControl.mod.css');
  }

  /**
   * Define generally required properties
   */
  static get propTypes() {
    return {
      name: PropTypes.any.isRequired,
      eventEmitter: PropTypes.object,
      disabled: PropTypes.bool
    };
  }

  /**
   * Return new object of properties
   * @protected
   */
  _getPropAttributes() {
    const props = Object.assign({}, this.props);
    props.disabled = (this.props.disabled === true) || (this.props && this.props.isDisabled && !this.props.isValidating);

    delete props.eventEmitter;
    return props;
  }
}

export default FormControl;
