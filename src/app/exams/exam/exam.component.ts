import { Component, OnInit } from '@angular/core';
import { ExamService } from '../shared/exam.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styles: []
})
export class ExamComponent implements OnInit {

  constructor(public service: ExamService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshCertificateList();
    this.resetForm();
  }

  resetForm(form?: NgForm)
  {
    if(form != null)
      form.resetForm();
    this.service.formData = {
      ExamId: 0,
      Title: '',
      Code: '',
      Order: null,
      CertificateId: null
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.ExamId ==0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form:NgForm)
  {
    this.service.postExam(form.value).subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Išsaugota sėkmingai');
        this.service.refreshList();
      },
      err => {
        console.log(err)
        this.toastr.error('Įvyko klaida');
      }
    )
  }

  updateRecord(form:NgForm)
  {
    this.service.putExam(form.value).subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Išsaugota sėkmingai');
        this.service.refreshList();
      },
      err => {
        console.log(err)
        this.toastr.error('Įvyko klaida');
      }
    )
  }

}
