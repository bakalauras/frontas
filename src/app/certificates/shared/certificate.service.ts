import { Injectable } from '@angular/core';
import { Certificate } from './certificate.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  formData:Certificate
  readonly rootURL = environment.rootURL;
  list:Certificate[];

  constructor(private http:HttpClient) { }

  postCertificate(formData:Certificate){
    return this.http.post(this.rootURL + '/Certificates', this.formData)
  }

  putCertificate(formData:Certificate){
    console.log(formData);
    return this.http.put(this.rootURL + '/Certificates/'+ this.formData.CertificateId, this.formData)
  }

  deleteCertificate(id){
    return this.http.delete(this.rootURL + '/Certificates/'+ id)
  }

  refreshList(){
    this.http.get(this.rootURL + '/Certificates')
    .toPromise()
    .then(res =>this.list=res as Certificate[])
  }
}
