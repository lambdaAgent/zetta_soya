import React from 'react';
import Form from 'soya/lib/data/redux/form/Form';

import Dropdown from './Dropdown';

class ComponentThumbnail extends React.Component {
  componentWillMount() {
    // this.form = new Form(this.props.context.reduxStore, 'Dropdown');
  }

  render() {
    const options = [
      { text: 'Apple', value: 'apple' },
      { text: 'Banana', value: 'banana' },
      { text: 'Cranberry', value: 'cranberry' }
    ];

    return (
      <div>
        <h5>Plain Dropdown</h5>
        <Dropdown name='fruit'>
          <option value='apple'>Apple</option>
          <option value='banana'>Banana</option>
          <option value='cranberry'>Cranberry</option>
        </Dropdown>

        <h5>With options props</h5>
        <Dropdown name='fruit' defaultValue='cranberry' options={options} />

        <h5>Redux connected</h5>
        {/*<Dropdown
          name='ddsFruit'
          options={options}
          form={this.form}
          context={this.props.context} /> */}
        <Dropdown
          name='ddsFruit'
          options={options}
          form={this.props.form}
          context={this.props.context} />
      </div>
    );
  }
}

export default ComponentThumbnail;
