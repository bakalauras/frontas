import { Component, OnInit } from '@angular/core';
import { ContestCertificateService } from '../shared/contest-certificate.service';
import { ToastrService } from 'ngx-toastr';
import { ContestCertificate } from '../shared/contest-certificate.model';
import { Router, ActivatedRoute } from '@angular/router';
import { KendoGridComponent } from 'src/app/kendo-grid/kendo-grid.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contest-certificate-list',
  templateUrl: './contest-certificate-list.component.html',
  styles: []
})
export class ContestCertificateListComponent extends KendoGridComponent implements OnInit {

  id = null;
  constructor(public service:ContestCertificateService, private toastr: ToastrService, private router: Router,
    public route: ActivatedRoute) { 
      super();
      this.id = this.route.snapshot.paramMap.get('id'); //get id parameter
    }

  
  ngOnInit(){
    this.service.refreshList(this.id, this.loadItems.bind(this));
    this.service.refreshCertificateList();
    this.resetForm();
  }

  populateForm(pd:ContestCertificate){
    this.service.formData = Object.assign({}, pd);
    this.opened2 = true;
  }

  onDelete(){
    this.opened = false;
    if(this.idToDelete!=0){
      this.service.deleteContestCertificate(this.idToDelete)
      .subscribe(res =>{
        this.toastr.success('Įrašas sėkmingai ištrintas');
        this.service.refreshList(this.id, this.loadItems.bind(this));
      },
        err => {
          console.log(err);
          this.toastr.error(err.error);
        })
    }
  }

  resetForm(form?:NgForm) {
    if(form!=null)
      form.resetForm();
    this.service.formData = {
      ContestCertificateId: 0,
      Amount: 0,
      Certificate: null,
      CertificateId: 0,
      Contest:null,
      ContestId: this.id
    }
  }

  onSubmit(form:NgForm)
  {
    if(this.service.formData.ContestCertificateId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
    this.close();
  }

  insertRecord(form:NgForm)
  {
    this.service.postContestCertificate().subscribe(
      res => {
        this.resetForm(form),
        this.toastr.success('Įrašas sėkmingai pridėtas');
        this.service.refreshList(this.id, this.loadItems.bind(this));
      },
      err => {
        console.log(err);
        this.toastr.error(err.error);
      }
    )
  }

  updateRecord(form:NgForm)
  {
    this.service.putContestCertificate().subscribe(
      res => {
        this.resetForm(form),
        this.toastr.success('Įrašas sėkmingai atnaujintas');
        this.service.refreshList(this.id, this.loadItems.bind(this));
      },
      err => {
        console.log(err);
        this.toastr.error(err.error);
      }
    )
  }
}
