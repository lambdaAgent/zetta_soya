import Service from 'soya/lib/data/redux/Service';
import {baseUrl} from '../../../shared/routeRequirement.js';


export default class dashboardService extends Service {
  static id() {
    return 'suppliers_service';
  }

  fetchSupplierListWithMarketManager(){
    return new Promise((resolve, reject) => {
      fetch(baseUrl + '/supplierListWithManager')
        .then(res => res.json())
        .then(res => {
          resolve({supplierWithManager:res});
        })
    })
  }

  fetchSupplierByName(supplierName){
    return new Promise((resolve, reject) => {
      fetch(baseUrl + '/supplier/' + supplierName)
        .then(res => {
          console.log('fetch supplier', res);
          return res.json()
        })
        .then(res => {
          console.log('fetch supplier', res);
          resolve({supplierDetail: res});
        })
    })
  }

  deleteSupplierByName(supplierName){
    return new Promise((resolve, reject) => {
      fetch(baseUrl + '/supplier/' + supplierName, {method: 'delete'})
        .then(res => {
          console.log('delete supplier ', res);
          debugger;
          return res.json()
        })
        .then(res => {
          resolve({supplierWithManager: res})
        })
    })
  }
}
