import React, { PropTypes } from 'react';
import createField from 'soya/lib/data/redux/form/createField';
import TextBox from './PlainTextBox';

const _throttle = (() => {
  let timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

class SoyaTextBox extends TextBox {
  constructor(props) {
    super(props);
    this.prevValidatedValue = null;
  }
  /**
   * @required
   */
  static connectId() {
    return 'SoyaTextBox';
  }

  /**
   * @override
   */
  static get propTypes() {
    return Object.assign({}, TextBox.propTypes, {
      form: PropTypes.object.isRequired,

      context: PropTypes.object.isRequired
    });
  }

  componentWillMount() {
    if (this.props.defaultValue != null) {
      this.props.setDefaultValue(this.props.defaultValue);
    }
  }

  componentWillReceiveProps() {
    if (this.props.defaultValue != null) {
      this.props.setDefaultValue(this.props.defaultValue);
    }
  }

  /**
   * @override
   */
  _getPropAttributes() {
    const props = super._getPropAttributes();
    props.onChange = this._handleChange.bind(this);
    if  (this.props.asyncValidators) {
      props.onKeyUp = this._handleKeyUp.bind(this);
    }

    delete props.form;
    delete props.context;
    delete props.defaultValue;

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

  _handleKeyUp(event) {
    if (this.prevValidatedValue !== this.props.value) {
      this.prevValidatedValue = this.props.value;

      _throttle(() => {
        this.props.handleAsyncValidation(this.props.value, event);
      }, 400);
    }
  }
}

export default createField(SoyaTextBox);
