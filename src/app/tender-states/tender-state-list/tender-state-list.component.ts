import { Component, OnInit } from '@angular/core';
import { TenderStateService } from '../shared/tender-state.service';
import { ToastrService } from 'ngx-toastr';
import { TenderState } from '../shared/tender-state.model';

@Component({
  selector: 'app-tender-state-list',
  templateUrl: './tender-state-list.component.html',
  styles: []
})
export class TenderStateListComponent implements OnInit {

  constructor(public service : TenderStateService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(pd:TenderState)
  {
    this.service.formData = Object.assign({},pd);
  }

  onDelete(TenderStateId)
  {
    if(confirm('Ar tikrai norite ištrinti šį įrašą?')){
    this.service.deleteRecord(TenderStateId)
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
