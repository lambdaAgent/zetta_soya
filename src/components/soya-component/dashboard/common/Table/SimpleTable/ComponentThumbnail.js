import React from 'react';
import SimpleTable from './SimpleTable';
import Button from '../../Button/Button';

class ComponentThumbnail extends React.Component {
  actionHandler(data) {
    return '#' + data.id;
  }

  render() {
    const tableData = [
      { id: '1', name: 'Sherlock Holmes', occupation: ['Detective', 'Unknown'] },
      { id: '2', name: 'Tony Stark', occupation: ['Super Hero', 'Businessman'] },
      { id: '3', name: 'Lana del Rey', occupation: ['Singer', 'Woman'] }
    ];

    return (
      <div>
        <SimpleTable
          tableBody={tableData}
          fields={[
            'id',
            'name',
            'occupation.0',
            { field: 'occupation.1', label: 'Job 2'}
          ]}
          tableActions={[
            { href: (data) => '#' + data.id, label: 'Edit' },
            { action: (data) => { console.log(data) }, label: 'Delete', component: Button }
          ]}
        />
      </div>
    );
  }
}

export default ComponentThumbnail;
