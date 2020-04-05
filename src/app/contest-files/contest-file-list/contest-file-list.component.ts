import { Component, OnInit } from '@angular/core';
import { ContestFileService } from '../shared/contest-file.service';
import { ToastrService } from 'ngx-toastr';
import { ContestFile } from '../shared/contest-file.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contest-file-list',
  templateUrl: './contest-file-list.component.html',
  styles: []
})
export class ContestFileListComponent implements OnInit {

  id = null;
  constructor(public service : ContestFileService, private toastr: ToastrService, private router: Router,
    public route: ActivatedRoute) { 
      this.id = this.route.snapshot.paramMap.get('id'); //get id parameter
    }
  ngOnInit() {
    this.service.refreshList(this.id);
    
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
