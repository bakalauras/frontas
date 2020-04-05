import { Component, OnInit } from '@angular/core';
import { WorkingTimeRegisterService } from '../shared/working-time-register.service';
import { ToastrService } from 'ngx-toastr';
import { WorkingTimeRegister } from '../shared/working-time-register.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-working-time-register-list',
  templateUrl: './working-time-register-list.component.html',
  styles: []
})
export class WorkingTimeRegisterListComponent implements OnInit {

  id = null;
  constructor(public service : WorkingTimeRegisterService, private toastr: ToastrService, private router: Router,
    public route: ActivatedRoute) { 
      this.id = this.route.snapshot.paramMap.get('id2'); //get id parameter
    }


  ngOnInit() {
    this.service.refreshEmployeeRoleList();
    this.service.refreshEmployeeList();
    this.service.refreshList(this.id);
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
        this.service.refreshEmployeeRoleList();
        this.service.refreshList(this.id);
      },
      err => {
        console.log(err)
        this.toastr.error('Įvyko klaida');
      }
    )
    }
  }

}
