import { Component, OnInit } from '@angular/core';
import { DutyService } from '../shared/duty.service';
import { Duty } from '../shared/duty.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-duty-list',
  templateUrl: './duty-list.component.html',
  styles: []
})
export class DutyListComponent implements OnInit {

  constructor(public service:DutyService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(pd:Duty){
    this.service.formData = Object.assign({}, pd);
  }

  onDelete(DutyId){
    if(confirm('Ar tikrai norite ištrinti?')){
      this.service.deleteDuty(DutyId)
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
