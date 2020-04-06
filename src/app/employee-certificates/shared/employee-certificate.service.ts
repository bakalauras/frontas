import { Injectable } from '@angular/core';
import { EmployeeCertificate } from './employee-certificate.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Certificate } from 'src/app/certificates/shared/certificate.model';
import { Employee } from 'src/app/employees/shared/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeCertificateService {
  formData:EmployeeCertificate
  readonly rootURL = environment.rootURL;
  list:EmployeeCertificate[];
  certificatelist:Certificate[];
  employeeList:Employee[];

  constructor(private http:HttpClient) { }
  postEmployeeCertificate(formData:EmployeeCertificate){
    return this.http.post(this.rootURL + '/EmployeeCertificates', this.formData)
  }

  putEmployeeCertificate(formData:EmployeeCertificate){
    console.log(formData);
    return this.http.put(this.rootURL + '/EmployeeCertificates/'+ this.formData.EmployeeCertificateId, this.formData)
  }

  deleteEmployeeCertificate(id){
    return this.http.delete(this.rootURL + '/EmployeeCertificates/'+ id)
  }

  refreshList(){
    this.http.get(this.rootURL + '/EmployeeCertificates')
    .toPromise()
    .then(res =>this.list=res as EmployeeCertificate[])
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
