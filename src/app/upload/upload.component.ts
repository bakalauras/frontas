import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styles: []
})
export class UploadComponent implements OnInit {
  public message: string;
  public progress: number;
  readonly rootURL = environment.rootURL;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient) { }

  ngOnInit(){
  }

  public uploadFile = (files) =>{
    if(files.length === 0)
      return;

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    //this.http.post(this.rootURL + '/Salaries', this.formData)
    this.http.post(this.rootURL + '/upload', formData, {reportProgress: true, observe:'events'})
    .subscribe(event => {
        if(event.type === HttpEventType.UploadProgress){
          this.progress = Math.round(100*event.loaded/event.total);
        }
        else if(event.type === HttpEventType.Response){
          this.message = 'Sėkmingai įkelta.';
          this.onUploadFinished.emit(event.body);
        }
    });
  }
  

}
