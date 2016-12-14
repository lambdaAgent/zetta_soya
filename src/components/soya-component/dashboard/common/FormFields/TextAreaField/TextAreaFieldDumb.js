import React from 'react';
import style from './TextAreaField.css';

class TextAreaFieldDumb extends React.Component {

  static get propTypes() {
    return {
      value: React.PropTypes.string,
      label: React.PropTypes.string,
      isDisabled: React.PropTypes.bool,
      errorMessages: React.PropTypes.array,
      handleChange: React.PropTypes.func,
      handleBlur: React.PropTypes.func
    };
  }

  static get defaultProps() {
    return {
      value: '',
      isDisabled: false,
      errorMessages: [],
      handleChange: () => { },
      handleBlur: () => { }
    };
  }

  render() {
    return (
      <div className={style.textAreaInput}>
        {this.props.label ? <label>{this.props.label}</label> : null}
        <textarea rows="5"
                  value={this.props.value ? this.props.value : ''}
                  disabled={this.props.isDisabled}
                  onChange={(event) => this.props.handleChange(event.target.value, event)}
                  onBlur={(event) => this.props.handleBlur(event.target.value, event)}
        />
        {this.props.errorMessages.length > 0 ? <span>{this.props.errorMessages[0]}</span> : null}
      </div>
    );
  }
}

export default TextAreaFieldDumb;
