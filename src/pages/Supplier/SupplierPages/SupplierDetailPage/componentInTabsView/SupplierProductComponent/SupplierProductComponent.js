import React from 'react';
import Button from '../../../../../../components/soya-component/dashboard/common/Button/Button.js';
import SimpleTable from '../../../../../../components/soya-component/dashboard/common/Table/SimpleTable/SimpleTable.js';
import {formatCurrency} from '../../../../../../shared/utilities.js';


export default class SupplierProductComponent extends React.Component {
  constructor(props){
    super(props);
    this.state={};

  }
  render(){
    const product = this.props.products.map(p => {
      p.product_price = formatCurrency(p.product_price);
      return p;
    });
    return(
      <div>
        supplier product
        <Button buttonSize={Button.SIZE.DEFAULT}
                buttonStyle={Button.STYLE.PRIMARY}
                handleClick={(e) => {
                  // window.location = this.props.context.router.reverseRoute('PRODUCT_ADD');
                  window.location = window.location.href + "/products/add";
                }}
        >
          Add New Product
        </Button>&nbsp;

        <br />
        <SimpleTable
          tableBody={product}
          fields={[
            {field: 'product_name', label: `Product Name`},
            {field: 'product_price', label: 'product Price'},
            {field: 'status', label: 'status'},
            {field: 'action', label: 'Action'}
          ]}
          tableActionsObject={
            {product_name: {onClick: (e) => {
              const currentlySelectedSupplier = window.location.href.split("/").slice(-1)[0];
              window.location.href = "/suppliers/"+currentlySelectedSupplier+'/products/'+this.props.title }}
            }
          }
        />
      </div>
    );
  }
}
