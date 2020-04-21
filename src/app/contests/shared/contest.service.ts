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
  selected : Contest;
  readonly apiName = '/Contests';

  constructor(private http:HttpClient){}

  postRecord(){
    return this.http.post<{ContestId : number}>(this.rootURL+this.apiName,this.formData);
  }

  putRecord(){
    return this.http.put(this.rootURL+this.apiName+'/'+this.formData.ContestId,this.formData);
  }

  deleteRecord(id){
    return this.http.delete(this.rootURL+ this.apiName+'/'+id);
  }

  getRecord(id){
    if(id!=0)
    {
      this.http.get(this.rootURL+this.apiName+'/'+id).
    toPromise()
    .then(res => this.formData = res as Contest);
    }
    
  }

  refreshList(callback)
  {
    this.http.get(this.rootURL+this.apiName).
    toPromise()
    .then(res => {this.list = res as Contest[], callback(this)});
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
}