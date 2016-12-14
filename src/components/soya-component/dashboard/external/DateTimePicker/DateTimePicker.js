/**
 * npm install react-bootstrap-datetimepicker --save
 */
// https://github.com/quri/react-bootstrap-datetimepicker
import React, { PropTypes } from 'react';
import Component from '../../base/Component';
import DateTimeField from 'react-bootstrap-datetimepicker';
import moment from 'moment';
import createField from 'soya/lib/data/redux/form/createField';

import './DateTimePicker.global.css';

export class DateTimePicker extends Component.ContextComponent {
  static get PropTypes() {
    return {
      name: PropTypes.any.isRequired,
      dateTime: PropTypes.string, // Default: moment().format('x')
      format: PropTypes.string, // Default: "x". Format for the value
      inputFormat: PropTypes.string, // Default: "MM/DD/YY h:mm A". Moment format
      showToday: PropTypes.bool, // Default: true
      size: PropTypes.string, // Default: "md"
      daysOfWeekDisabled: PropTypes.arrayOf(PropTypes.number), // Default: []
      viewMode: PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
      ]), // Default:'days'
      inputProps: PropTypes.object, // Default:
      minDate: PropTypes.instanceOf(moment), // Default:
      maxDate: PropTypes.instanceOf(moment), // Default:
      mode: PropTypes.string, // Default:
      defaultText: PropTypes.string, // Default: {dateTime}
      form: PropTypes.object,
      context: PropTypes.object
    };
  }
  static getMoment(){
    return moment;
  }

  _handleChange(date) {
    if (typeof this.props.handleChange === 'function') {
      const value = (date === 'Invalid date') ? null : date;
      this.props.handleChange(value);
    }
  }

  _getProps() {
    const props = Object.assign({}, this.props);
    props.dateTime = props.value || undefined;
    props.onChange = props.onChange || this._handleChange.bind(this);
    

    delete props.style;
    delete props.disabled;
    delete props.form;
    delete props.context;

    if(props.defaultTimestamp) props.defaultText = moment(props.defaultTimestamp).format('DD-MM-YY');
    if (props.dateTime) delete props.defaultText;
    return props;
  }

  render() {
    let overlayElement;
    if (this.props.disabled) {
      const overlayStyle = {};
      overlayStyle.position = 'absolute';
      overlayStyle.top = 0;
      overlayStyle.left = 0;
      overlayStyle.width = '100%';
      overlayStyle.height = '100%';
      overlayStyle.zIndex = 2;
      overlayStyle.backgroundColor = '#F6F6F6';
      overlayStyle.opacity = 0.7;
      overlayElement = (<div style={overlayStyle}>&nbsp;</div>);
    }
    // return (
    //   <div style={{ position: 'relative'}}>
    //     <DateTimeField {...this._getProps()} />
    //     {overlayElement}
    //   </div>
    // );
    return (
      <div style={Object.assign({}, this.props.style)}>
        <DateTimeField {...this._getProps()} />
        {overlayElement}
      </div>
    );
  }
}

export default createField(DateTimePicker);
