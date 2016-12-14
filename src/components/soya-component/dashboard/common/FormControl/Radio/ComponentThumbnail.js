import React from 'react';
import Form from 'soya/lib/data/redux/form/Form';

import Radio from './Radio';

class ComponentThumbnail extends React.Component {
  componentWillMount() {
    this.form = new Form(this.props.context.reduxStore, 'Radio');
  }

  render() {
    const options = [
      { text: 'Apple', value: 'apple' },
      { text: 'Banana', value: 'banana' },
      { text: 'Cranberry', value: 'cranberry' }
    ];

    return (
      <div>
        <h5>Plain Radio</h5>
        <Radio name='rdGender' value='male' text='Laki Laki' />

        <h5>Redux connected Radio</h5>
        <Radio name='rdlsFruit' options={options} form={this.form} context={this.props.context} />
      </div>
    );
  }
}

export default ComponentThumbnail;
