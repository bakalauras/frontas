import { Injectable } from '@angular/core';
import { EmployeeCertificate } from './employee-certificate.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Certificate } from 'src/app/certificates/shared/certificate.model';
import { Employee } from 'src/app/employees/shared/employee.model';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class EmployeeCertificateService {
  formData:EmployeeCertificate
  readonly rootURL = environment.rootURL;
  list:EmployeeCertificate[];
  certificatelist:Certificate[];
  employeeList:Employee[];

  constructor(private http:HttpClient, private toastr: ToastrService) { }
  postEmployeeCertificate(){
    return this.http.post(this.rootURL + '/EmployeeCertificates', this.formData)
  }

 putEmployeeCertificate(){
    return this.http.put(this.rootURL + '/EmployeeCertificates/'+ this.formData.EmployeeCertificateId, this.formData)
  }

  deleteEmployeeCertificate(id){
    return this.http.delete(this.rootURL + '/EmployeeCertificates/'+ id)
  }

  refreshList(id, callBack){
    this.http.get(this.rootURL + '/Employees/'+id+"/certificates")
    .toPromise()
    .then(res =>{this.list=res as EmployeeCertificate[], callBack(this)})
  }

  downloadFile(data: any, filename: string) {
    const blob = new Blob([data], { type: 'application/octet-stream' });
    saveAs(blob, filename);
  }

  public getDocument(id: number, fileName: string) {

    this.http.get(this.rootURL + '/Upload/' + id + '/certificates', {responseType: 'blob'})
      .subscribe((data) => this.downloadFile(data, fileName), 
      error => { 
        console.log(error);
        this.toastr.error('Nepavyko parsiųsti failo.');
      },
        () => console.info('OK'));
  }

  refreshCertificateList()
  {
    this.http.get(this.rootURL+'/Certificates').
    toPromise()
    .then(res => this.certificatelist = res as Certificate[]);
  }

  refreshEmployeeteList()
  {
    this.http.get(this.rootURL+'/Employees').
    toPromise()
    .then(res => this.employeeList = res as Employee[]);
  }

  getEmployeeName(id)
  {
    return this.employeeList.find(x => x.EmployeeId == id).Name + ' ' + this.employeeList.find(x => x.EmployeeId == id).Surname; 
  }

  getCertificateTitle(id)
  {
    return this.certificatelist.find(x => x.CertificateId == id).Title;
  }
}
