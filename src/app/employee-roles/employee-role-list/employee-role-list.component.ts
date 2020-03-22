import { Component, OnInit } from '@angular/core';
import { EployeeRoleService } from '../shared/eployee-role.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeRole } from '../shared/employee-role.model';

@Component({
  selector: 'app-employee-role-list',
  templateUrl: './employee-role-list.component.html',
  styles: []
})
export class EmployeeRoleListComponent implements OnInit {

  constructor(public service : EployeeRoleService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(pd:EmployeeRole)
  {
    this.service.formData = Object.assign({},pd);
  }

  onDelete(EmployeeRoleId)
  {
    if(confirm('Ar tikrai norite ištrinti šį įrašą?')){
    this.service.deleteRecord(EmployeeRoleId)
    .subscribe(
      res => {
        this.toastr.info('Įrašas sėkmingai ištrintas');
        this.service.refreshList();
      },
      err => {
        console.log(err)
        this.toastr.error('Įvyko klaida');
      }
    )
    }
  }
}
