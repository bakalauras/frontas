import { Injectable } from '@angular/core';
import { Contest } from './contest.model';
import { environment } from 'src/environments/environment';
import { ContestStatus } from 'src/app/contest-statuses/shared/contest-status.model';
import { Customer } from 'src/app/customers/shared/customer.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContestService {

  formData:Contest;
  readonly rootURL = environment.rootURL;
  list : Contest[];
  list2: ContestStatus[];
  list3 : Customer[];
  readonly apiName = '/Contests';

  constructor(private http:HttpClient) { }

  postRecord(){
    return this.http.post(this.rootURL+this.apiName,this.formData);
  }

  putRecord(){
    return this.http.put(this.rootURL+this.apiName+'/'+this.formData.ContestId,this.formData);
  }

  deleteRecord(id){
    return this.http.delete(this.rootURL+ this.apiName+'/'+id);
  }

  refreshList()
  {
    this.http.get(this.rootURL+this.apiName).
    toPromise()
    .then(res => this.list = res as Contest[]);
  }

  refreshContestStatusList()
  {
    this.http.get(this.rootURL+'/ContestStatus').
    toPromise()
    .then(res => this.list2 = res as ContestStatus[]);
  }

  refreshCustomerList()
  {
    this.http.get(this.rootURL+'/Customers').
    toPromise()
    .then(res => this.list3 = res as Customer[]);
  }

  getContestStatusName(id)
  {
        return this.list2.find(x => x.ContestStatusId == id).StatusName;
  }

  getCustomerName(id)
  {
        return this.list3.find(x => x.CustomerId == id).Name;
  }
}