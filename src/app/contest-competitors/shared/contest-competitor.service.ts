import { Injectable } from '@angular/core';
import { ContestCompetitor } from './contest-competitor.model';
import { environment } from 'src/environments/environment';
import { Competitor } from 'src/app/competitors/shared/competitor.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContestCompetitorService {

  formData:ContestCompetitor
  readonly rootURL = environment.rootURL;
  list:ContestCompetitor[];
  competitorList:Competitor[];
  readonly apiName = '/ContestCompetitors';

  constructor(private http:HttpClient) { }

  postRecord(){
    return this.http.post(this.rootURL +this.apiName, this.formData)
  }

  putRecord(){
    return this.http.put(this.rootURL +this.apiName + '/' + this.formData.ContestCompetitorId, this.formData)
  }

  deleteRecord(id){
    return this.http.delete(this.rootURL +this.apiName+ '/'+id)
  }

 refreshList(id, callBack)
 {
   if(id!=0)
   {
     this.http.get(this.rootURL+'/Contests/'+id+'/competitors').
   toPromise()
   .then(res => {this.list=res as ContestCompetitor[], callBack(this)});
   }
 }
  refreshCompetitorsList()
  {
    this.http.get(this.rootURL+'/Competitors').
    toPromise()
    .then(res => this.competitorList = res as Competitor[]);
  }
}