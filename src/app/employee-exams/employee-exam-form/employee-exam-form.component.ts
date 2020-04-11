import { Component, OnInit } from '@angular/core';
import { EmployeeExamService } from '../shared/employee-exam.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-exam-form',
  templateUrl: './employee-exam-form.component.html',
  styles: []
})
export class EmployeeExamFormComponent implements OnInit {

  constructor(public service:EmployeeExamService, private toastr: ToastrService) { }

  ngOnInit(){
    this.service.refreshExamList();
    this.service.refreshCertificateList();
    this.service.refreshEmployeeteList();
    this.resetForm();
  }

  resetForm(form?:NgForm) {
    if(form!=null)
      form.resetForm();
    this.service.formData = {
      EmployeeExamId: 0,
      PlannedExamDate: null,
      RealExamDate: null,
      IsPassed: true,
      Price: 0,
      File: '',
      ExamId: null,
      EmployeeId: null,
      CertificateId: null
    }
  }

  onSubmit(form:NgForm)
  {
    if(this.service.formData.EmployeeExamId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form:NgForm)
  {
    this.service.postEmployeeExam(form.value).subscribe(
      res => {
        this.resetForm(form),
        this.toastr.success('Išsaugota sėkmingai');
        this.service.refreshList();
      },
      err => {
        console.log(err);
        this.toastr.error('Įvyko klaida');
      }
    )
  }

  updateRecord(form:NgForm)
  {
    this.service.putEmployeeExam(form.value).subscribe(
      res => {
        this.resetForm(form),
        this.toastr.info('Išsaugota sėkmingai');
        this.service.refreshList();
      },
      err => {
        console.log(err);
        this.toastr.error('Įvyko klaida');
      }
    )
  }
}
