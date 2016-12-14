import React from 'react';
import Button from '../../../../components/soya-component/dashboard/common/Button/Button.js';

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
      </div>
    );
  }
}
