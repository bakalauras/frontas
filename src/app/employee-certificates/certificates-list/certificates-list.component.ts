import { Component, OnInit } from '@angular/core';
import { KendoGridComponent } from 'src/app/kendo-grid/kendo-grid.component';
import { EmployeeCertificateService } from '../shared/employee-certificate.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeCertificate } from '../shared/employee-certificate.model';

@Component({
  selector: 'app-certificates-list',
  templateUrl: './certificates-list.component.html',
  styles: []
})
export class CertificatesListComponent extends KendoGridComponent implements OnInit {

  list:EmployeeCertificate[];

  constructor(public service:EmployeeCertificateService, private toastr: ToastrService) { 
      super();
    }

  ngOnInit(){
    this.service.refreshAllList(this.loadItems.bind(this));
    this.service.getData().subscribe(data => {
      console.log(data);
      this.list = data;
    })
  }

}
