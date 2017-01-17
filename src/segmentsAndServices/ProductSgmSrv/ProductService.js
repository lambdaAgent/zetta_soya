import Service from 'soya/lib/data/redux/Service';
import {baseURL} from '../../shared/routeRequirement.js';

export default class dashboardService extends Service {
  static id() {
    return 'products_service';
  }

  fetchProducts(supplierName){
    return new Promise((resolve, reject) => {
      fetch(baseUrl + '/products/'+ supplierName)
        .then(res => res.json())
        .then(res => {
          resolve({all_products:res});
        })
    })
  }

  fetchProductByName(supplierName, productName){
    return new Promise((resolve, reject) => {
      fetch(baseURL + '/products/'+supplierName+'/'+productName)
        .then(res => res.json())
        .then(res => {
          resolve({product: res});
        })
    });
  }
}
