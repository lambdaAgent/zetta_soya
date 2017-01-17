import Service from 'soya/lib/data/redux/Service';
import {baseUrl} from '../../shared/routeRequirement.js';


export default class dashboardService extends Service {
  static id() {
    return 'suppliers_service';
  }

  postNewSupplier(form){
    return new Promise((resolve, reject) => {
      fetch(baseUrl + "/supplier", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })
        .then(res => {
          // if 200, redirect to SupplierMainPage, add success message to
          if(res.status === 200){ return res.json() }
        })
        .then(res => resolve({newSupplier: res}))
    });
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
        .then(res => res.json())
        .then(res => {
          resolve({supplierWithManager: res})
        })
    })
  }
}
