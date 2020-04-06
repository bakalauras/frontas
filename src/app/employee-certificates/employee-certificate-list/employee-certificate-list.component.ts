import { Component, OnInit } from '@angular/core';
import { EmployeeCertificateService } from '../shared/employee-certificate.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeCertificate } from '../shared/employee-certificate.model';

@Component({
  selector: 'app-employee-certificate-list',
  templateUrl: './employee-certificate-list.component.html',
  styles: []
})
export class EmployeeCertificateListComponent implements OnInit {

  constructor(public service:EmployeeCertificateService, private toastr: ToastrService) { }

  ngOnInit(){
    this.service.refreshList();
  }
  populateForm(pd:EmployeeCertificate){
    this.service.formData = Object.assign({}, pd);
  }

  onDelete(EmployeeCertificateId){
    if(confirm('Ar tikrai norite ištrinti?')){
      this.service.deleteEmployeeCertificate(EmployeeCertificateId)
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
