import React from 'react';
import FilePicker from './FilePicker';
import Form from 'soya/lib/data/redux/form/Form';

class ComponentThumbnail extends React.Component {
  componentWillMount() {
    this.form = new Form(this.props.context.reduxStore, 'FilePicker');
  }

  render() {
    return (
      <div>
        <h5>Plain File Picker</h5>
        <FilePicker name='fpPhoto2' multiple={false}
                    onChange={(files) => { console.log(files) }}
                    helpText='example block-level help text here' />

        <h5>Redux connected</h5>
        <FilePicker name='fpsPhoto' multiple={true}
                    helpText='example block-level help text here'
                    form={this.form} context={this.props.context} />
      </div>
    );
  }
}

export default ComponentThumbnail;
