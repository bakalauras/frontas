import { Component, OnInit } from '@angular/core';
import { ContestCertificateService } from '../shared/contest-certificate.service';
import { ToastrService } from 'ngx-toastr';
import { ContestCertificate } from '../shared/contest-certificate.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contest-certificate-list',
  templateUrl: './contest-certificate-list.component.html',
  styles: []
})
export class ContestCertificateListComponent implements OnInit {

  id = null;
  constructor(public service:ContestCertificateService, private toastr: ToastrService, private router: Router,
    public route: ActivatedRoute) { 
      this.id = this.route.snapshot.paramMap.get('id'); //get id parameter
    }

  
  ngOnInit(){
    this.service.refreshList(this.id);
  }

  populateForm(pd:ContestCertificate){
    this.service.formData = Object.assign({}, pd);
  }

  onDelete(ContestCertificateId){
    if(confirm('Ar tikrai norite ištrinti?')){
      this.service.deleteContestCertificate(ContestCertificateId)
      .subscribe(res =>{
        this.service.refreshList(this.id);
        this.toastr.success('Ištrinta sėkmingai');
      },
        err => {
          console.log(err);
          this.toastr.error('Įvyko klaida');
        })
    }
  }
}
