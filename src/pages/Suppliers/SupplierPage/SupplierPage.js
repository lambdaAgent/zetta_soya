import ReduxPage from 'soya/lib/page/ReduxPage';
import ReactRenderer from 'soya/lib/page/react/ReactRenderer';
import register from 'soya/lib/client/Register';
import RenderResult from 'soya/lib/page/RenderResult';
import React from 'react';
import {routeRequirement} from '../../../shared/routeRequirement.js';

// component
import Navbar from '../../../components/zetta/Navbar/Navbar.js';
import Button from '../../../components/soya-component/dashboard/common/Button/Button.js';
import SimpleTable from '../../../components/soya-component/dashboard/common/Table/SimpleTable/SimpleTable.js';
let sampleSuppliers = [
  {
    supplierName: 'PT. something',
    marketManager: 'Dimas',
    _id: '1234ds',
  }
];


const DEFAULT_TAB = `Supplier's Product`;
const supplierTableHeader = ['Supplier Name', 'Market Manager', 'Action'];
const FORM_ID = 'supplier';
const required = function required(value) {
  if (!value || value == null || value == '') return 'This field is required.';
  return true;
};


class Component extends React.Component {
  constructor(props){
    super(props);
  }
  onSearchSpecChange(searchSpec) {
    console.log('SEARCH SPEC', searchSpec);
  };
  componentWillMount(){
    // this._form = new Form(this.props.context.store, FORM_ID);
  }
  onRowClick(id, row) {
    console.log(id, row);
  };
  handleTabClick(id){
    this.setState({showTabbed: id});
  }


  render(){
    let showedComponent;
    //TODO data from server must be extended by extras
    sampleSuppliers = sampleSuppliers.map(s => {
      s.action = <Button>remove</Button>;
      return s;
    });
    console.log(this.props);
    return <div>
      <Navbar context={this.props.context} active={'SUPPLIERS'} />
      <Button onClick={(e) => window.location.href="/suppliers/add"}>Add New Suppliers</Button>
      <SimpleTable
          tableBody={sampleSuppliers}
          fields={[
            {field: 'supplierName', label: `Supplier's Name`},
            {field: 'marketManager', label: 'Market Manager'},
            {field: 'action', label: 'Action'}
          ]}
          tableActionsObject={
            {supplierName: {onClick: (e) => { window.location.href = "/supplier/"+this.props.title }}}
          }
      />
    </div>
  }
}


class SuppliersPage extends ReduxPage {
  static get pageName(){
    return 'Suppliers';
  }

  static getRouteRequirements() {
    return routeRequirement;
  }

  render(httpRequest, routeArgs, store, callback){
    let reactRenderer = new ReactRenderer();
    reactRenderer.head = '<title>Supplier Page</title>';
    reactRenderer.body = React.createElement(Component, {
      context: this.createContext(store)
    });
    let renderResult = new RenderResult(reactRenderer);
    callback(renderResult);
  }
}

register(SuppliersPage);
export default SuppliersPage;
