const routeRequirement = [
  'DASHBOARD',
  // 'LOGIN',
  'PLAYGROUND',
  'SUPPLIER',
  'SUPPLIER_ADD',
  'SUPPLIER_DETAIL',
  'ALLOTMENT',
  'ACCOUNT_MANAGEMENT',
  'ACCOUNT_ADD',
  'TRANSACTION',
  'PRODUCT_ADD',
  'PRODUCT_DETAIL',
  'ITEM_ADD'
];

let routeConstant = {};
for(let i=0; i<routeRequirement.length; i++){
  routeConstant[routeRequirement[i]] = routeRequirement[i];
}

const navbarContent = [
  // {
  //   title: 'Dashboard', path: 'DASHBOARD'
  // },
  {
    title: 'Suppliers Data', path: 'SUPPLIER'
  },
  {
    title: 'Allotment & Role Plan', path: 'ALLOTMENT'
  },
  {
    title: 'Account Management', path: 'ACCOUNT_MANAGEMENT'
  },
  {
    title: 'Transaction', path: 'TRANSACTION'
  },
];

//TODO: baseURl is from this.config.apiUrl, do not use hardcode like below
const baseUrl = 'http://localhost:3000';

export default {
  baseUrl,
  routeRequirement,
  routeConstant,
  navbarContent
}