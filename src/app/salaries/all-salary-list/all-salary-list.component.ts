import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SalaryService } from '../shared/salary.service';
import { Salary } from '../shared/salary.model';

@Component({
  selector: 'app-all-salary-list',
  templateUrl: './all-salary-list.component.html',
  styles: []
})
export class AllSalaryListComponent implements OnInit {

  constructor(public service:SalaryService, private toastr: ToastrService) { }

  ngOnInit(){
    //this.service.refreshList(this.id, this.loadItems.bind(this));
  }

  populateForm(pd:Salary){
    this.service.formData = Object.assign({}, pd);
  }

}
