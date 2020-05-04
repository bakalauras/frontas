import { Component, OnInit, TestabilityRegistry, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { EmployeeCertificateService } from '../shared/employee-certificate.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeCertificate } from '../shared/employee-certificate.model';
import { KendoGridComponent } from 'src/app/kendo-grid/kendo-grid.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-employee-certificate-list',
  templateUrl: './employee-certificate-list.component.html',
  styles: []
})
export class EmployeeCertificateListComponent extends KendoGridComponent implements OnInit {
 
  id = null;
  
  constructor(public service:EmployeeCertificateService, private toastr: ToastrService,private router: Router,
    public route: ActivatedRoute, private http: HttpClient) { 
      super();
      this.id = this.route.snapshot.paramMap.get('id'); 
    }

  ngOnInit(){
    this.service.refreshList(this.id, this.loadItems.bind(this));
    this.service.refreshCertificateList();
    this.service.refreshEmployeeteList();
    this.resetForm();
  }
  
  fileDownload(document: any) {
    this.service.getDocument(document.EmployeeCertificateId, document.File);
  }

  populateForm(pd:EmployeeCertificate){
    this.service.formData = Object.assign({}, pd);
    this.opened2 = true;
  }

  onDelete(){
    this.opened = false;
    if(this.idToDelete!=0){
      this.service.deleteEmployeeCertificate(this.idToDelete)
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
      EmployeeCertificateId: 0,
      File: 'failas',
      EmployeeId: this.id,
      CertificateId: null
    }
  }

  onSubmit(form:NgForm)
  {
    if(this.service.formData.EmployeeCertificateId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
    this.close();
  }

  insertRecord(form:NgForm)
  {
    this.service.postEmployeeCertificate().subscribe(
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
    this.service.putEmployeeCertificate().subscribe(
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
