import { Injectable } from '@angular/core';
import { EmployeeExam } from './employee-exam.model';
import { environment } from 'src/environments/environment';
import { Certificate } from 'src/app/certificates/shared/certificate.model';
import { Employee } from 'src/app/employees/shared/employee.model';
import { Exam } from 'src/app/exams/shared/exam.model';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class EmployeeExamService {
  formData:EmployeeExam
  readonly rootURL = environment.rootURL;
  list:EmployeeExam[];
  certificatelist:Certificate[];
  employeeList:Employee[];
  examList:Exam[];

  constructor(private http:HttpClient, private toastr: ToastrService) { }

  postEmployeeExam(){
    return this.http.post(this.rootURL + '/EmployeeExams', this.formData)
  }

  putEmployeeExam(){
    return this.http.put(this.rootURL + '/EmployeeExams/'+ this.formData.EmployeeExamId, this.formData)
  }

  deleteEmployeeExam(id){
    return this.http.delete(this.rootURL + '/EmployeeExams/'+ id)
  }

  refreshList(id, callBack){
    this.http.get(this.rootURL + '/Employees/'+id+'/exams')
    .toPromise()
    .then(res =>{this.list = res as EmployeeExam[], callBack(this)})
  }

  refreshEmployeeExamList(id){
    if(id!=0)
    {
      this.http.get(this.rootURL + '/Employees/'+id+'/exams')
    .toPromise()
    .then(res =>this.list=res as EmployeeExam[])
    }
    
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

  refreshExamList()
  {
    this.http.get(this.rootURL+'/Exams').
    toPromise()
    .then(res => this.examList = res as Exam[]);
  }

  getPassedParam(pass:boolean)
  {
    if(pass == true)
      return "Išlaikytas";
    else return "Neišlaikytas";
  }

  getExamTitle(id)
  {
    return this.examList.find(x =>x.ExamId == id).Title;
  }

  getCertificateTitle(id)
  {
    return this.certificatelist.find(x => x.CertificateId == id).Title;
  }

  downloadFile(data: any, filename: string) {
    const blob = new Blob([data], { type: 'application/octet-stream' });
    saveAs(blob, filename);
  }

  public getDocument(id: number, fileName: string) {

    this.http.get(this.rootURL + '/Upload/' + id + '/exams', {responseType: 'blob'})
      .subscribe((data) => this.downloadFile(data, fileName), 
      error => { 
        console.log(error);
        this.toastr.error('Nepavyko parsiųsti failo.');
      },
        () => console.info('OK'));
  }
}
