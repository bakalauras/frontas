import { Injectable } from '@angular/core';
import { Tender } from './tender.model';
import { environment } from 'src/environments/environment';
import { TenderState } from 'src/app/tender-states/shared/tender-state.model';
import { Contest } from 'src/app/contests/shared/contest.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TenderService {

  formData:Tender;
  readonly rootURL = environment.rootURL;
  list : Tender[];
  list2: TenderState[];
  list3 : Contest[];
  readonly apiName = '/Tenders';

  constructor(private http:HttpClient) { }

  postRecord(){
    return this.http.post<{TenderId : number}>(this.rootURL+this.apiName,this.formData);
  }

  putRecord(){
    return this.http.put(this.rootURL+this.apiName+'/'+this.formData.TenderId,this.formData);
  }

  deleteRecord(id){
    return this.http.delete(this.rootURL+ this.apiName+'/'+id);
  }

  getRecord(id){
    if(id!=0)
    {
      this.http.get(this.rootURL+this.apiName+'/'+id).
    toPromise()
    .then(res => this.formData = res as Tender);
    }
    
  }

  refreshList()
  {
    this.http.get(this.rootURL+this.apiName).
    toPromise()
    .then(res => this.list = res as Tender[]);
  }

  refreshTenderStateList()
  {
    this.http.get(this.rootURL+'/TenderStates').
    toPromise()
    .then(res => this.list2 = res as TenderState[]);
  }

  refreshContestsList()
  {
    this.http.get(this.rootURL+'/Contests').
    toPromise()
    .then(res => this.list3 = res as Contest[]);
  }

  getTenderStateName(id)
  {
        return this.list2.find(x => x.TenderStateId == id).Name;
  }

  getContestName(id)
  {
        return this.list3.find(x => x.ContestId == id).Title;
  }
}