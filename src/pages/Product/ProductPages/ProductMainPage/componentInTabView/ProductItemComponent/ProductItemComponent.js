import React from 'react';
import Button from '../../../../../../components/soya-component/dashboard/common/Button/Button.js'
import Checkbox from '../../../../../../components/soya-component/dashboard/common/FormControl/Checkbox/Checkbox.js';
import SimpleTable from '../../../../../../components/soya-component/dashboard/common/Table/SimpleTable/SimpleTable.js';

const itemList = [
  { _id: 'itemTicket',
    itemName: `Weekday's Ticket`,
    status: <Checkbox conditionalText={{ true: '', false: '' }} style={Checkbox.STYLE.SWITCH} />,
    allotment: <Button>Allotment</Button>,
    action: <Button onClick={(e) => console.log(e) } >remove</Button>,
    test: 'click here'
  }
];

export default class ProductItemComponent extends React.Component{
  render(){
    return(
      <div>
        there is no item yet
        <Button buttonSize={Button.SIZE.DEFAULT}
                buttonStyle={Button.STYLE.PRIMARY}
                handleClick={(e) => {
                  window.location = this.props.context.router.reverseRoute('ITEM_ADD');
                }}
        >
          Add New Item
        </Button>&nbsp;

        {
          <SimpleTable
          tableBody={itemList}
          fields={[
            {field: 'itemName', label: `Item Name`},
            {field: 'status', label: 'Status'},
            {field: 'allotment', label: 'allotment'},
            {field: 'action', label: 'action'},
            {field: 'test', label:'test'},

          ]}
          tableActionsObject={
            {
              itemName: {onClick: (e) => { console.log(this) }},
              test: {onClick: e => {console.log(this)} }
            }
          }
        />
        }
      </div>
    );
  }
}