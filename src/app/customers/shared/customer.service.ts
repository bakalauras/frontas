import { Injectable } from '@angular/core';
import { Customer } from './customer.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CustomerType } from 'src/app/customer-types/shared/customer-type.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  formData:Customer;
  readonly rootURL = environment.rootURL;
  list : Customer[];
  list2: CustomerType[];
  readonly apiName = '/Customers';

  constructor(private http:HttpClient) { }

  postRecord(){
    return this.http.post(this.rootURL+this.apiName,this.formData);
  }

  putRecord(){
    return this.http.put(this.rootURL+this.apiName+'/'+this.formData.CustomerId,this.formData);
  }

  deleteRecord(id){
    return this.http.delete(this.rootURL+ this.apiName+'/'+id);
  }

  refreshList(callBack)
  {
    this.http.get(this.rootURL+this.apiName).
    toPromise()
    .then(res => {this.list = res as Customer[], callBack(this)});
  }

  refreshCustomerTypeList()
  {
    this.http.get(this.rootURL+'/CustomerTypes').
    toPromise()
    .then(res => this.list2 = res as CustomerType[]);
  }
}
