import { Component, OnInit } from '@angular/core';
import { ContestFileService } from '../shared/contest-file.service';
import { ToastrService } from 'ngx-toastr';
import { ContestFile } from '../shared/contest-file.model';

@Component({
  selector: 'app-contest-file-list',
  templateUrl: './contest-file-list.component.html',
  styles: []
})
export class ContestFileListComponent implements OnInit {

  constructor(public service : ContestFileService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshContestList();
    this.service.refreshList();
    
  }

  populateForm(pd:ContestFile)
  {
    this.service.formData = Object.assign({},pd);
  }

  onDelete(ContestFileId)
  {
    if(confirm('Ar tikrai norite ištrinti šį įrašą?')){
    this.service.deleteRecord(ContestFileId)
    .subscribe(
      res => {
        this.toastr.info('Įrašas sėkmingai ištrintas');
        this.service.refreshContestList();
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
