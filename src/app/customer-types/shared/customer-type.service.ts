import { Injectable } from '@angular/core';
import { CustomerType } from './customer-type.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerTypeService {

  formData:CustomerType;
  readonly rootURL = environment.rootURL;
  list : CustomerType[];
  readonly apiName = '/CustomerTypes';

  constructor(private http:HttpClient) { }

  postRecord(){
    return this.http.post(this.rootURL+this.apiName,this.formData);
  }

  putRecord(){
    return this.http.put(this.rootURL+this.apiName+'/'+this.formData.CustomerTypeId,this.formData);
  }

  deleteRecord(id){
    return this.http.delete(this.rootURL+ this.apiName+'/'+id);
  }

  refreshList(callBack)
  {
    this.http.get(this.rootURL+this.apiName).
    toPromise()
    .then(res => {this.list = res as CustomerType[], callBack(this)});
  }
}
