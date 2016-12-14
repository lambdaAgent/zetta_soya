import React from 'react';
import Form from 'soya/lib/data/redux/form/Form';

import TextArea from './TextArea';

class ComponentThumbnail extends React.Component {
  componentWillMount() {
    this.form = new Form(this.props.context.reduxStore, 'TextArea');
  }

  render() {
    return (
      <div>
        <h5>Plain TextArea</h5>
        <TextArea name='titleText' defaultValue='Sample value' onChange={() => {}} />

        <h5>Redux connected</h5>
        <TextArea name='titleText' form={this.form} context={this.props.context} />
      </div>
    );
  }
}

export default ComponentThumbnail;
