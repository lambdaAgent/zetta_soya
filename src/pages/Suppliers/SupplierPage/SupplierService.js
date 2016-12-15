
import Service from 'soya/lib/data/redux/Service';


const baseUrl = 'http://localhost:3000';

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


}
