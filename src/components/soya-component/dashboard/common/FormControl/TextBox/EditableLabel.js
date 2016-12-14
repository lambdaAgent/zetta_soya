import React, { PropTypes } from 'react';
import FormControl from '../FormControl';
import createField from 'soya/lib/data/redux/form/createField';

import TextBox from './PlainTextBox';
import style from './EditableLabel.mod.css';

const _throttle = (() => {
  let timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

class EditableLabel extends FormControl {
  static get propTypes() {
    return {
      form: PropTypes.object.isRequired,
      context: PropTypes.object.isRequired
    };
  }

  static connectId() {
    return 'EditableLabel';
  }

  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
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

  _toggleMode() {
    this.setState({
      editing: !this.state.editing
    });
  }

  render() {
    return (
      <div className={style.wrapper + ' ' + (this.state.editing ? style.editing : '')} style={this.props.style}>
        <div className={style.label} style={{ display: (!this.state.editing ? '': 'none') }}>{this.props.value}</div>
        <TextBox {...this._getPropAttributes()} style={{ display: (this.state.editing ? '': 'none') }} />
        <a href='javascript:;' onClick={this._toggleMode.bind(this)}>{(this.state.editing ? 'Done' : 'Edit')}</a>
      </div>
    );
  }
}

export default createField(EditableLabel);
