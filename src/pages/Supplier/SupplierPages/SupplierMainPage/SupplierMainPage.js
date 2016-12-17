import React from 'react';
import ReduxPage from 'soya/lib/page/ReduxPage';
import ReactRenderer from 'soya/lib/page/react/ReactRenderer';
import register from 'soya/lib/client/Register';
import RenderResult from 'soya/lib/page/RenderResult';
import connect from 'soya/lib/data/redux/connect';
import {routeRequirement} from '../../../../shared/routeRequirement.js';

import SupplierSegment from '../../SupplierSegment/SupplierSegment.js';

// component
import Navbar from '../../../../components/zetta/Navbar/Navbar.js';
import Button from '../../../../components/soya-component/dashboard/common/Button/Button.js';
import SimpleTable from '../../../../components/soya-component/dashboard/common/Table/SimpleTable/SimpleTable.js';
const FORM_ID = 'supplier';

// let sampleSuppliers = [
//   {
//     supplierName: 'PT. something',
//     marketManager: 'Dimas',
//     _id: '1234ds',
//   }
// ];



class Component extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  componentWillMount(){
    this.actions = this.props.context.store.register(SupplierSegment);
    // this.form = new Form(this.props.context.store, FORM_ID);
    this.props.context.store.dispatch(this.actions.getSupplierListWithMarketManager());
  }
  static getSegmentDependencies() {
    return [SupplierSegment];
  }

  static subscribeQueries(props, subscribe) {
    // subscribe(DashboardSegment.id(), props.userId, 'dashboard');
    subscribe(SupplierSegment.id(), 'supplierWithManager', 'supplierWithManager');
  }

  handleTabClick(id){
    this.setState({showTabbed: id});
  }



  render(){
    let showedComponent;
    //TODO data from server must be extended by extras
    let supplierListWithManager = (this.props.result.supplierWithManager && this.props.result.supplierWithManager.length > 0 ) ? this.props.result.supplierWithManager : [];
    supplierListWithManager = supplierListWithManager.map(s => {
      s.action = <Button>remove</Button>;
      return s;
    });


    return <div>
      <Navbar context={this.props.context} active={'SUPPLIERS'} />
      {/*TODO: change window.location.href to reverseRoute*/}
      <Button onClick={(e) => window.location.href="/suppliers/add"}>Add New Suppliers</Button>

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
  }
}

const SupplierConnect = connect(Component);

class SuppliersPage extends ReduxPage {
  static get pageName(){
    return 'Supplier';
  }

  static getRouteRequirements() {
    return routeRequirement;
  }

  render(httpRequest, routeArgs, store, callback){
    let reactRenderer = new ReactRenderer();
    reactRenderer.head = '<title>Supplier Page</title>';
    reactRenderer.body = React.createElement(SupplierConnect, {
      context: this.createContext(store)
    });
    let renderResult = new RenderResult(reactRenderer);
    callback(renderResult);
  }
}

register(SuppliersPage);
export default SuppliersPage;
