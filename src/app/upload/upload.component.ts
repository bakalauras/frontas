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
  /*theFile: any = null;
  messages: string[] = [];*/
  constructor(private http: HttpClient) { }

  ngOnInit(){
  }

  public uploadFile = (files) =>{
    if(files.length === 0)
      return;

    this.fileToUpload = <File>files[0];
    const formData = new FormData();
   // formData.append('name', name);
    formData.append('file', this.fileToUpload, this.fileToUpload.name);

    //this.http.post(this.rootURL + '/Salaries', this.formData)
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

  /*onFileChange(event) {
    this.theFile = null;
    if (event.target.files &&
        event.target.files.length > 0) {
      // Don't allow file sizes over 1MB
      if (event.target.files[0].size < MAX_SIZE) {
        // Set theFile property
        this.theFile = event.target.files[0];
      }
      else { // Display error message
        this.messages.push("File: " +
            event.target.files[0].name
            + " is too large to upload.");
      }
    }
  }

  private readAndUploadFile(theFile: any) {
    let file = new FileToUpload();
        
    // Set File Information
    file.fileName = theFile.name;
    file.fileSize = theFile.size;
    file.fileType = theFile.type;
    file.lastModifiedTime = theFile.lastModified;
    file.lastModifiedDate = theFile.lastModifiedDate;
        
    // Use FileReader() object to get file to upload
    // NOTE: FileReader only works with newer browsers
    let reader = new FileReader();
        
    // Setup onload event for reader
    reader.onload = () => {
      // Store base64 encoded representation of file
      file.fileAsBase64 = reader.result.toString();
        
      // POST to server
      this.uploadService.uploadFile(file)
        .subscribe(resp =>
          { this.messages.push("Upload complete"); });
    }
        
    // Read the file
    reader.readAsDataURL(theFile);
  }

  uploadFile(): void {
    this.readAndUploadFile(this.theFile);
  }*/
}
