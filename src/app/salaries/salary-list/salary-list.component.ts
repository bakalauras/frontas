import { Component, OnInit } from '@angular/core';
import { SalaryService } from '../shared/salary.service';
import { ToastrService } from 'ngx-toastr';
import { Salary } from '../shared/salary.model';

@Component({
  selector: 'app-salary-list',
  templateUrl: './salary-list.component.html',
  styles: []
})
export class SalaryListComponent implements OnInit {

  constructor(public service:SalaryService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(pd:Salary){
    this.service.formData = Object.assign({}, pd);
  }
}
