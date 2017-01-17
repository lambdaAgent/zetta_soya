
import Service from 'soya/lib/data/redux/Service';


const baseUrl = 'http://localhost:3000';

export default class dashboardService extends Service {
  static id() {
    return 'dashboardService';
  }

  fetchUserProfile(userId) {
    return new Promise((resolve, reject) => {
      resolve({user: 'hello'})
    });
  }

  fetchSupplierName(){
    return new Promise((resolve, reject) => {
      fetch(baseUrl + '/supplierList')
        .then(res => res.json())
        .then(res => {
          console.log('res', res);
          resolve({supplierNames:res});
        })
    })
  }

  fetchSupplier(supplierName){
    return new Promise((resolve, reject) => {
      fetch(baseUrl + '/supplier/' + supplierName)
        .then(res => {
          return res.json()
        })
        .then(res => {
          resolve({supplier: res});
        })
    })
  }
}
