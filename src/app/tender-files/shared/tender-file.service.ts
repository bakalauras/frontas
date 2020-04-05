import { Injectable } from '@angular/core';
import { TenderFile } from './tender-file.model';
import { environment } from 'src/environments/environment';
import { Tender } from 'src/app/tenders/shared/tender.model';
import { HttpClient } from '@angular/common/http';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';

@Injectable({
  providedIn: 'root'
})
export class TenderFileService {

  formData:TenderFile;
  readonly rootURL = environment.rootURL;
  list : TenderFile[];
  list2: Tender[];
  readonly apiName = '/TenderFiles';

  constructor(private http:HttpClient) { }

  postRecord(){
    return this.http.post(this.rootURL+this.apiName,this.formData);
  }

  putRecord(){
    return this.http.put(this.rootURL+this.apiName+'/'+this.formData.TenderFileId,this.formData);
  }

  deleteRecord(id){
    return this.http.delete(this.rootURL+ this.apiName+'/'+id);
  }

  refreshList(id)
  {
    if(id!=0)
    {
      this.http.get(this.rootURL+'/tenders/'+id+'/files').
    toPromise()
    .then(res => this.list = res as TenderFile[]);
    }
  }
}
