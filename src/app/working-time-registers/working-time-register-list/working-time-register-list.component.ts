import { Component, OnInit } from '@angular/core';
import { WorkingTimeRegisterService } from '../shared/working-time-register.service';
import { ToastrService } from 'ngx-toastr';
import { WorkingTimeRegister } from '../shared/working-time-register.model';

@Component({
  selector: 'app-working-time-register-list',
  templateUrl: './working-time-register-list.component.html',
  styles: []
})
export class WorkingTimeRegisterListComponent implements OnInit {

  constructor(public service : WorkingTimeRegisterService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshProjectStageList();
    this.service.refreshEmployeeRoleList();
    this.service.refreshEmployeeList();
    this.service.refreshList();
  }

  populateForm(pd:WorkingTimeRegister)
  {
    this.service.formData = Object.assign({},pd);
  }

  onDelete(WorkingTimeRegisterId)
  {
    if(confirm('Ar tikrai norite ištrinti šį įrašą?')){
    this.service.deleteRecord(WorkingTimeRegisterId)
    .subscribe(
      res => {
        this.toastr.info('Įrašas sėkmingai ištrintas');
        this.service.refreshProjectStageList();
        this.service.refreshEmployeeRoleList();
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
