import { Component, OnInit } from '@angular/core';
import { CertificateService } from '../shared/certificate.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styles: []
})
export class CertificateComponent implements OnInit {

  constructor(public service:CertificateService, private toastr: ToastrService) { }

  ngOnInit(){
    this.resetForm();
  }

  resetForm(form?:NgForm) {
    if(form!=null)
      form.resetForm();
    this.service.formData = {
      CertificateId: 0,
      Title: '',
      Code: '',
      Technology:'',
      Order: 0
    }
  }

  onSubmit(form:NgForm)
  {
    if(this.service.formData.CertificateId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form:NgForm)
  {
    this.service.postCertificate().subscribe(
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
    this.service.putCertificate().subscribe(
      res => {
        this.resetForm(form),
        this.toastr.info('Išsaugota sėkmingai');
        //this.service.refreshList();
      },
      err => {
        console.log(err);
        this.toastr.error('Įvyko klaida');
      }
    )
  }

}
