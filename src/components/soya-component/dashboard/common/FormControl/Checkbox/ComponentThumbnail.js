import React from 'react';
import Checkbox from './Checkbox.js';
import Form from 'soya/lib/data/redux/form/Form';

class ComponentThumbnail extends React.Component {
  componentWillMount() {
    this.form = new Form(this.props.context.reduxStore, 'Checkbox');
  }

  render() {
    const options = [
      { text: 'Red', value: 'red' },
      { text: 'Green', value: 'green' },
      { text: 'Blue', value: 'blue' }
    ];

    return (
      <div>
        <h5>Plain checkbox</h5>
        <Checkbox name='gender' text='Laki-laki' /><br />
        <Checkbox name='light' conditionalText={{ true: 'On', false: 'Off' }}
                  style={Checkbox.STYLE.SWITCH} /><br />

        <h5>Redux connected</h5>
        <Checkbox name='light' conditionalText={{ true: 'On', false: 'Off' }}
                  style={Checkbox.STYLE.SMALL_SWITCH}
                  form={this.form} context={this.props.context} />

        <h5>Redux connected group</h5>
        <Checkbox name='colors' options={options} form={this.form} context={this.props.context} />
      </div>
    );
  }
}

export default ComponentThumbnail;
