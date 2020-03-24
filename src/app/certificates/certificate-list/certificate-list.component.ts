import { Component, OnInit } from '@angular/core';
import { CertificateService } from '../shared/certificate.service';
import { ToastrService } from 'ngx-toastr';
import { Certificate } from '../shared/certificate.model';

@Component({
  selector: 'app-certificate-list',
  templateUrl: './certificate-list.component.html',
  styles: []
})
export class CertificateListComponent implements OnInit {

  constructor(public service:CertificateService, private toastr: ToastrService) { }

  ngOnInit(){
    this.service.refreshList();
  }

  populateForm(pd:Certificate){
    this.service.formData = Object.assign({}, pd);
  }

  onDelete(CertificateId){
    if(confirm('Ar tikrai norite ištrinti?')){
      this.service.deleteCertificate(CertificateId)
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
