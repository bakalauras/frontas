import { Injectable } from '@angular/core';
import { ContestFile } from './contest-file.model';
import { environment } from 'src/environments/environment';
import { Contest } from 'src/app/contests/shared/contest.model';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ContestFileService {


  formData:ContestFile;
  readonly rootURL = environment.rootURL;
  list : ContestFile[];
  readonly apiName = '/ContestFiles';

  constructor(private http:HttpClient) {}

  postRecord(){
    return this.http.post(this.rootURL+this.apiName,this.formData);
  }

  putRecord(){
    return this.http.put(this.rootURL+this.apiName+'/'+this.formData.ContestFileId,this.formData);
  }

  deleteRecord(id){
    return this.http.delete(this.rootURL+ this.apiName+'/'+id);
  }

  refreshList(id)
  {
    if(id!=0)
    {
      this.http.get(this.rootURL+'/contests/'+id+'/files').
    toPromise()
    .then(res => this.list = res as ContestFile[]);
    }
  }
}