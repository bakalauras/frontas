import { Injectable } from '@angular/core';
import { ContestFile } from './contest-file.model';
import { environment } from 'src/environments/environment';
import { Contest } from 'src/app/contests/shared/contest.model';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ContestFileService {


  formData:ContestFile;
  readonly rootURL = environment.rootURL;
  list : ContestFile[];
  readonly apiName = '/ContestFiles';

  constructor(private http:HttpClient, private toastr: ToastrService) {}

  postRecord(){
    return this.http.post(this.rootURL+this.apiName,this.formData);
  }

  putRecord(){
    return this.http.put(this.rootURL+this.apiName+'/'+this.formData.ContestFileId,this.formData);
  }

  deleteRecord(id){
    return this.http.delete(this.rootURL+ this.apiName+'/'+id);
  }

  refreshList(id, callBack)
  {
    if(id!=0)
    {
      this.http.get(this.rootURL+'/contests/'+id+'/files').
    toPromise()
    .then(res => {this.list = res as ContestFile[], callBack(this)});
    }
  }

  downloadFile(data: any, filename: string) {
    const blob = new Blob([data], { type: 'application/octet-stream' });
    saveAs(blob, filename);
  }

  public getDocument(id: number, fileName: string) {

    this.http.get(this.rootURL + '/Upload/' + id + '/contest', {responseType: 'blob'})
      .subscribe((data) => this.downloadFile(data, fileName), 
      error => { 
        console.log(error);
        this.toastr.error('Nepavyko parsiųsti failo.');
      },
        () => console.info('OK'));
  }
}