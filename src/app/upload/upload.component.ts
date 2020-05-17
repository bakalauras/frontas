import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const MAX_SIZE: number = 1048576;

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styles: []
})
export class UploadComponent implements OnInit {
  public message: string;
  public progress: number;
  public fileToUpload: File;
  readonly rootURL = environment.rootURL;
  @Output() public onUploadFinished = new EventEmitter();
  constructor(private http: HttpClient) { }

  ngOnInit(){
  }

  public uploadFile = (files) =>{
    if(files.length === 0)
      return;

    this.fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);

    this.http.post(this.rootURL + '/Upload', formData, {reportProgress: true, observe:'events'})
    .subscribe(event => {
        if(event.type === HttpEventType.UploadProgress){
          this.progress = Math.round(100*event.loaded/event.total);
        }
        else if(event.type === HttpEventType.Response){
          this.message = 'Failas sėkmingai įkeltas.';
          this.onUploadFinished.emit(event.body);
        }
    });
  }

 getFileName()
 {
   return this.fileToUpload.name;
 }
}
