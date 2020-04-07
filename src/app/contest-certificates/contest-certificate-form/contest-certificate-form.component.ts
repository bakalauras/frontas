import { Component, OnInit } from '@angular/core';
import { ContestCertificateService } from '../shared/contest-certificate.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contest-certificate-form',
  templateUrl: './contest-certificate-form.component.html',
  styles: []
})
export class ContestCertificateFormComponent implements OnInit {

  id = null;
  constructor(public service:ContestCertificateService, private toastr: ToastrService, private router: Router,
    public route: ActivatedRoute) { 
      this.id = this.route.snapshot.paramMap.get('id');
    }

  ngOnInit(){
    this.service.refreshCertificateList();
  // this.service.refreshContestList();
    this.resetForm();
  }

  resetForm(form?:NgForm) {
    if(form!=null)
      form.resetForm();
    this.service.formData = {
      ContestCertificateId: 0,
      Amount: 0,
      CertificateId: 0,
      ContestId: this.id
    }
  }

  onSubmit(form:NgForm)
  {
    if(this.service.formData.ContestCertificateId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form:NgForm)
  {
    this.service.postContestCertificate(form.value).subscribe(
      res => {
        this.resetForm(form),
        this.toastr.success('Išsaugota sėkmingai');
        this.service.refreshList(this.id);
      },
      err => {
        console.log(err);
        this.toastr.error('Įvyko klaida');
      }
    )
  }

  updateRecord(form:NgForm)
  {
    this.service.putContestCertificate(form.value).subscribe(
      res => {
        this.resetForm(form),
        this.toastr.info('Išsaugota sėkmingai');
        this.service.refreshList(this.id);
      },
      err => {
        console.log(err);
        this.toastr.error('Įvyko klaida');
      }
    )
  }
}
