const routeRequirement = [
  'DASHBOARD',
  'LOGIN',
  'SUPPLIER',
  'ALLOTMENT',
  'ACCOUNT_MANAGEMENT',
  'ACCOUNT_ADD',
  'TRANSACTION',
  'PRODUCT',
  'PRODUCT_DETAIL',
  'PRODUCT_ADD',

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