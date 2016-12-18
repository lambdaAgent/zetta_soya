const routeRequirement = [
  'DASHBOARD',
  'LOGIN',
  'SUPPLIER',
  'SUPPLIER_ADD',
  'SUPPLIER_DETAIL',
  'ALLOTMENT',
  'ACCOUNT_MANAGEMENT',
  'ACCOUNT_ADD',
  'TRANSACTION',
  'PRODUCT_ADD',
  'PRODUCT_DETAIL'
];

let routeConstant = {};
routeRequirement.map(r => {
  routeConstant[r] = r;
});

const navbarContent = [
  {
    title: 'Dashboard', path: 'DASHBOARD'
  },
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

const baseUrl = 'http://localhost:3000';

export default {
  baseUrl,
  routeRequirement,
  routeConstant,
  navbarContent
}