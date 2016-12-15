import React from 'react';
import Button from '../../../../components/soya-component/dashboard/common/Button/Button.js';
import SimpleTable from '../../../../components/soya-component/dashboard/common/Table/SimpleTable/SimpleTable.js';



export default class SupplierProductComponent extends React.Component {
  render(){
    return(
      <div>
        supplier product
        <Button buttonSize={Button.SIZE.DEFAULT}
                buttonStyle={Button.STYLE.PRIMARY}
                handleClick={(e) => {
                  window.location = this.props.context.router.reverseRoute('PRODUCT');
                }}
        >
          Add New Product
        </Button>&nbsp;

        <br />
        <SimpleTable
          tableBody={supplierListWithManager}
          fields={[
            {field: 'supplierName', label: `Supplier's Name`},
            {field: 'marketManager', label: 'Market Manager'},
            {field: 'action', label: 'Action'}
          ]}
          tableActionsObject={
            {supplierName: {onClick: (e) => { window.location.href = "/suppliers/"+this.props.title }}}
          }
        />
      </div>
    );
  }
}
