import React from 'react';
import ReduxPage from 'soya/lib/page/ReduxPage';
import ReactRenderer from 'soya/lib/page/react/ReactRenderer';
import register from 'soya/lib/client/Register';
import RenderResult from 'soya/lib/page/RenderResult';
import connect from 'soya/lib/data/redux/connect';
import {routeRequirement} from '../../../../shared/routeRequirement.js';
import Form from 'soya/lib/data/redux/form/Form';

import DashboardSegment from '../../../../segmentsAndServices/DashboardSgmSrv/DashboardSegment.js';
import rd3 from 'react-d3-library';
const RD3Component = rd3.Component;


// component
import Navbar from '../../../../components/zetta/Navbar/Navbar.js';
import DateTimePicker from '../../../../components/soya-component/dashboard/external/DateTimePicker/DateTimePicker.js';
import Dropdown from '../../../../components/soya-component/dashboard/common/FormControl/Dropdown/Dropdown.js';

const FORM_ID = 'dashboard';


class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {sales: [], redemption: []};
  }
  componentWillMount(){
    this.actions = this.props.context.store.register(DashboardSegment);
    this.form = new Form(this.props.context.store, FORM_ID);
    this.props.context.store.dispatch(this.actions.getSupplierNames());
    // this.props.context.store.dispatch(this.actions.load('hello'));
  }

  static getSegmentDependencies() {
    return [DashboardSegment];
  }

  static subscribeQueries(props, subscribe) {
    // subscribe(DashboardSgmSrv.id(), props.userId, 'dashboard');
    subscribe(DashboardSegment.id(), props.supplierNames, 'supplierNames');
    subscribe(DashboardSegment.id(), 'supplier', 'supplier');
  }

  submit(e){
    let callback = function(result) {
      if (result.isValid) {
        // You can access form values with result.values
        // POST(url, data);
      }
    };

    let formWideValidation = function(data) {
      if (true) {
        return {
          isValid: false,
          errorMessages: [
            {fieldName: 'passwordConfirm', messages: ['Value must be the same as password field.']}
          ]
        }
      }
      return {isValid: true, errorMessages:{}};
    };
    this.form.submit(callback, formWideValidation);
  }

  handleSelectedProduct(e){
     const selectedProduct = this.props.result.supplier.products.filter(p => p.product_name === e.target.value)[0];
     const sales = selectedProduct.sales;
     const redemptions = selectedProduct;// redemptions??
     this.setState({sales: sales});
  }

  render(){
    const supplierNames = this.props.result.supplierNames || [];
    const supplierSelected = this.props.result.supplier;
    const supplierProducts = !supplierSelected ? [] : supplierSelected.products.map(p => {
      p.label = p.product_name;
      p.value = p.product_name;
      return p;
    });


    return(
      <div>
        <Navbar
           context={this.props.context}
           active="dashboard"
        />


        <label>Supplier</label>
        {/* might not need form, since it will not be submitted s*/}
        <Dropdown
          name={'SupplierName'}
          defaultValue='none'
          context={this.props.context}
          onChange={(e) => {
            console.log('supplierSelected', e.target.value);
            this.props.context.store.dispatch(this.actions.getSupplier(e.target.value))
          }} // fetch supplier
        >
          <option value="none">select supplier</option>
          {
            supplierNames.map((option, index) => (
              <option key={`supplier-${option.value}`}
                      value={option.value}>
                {option.label}
              </option>
            ))
          }
        </Dropdown>

        <label>Product</label>
        <Dropdown
          name={'Supplier'}
          context={this.props.context}
          defaultValue="none"
          onChange={this.handleSelectedProduct.bind(this)} //filter the products and store it in data
        >
          {
            [{label: 'select product', value: 'none'}, ...supplierProducts].map((option, index) => (
              <option key={`product-${option.value}`}
                      value={option.value}>
                {option.label}
              </option>
            ))
          }
        </Dropdown>
        <div style={{display: 'block', border: '1px solid black'}}>
          <DateTimePicker
            style={{width:'30%', display: 'inline-block'}}
            context={this.props.context}
            inputFormat={"DD-MM-YY"}
            name="date_from"
            form={this.form}
            defaultTimestamp={new Date()}
          />
          <span>to</span>
          <DateTimePicker
            style={{width:'30%', display: 'inline-block'}}
            context={this.props.context}
            inputFormat={"DD-MM-YY"}
            name="date_to"
            form={this.form}
          />
        </div>
        <button onClick={this.submit.bind(this)}>submit</button>
      </div>
    )
  }
}

const DashboardConnect = connect(Dashboard);

class DashboardPage extends ReduxPage {
  static get pageName(){
    return 'Dashboard';
  }

  static getRouteRequirements() {
    return routeRequirement;
  }


  render(httpRequest, routeArgs, store, callback){
    let reactRenderer = new ReactRenderer();
    reactRenderer.head = '<title>Dashboard</title>';
    reactRenderer.body = React.createElement(DashboardConnect, {
      context: this.createContext(store),
      form: new Form(store, FORM_ID),
      supplierNames: 'supplierNames'
    });
    let renderResult = new RenderResult(reactRenderer);
    callback(renderResult);
  }
}




register(DashboardPage);
export default DashboardPage;
