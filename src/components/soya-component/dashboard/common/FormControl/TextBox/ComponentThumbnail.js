import React from 'react';
import Form from 'soya/lib/data/redux/form/Form';

import TextBox from './TextBox';
import StaticText from './StaticText';
import EditableLabel from './EditableLabel';

class ComponentThumbnail extends React.Component {
  componentWillMount() {
    this.form = new Form(this.props.context.reduxStore, 'TextBox');
  }

  render() {
    return (
      <div>
        <h5>Plain TextBox</h5>
        <TextBox name='titleText' defaultValue='Sample value' onChange={() => {}} />

        <h5>Password</h5>
        <TextBox isPassword={true} name='titleText' defaultValue='Sample value' onChange={() => {}} />

        <h5>Redux connected</h5>
        <TextBox name='titleText' placeholder='Type here to see demo...' form={this.form} context={this.props.context} />

        <h5>StaticText</h5>
        <StaticText name='titleText' form={this.form} context={this.props.context} clickAction={() => {}} />

        <h5>EditableLabel</h5>
        <EditableLabel name='titleText' form={this.form} context={this.props.context} />
      </div>
    );
  }
}

export default ComponentThumbnail;
