import { Injectable } from '@angular/core';
import { Project } from './project.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Customer } from 'src/app/customers/shared/customer.model';
import { Tender } from 'src/app/tenders/shared/tender.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  formData:Project;
  readonly rootURL = environment.rootURL;
  list : Project[];
  list2: Customer[];
  list3 : Tender[];
  readonly apiName = '/Projects';

  constructor(private http:HttpClient) { }

  postRecord(){
    return this.http.post<{ProjectId : number}>(this.rootURL+this.apiName,this.formData);
  }

  putRecord(){
    return this.http.put(this.rootURL+this.apiName+'/'+this.formData.ProjectId,this.formData);
  }

  deleteRecord(id){
    return this.http.delete(this.rootURL+ this.apiName+'/'+id);
  }

  getRecord(id){
    if(id!=0)
    {
      this.http.get(this.rootURL+this.apiName+'/'+id).
    toPromise()
    .then(res => this.formData = res as Project);
    }
  }

  refreshList()
  {
    this.http.get(this.rootURL+this.apiName).
    toPromise()
    .then(res => this.list = res as Project[]);
  }

  refreshTenderList()
  {
    this.http.get(this.rootURL+'/Tenders').
    toPromise()
    .then(res => this.list3 = res as Tender[]);
  }

  refreshCustomerList()
  {
    this.http.get(this.rootURL+'/Customers').
    toPromise()
    .then(res => this.list2 = res as Customer[]);
  }

  getCustomerName(id)
  {
        return this.list2.find(x => x.CustomerId == id).Name;
  }
}
