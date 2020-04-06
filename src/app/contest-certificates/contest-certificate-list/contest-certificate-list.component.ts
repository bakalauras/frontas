import { Component, OnInit } from '@angular/core';
import { ContestCertificateService } from '../shared/contest-certificate.service';
import { ToastrService } from 'ngx-toastr';
import { ContestCertificate } from '../shared/contest-certificate.model';

@Component({
  selector: 'app-contest-certificate-list',
  templateUrl: './contest-certificate-list.component.html',
  styles: []
})
export class ContestCertificateListComponent implements OnInit {

  constructor(public service:ContestCertificateService, private toastr: ToastrService) { }

  ngOnInit(){
    this.service.refreshList();
  }

  populateForm(pd:ContestCertificate){
    this.service.formData = Object.assign({}, pd);
  }

  onDelete(ContestCertificateId){
    if(confirm('Ar tikrai norite ištrinti?')){
      this.service.deleteContestCertificate(ContestCertificateId)
      .subscribe(res =>{
        this.service.refreshList();
        this.toastr.success('Ištrinta sėkmingai');
      },
        err => {
          console.log(err);
          this.toastr.error('Įvyko klaida');
        })
    }
  }
}
