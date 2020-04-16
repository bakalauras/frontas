import { Component, OnInit } from '@angular/core';
import { EmployeeCertificateService } from '../shared/employee-certificate.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-certificate-form',
  templateUrl: './employee-certificate-form.component.html',
  styles: []
})
export class EmployeeCertificateFormComponent implements OnInit {

  constructor(public service:EmployeeCertificateService, private toastr: ToastrService) { }

  ngOnInit(){
    this.service.refreshCertificateList();
    this.service.refreshEmployeeteList();
    this.resetForm();
  }
  resetForm(form?:NgForm) {
    if(form!=null)
      form.resetForm();
    this.service.formData = {
      EmployeeCertificateId: 0,
      File: null,
      EmployeeId: null,
      CertificateId: null
    }
  }

  onSubmit(form:NgForm)
  {
    if(this.service.formData.EmployeeCertificateId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form:NgForm)
  {
    this.service.postEmployeeCertificate().subscribe(
      res => {
        this.resetForm(form),
        this.toastr.success('Išsaugota sėkmingai');
        //this.service.refreshList();
      },
      err => {
        console.log(err);
        this.toastr.error('Įvyko klaida');
      }
    )
  }

  updateRecord(form:NgForm)
  {
    this.service.putEmployeeCertificate().subscribe(
      res => {
        this.resetForm(form),
        this.toastr.info('Išsaugota sėkmingai');
       // this.service.refreshList();
      },
      err => {
        console.log(err);
        this.toastr.error('Įvyko klaida');
      }
    )
  }

}
