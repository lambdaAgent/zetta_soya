import React, { PropTypes } from 'react';
import createField from 'soya/lib/data/redux/form/createField';
import TextArea from './PlainTextArea';

class SoyaTextArea extends TextArea {
  /**
   * @required
   */
  static connectId() {
    return 'SoyaTextArea';
  }

  /**
   * @override
   */
  static get propTypes() {
    return Object.assign({}, TextArea.propTypes, {
      form: PropTypes.object,
      context: PropTypes.object
    })
  }

  /**
   * @override
   */
  componentWillMount() {
    // no-ops
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
      this.props.handleChange(event.target.value);
    }
  }
}

export default createField(SoyaTextArea);