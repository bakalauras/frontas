import { Injectable } from '@angular/core';
import { ContestCertificate } from './contest-certificate.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Certificate } from 'src/app/certificates/shared/certificate.model';
import { Contest } from 'src/app/contests/shared/contest.model';

@Injectable({
  providedIn: 'root'
})
export class ContestCertificateService {

  formData:ContestCertificate
  readonly rootURL = environment.rootURL;
  list:ContestCertificate[];
  certificatelist:Certificate[];
  //contestList:Contest[];

  constructor(private http:HttpClient) { }

  postContestCertificate(formData:ContestCertificate){
    return this.http.post(this.rootURL + '/ContestCertificates', this.formData)
  }

  putContestCertificate(formData:ContestCertificate){
    console.log(formData);
    return this.http.put(this.rootURL + '/ContestCertificates/'+ this.formData.ContestCertificateId, this.formData)
  }

  deleteContestCertificate(id){
    return this.http.delete(this.rootURL + '/ContestCertificates/'+ id)
  }

 // refreshList(){
 //   this.http.get(this.rootURL + '/ContestCertificates')
 //   .toPromise()
 //   .then(res =>this.list=res as ContestCertificate[])
 // }

 refreshList(id)
 {
   if(id!=0)
   {
     this.http.get(this.rootURL+'/Contests/'+id+'/certificates').
   toPromise()
   .then(res => this.list = res as ContestCertificate[]);
   }
 }

  refreshCertificateList()
  {
    this.http.get(this.rootURL+'/Certificates').
    toPromise()
    .then(res => this.certificatelist = res as Certificate[]);
  }

 // refreshContestList()
 // {
 //   this.http.get(this.rootURL+'/Contests').
 //   toPromise()
 //   .then(res => this.contestList = res as Contest[]);
 // }

//  getContestTitle(id)
//  {
//    return this.contestList.find(x => x.ContestId == id).Title;
//  }

  getCertificateTitle(id)
  {
    return this.certificatelist.find(x => x.CertificateId == id).Title;
  }
}
