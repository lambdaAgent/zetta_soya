import React from 'react';
import DynamicCellTable from './DynamicCellTable';
import Button from '../../Button/Button'; 
const data = {
  data: [
    [
      {
        value: 'Item'
      },
      {
        value: 'Kind'
      },
      {
        value: 'Scope'
      },
      {
        value: 'Amount'
      },
      {
        value: 'Action',
        columnSpace: 1
      }
    ],
    [
      {
        value: '123123'
      },
      {
        value: 'Sales'
      },
      {
        value: 'Trinusa'
      },
      {
        value: 'IDR 12,345'
      },
      {
        value: <Button buttonSize={Button.SIZE.SMALL} buttonStyle={Button.STYLE.ORANGE} >Edit</Button> 
      },
      {
        value: <Button buttonSize={Button.SIZE.SMALL} buttonStyle={Button.STYLE.RED} >Remove</Button>  
      }
    ],
    [
      {
        value: '123123'
      },
      {
        value: 'Trinusa',
        columnSpace: 1,
      },
      {
        value: 'IDR 12,345'
      },
      {
        value: <Button buttonSize={Button.SIZE.SMALL} buttonStyle={Button.STYLE.ORANGE} >Edit</Button>  
      },
      {
        value: <Button buttonSize={Button.SIZE.SMALL} buttonStyle={Button.STYLE.RED} >Remove</Button> 
      }
    ],
    [
      {
        value: 'Total',
        columnSpace: 2,
        isBold: true,
      },
      {
        value: 'IDR 12,345',
        isBold: true,
        columnSpace: 2,
      },
    ],
  ],
};


class ComponentThumbnail extends React.Component {
  render() {
    return <DynamicCellTable data={data} /> ;
  }
}

export default ComponentThumbnail;