import React from 'react';
import DateTimePickerField from './DateTimePicker';
import Form from 'soya/lib/data/redux/form/Form';

class ComponentThumbnail extends React.Component {
  componentWillMount() {
    this.form = new Form(this.props.context.reduxStore, 'DateTimePicker');
  }

  render() {
    return (
      <div style={{ minHeight: '330px', width: '300px' }}>
        <DateTimePickerField name='sDateTime' defaultText='Not defined' form={this.form} context={this.props.context} />
      </div>
    );
  }
}

export default ComponentThumbnail;
