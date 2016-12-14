import React from 'react';
import createField from 'soya/lib/data/redux/form/createField';
import TextAreaFieldDumb from './TextAreaFieldDumb';

import style from './TextAreaField.css';

class TextAreaField extends React.Component {

  static get propTypes() {
    return {
      form: React.PropTypes.object,
      context: React.PropTypes.object,
      value: React.PropTypes.string,
      label: React.PropTypes.string,
      isDisabled: React.PropTypes.bool,
      errorMessages: React.PropTypes.array,
    };
  }

  static get defaultProps() {
    return {
      value: ''
    };
  }

  static connectId() {
    return 'TextAreaField';
  }

  componentWillMount() {
    this.prevValidatedValue = null;
  }

  handleChange(event) {
    // Always run async validation if value is changed at least once.
    this.prevValidatedValue = null;
    this.props.handleChange(event.target.value, event);
  }

  handleBlur(event) {
    if (this.prevValidatedValue !== this.props.value) {
      this.prevValidatedValue = this.props.value;
      this.props.handleAsyncValidation(this.props.value, event);
    }
  }

  render() {
    return (
      <TextAreaFieldDumb {...this.props}
                         onChange={this.handleChange.bind(this)}
                         onBlur={this.handleBlur.bind(this)}
      />
    );
  }
}

export default createField(TextAreaField);
