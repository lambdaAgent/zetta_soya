import React from 'react';
import Button from '../../../../../../components/soya-component/dashboard/common/Button/Button.js';
import SimpleTable from '../../../../../../components/soya-component/dashboard/common/Table/SimpleTable/SimpleTable.js';
import {formatCurrency} from '../../../../../../shared/utilities.js';

const productsData = [
  { // don't use types url, use reverseRoute instead
    productName: <a onClick={ (e) => { window.location = `/suppliers/2/products/2`} }>'product something'</a>,
    productPrice: 100,
    status: true,
    action: "action",
    marketManager: 'Dimas',
    _id: '1234ds',
  }
];

export default class SupplierProductComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {};

  }
  render(){
    const product = Array.isArray(this.props.products) && this.props.products.length > 0 ? this.props.products.map(p => {
      p.product_price = formatCurrency(p.product_price);
      return p;
    }) : [];
    console.log("product data >>> ", productsData);
    return(
      <div>
        supplier product
        <Button buttonSize={Button.SIZE.DEFAULT}
                buttonStyle={Button.STYLE.PRIMARY}
                handleClick={(e) => {
                  // window.location = this.props.context.router.reverseRoute('PRODUCT_ADD');
                  window.location = window.location.href + "/product/add";
                }}
        >
          Add New Product
        </Button>&nbsp;

        <br />
        <SimpleTable
          tableBody={productsData}
          fields={[
            {field: 'productName', label: `Product Name`},
            {field: 'productPrice', label: 'product Price'},
            {field: 'status', label: 'status'},
            {field: 'action', label: 'Action'}
          ]}
          tableActionsObject={
            {
              product_name: {
                onClick: (e) => {
                  const currentlySelectedSupplier = window.location.href.split("/").slice(-1)[0];
                  window.location.href = "/suppliers/" + currentlySelectedSupplier + '/products/' + this.props.title
                }
              }
            }
          }
        />
      </div>
    );
  }
}
