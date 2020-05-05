import { Injectable } from '@angular/core';
import { TenderFile } from './tender-file.model';
import { environment } from 'src/environments/environment';
import { Tender } from 'src/app/tenders/shared/tender.model';
import { HttpClient } from '@angular/common/http';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TenderFileService {

  formData:TenderFile;
  readonly rootURL = environment.rootURL;
  list : TenderFile[];
  list2: Tender[];
  readonly apiName = '/TenderFiles';

  constructor(private http:HttpClient, private toastr: ToastrService) { }

  postRecord(){
    return this.http.post(this.rootURL+this.apiName,this.formData);
  }

  putRecord(){
    return this.http.put(this.rootURL+this.apiName+'/'+this.formData.TenderFileId,this.formData);
  }

  deleteRecord(id){
    return this.http.delete(this.rootURL+ this.apiName+'/'+id);
  }

  refreshList(id, callBack)
  {
    if(id!=0)
    {
      this.http.get(this.rootURL+'/tenders/'+id+'/files').
    toPromise()
    .then(res => {this.list = res as TenderFile[], callBack(this)});
    }
  }

  downloadFile(data: any, filename: string) {
    const blob = new Blob([data], { type: 'application/octet-stream' });
    saveAs(blob, filename);
  }

  public getDocument(id: number, fileName: string) {

    this.http.get(this.rootURL + '/Upload/' + id + '/tender', {responseType: 'blob'})
      .subscribe((data) => this.downloadFile(data, fileName), 
      error => { 
        console.log(error);
        this.toastr.error('Nepavyko parsiųsti failo.');
      },
        () => console.info('OK'));
  }
}
