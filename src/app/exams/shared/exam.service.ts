import { Injectable } from '@angular/core';
import { Exam } from './exam.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Certificate } from 'src/app/certificates/shared/certificate.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  formData:Exam
  readonly rootURL = environment.rootURL;
  list:Exam[];
  certificatelist:Certificate[];

  constructor(private http:HttpClient) { }

  postExam(formData:Exam){
    return this.http.post(this.rootURL + '/Exams', this.formData)
  }

  putExam(formData:Exam){
    console.log(formData);
    return this.http.put(this.rootURL + '/Exams/'+ this.formData.ExamId, this.formData)
  }

  deleteExam(id){
    return this.http.delete(this.rootURL + '/Exams/'+ id)
  }

  refreshList(){
    this.http.get(this.rootURL + '/Exams')
    .toPromise()
    .then(res =>this.list=res as Exam[])
  }

  refreshCertificateList()
  {
    this.http.get(this.rootURL+'/Certificates').
    toPromise()
    .then(res => this.certificatelist = res as Certificate[]);
  }

  getCertificateTitle(id)
  {
    return this.certificatelist.find(x => x.CertificateId == id).Title;
  }
}
