import { Component, OnInit } from '@angular/core';
import { TenderFileService } from '../shared/tender-file.service';
import { ToastrService } from 'ngx-toastr';
import { TenderFile } from '../shared/tender-file.model';
import { SortDescriptor, orderBy, GroupDescriptor, process, State } from '@progress/kendo-data-query';
import { GridDataResult, PageChangeEvent, DataStateChangeEvent, PDFModule, PageSizeItem  } from '@progress/kendo-angular-grid';
import { delay } from 'rxjs/operators';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tender-file-list',
  templateUrl: './tender-file-list.component.html',
  styles: []
})
export class TenderFileListComponent implements OnInit  {

  id = null;
  public gridView: GridDataResult;
  public excelExport: ExcelExportData;
  public state: State = {
    skip: 0,
    take: 10
};

  constructor(public service : TenderFileService, private toastr: ToastrService, private router: Router,
    public route: ActivatedRoute) { 
      this.id = this.route.snapshot.paramMap.get('id'); //get id parameter
    }
  ngOnInit() {
    
    this.service.refreshList(this.id)
    this.delay(5).then(any => {
      this.loadItems();
  });
  }

  populateForm(pd:TenderFile)
  {
    this.service.formData = Object.assign({},pd);
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
}

  onDelete(TenderFileId)
  {
    if(confirm('Ar tikrai norite ištrinti šį įrašą?')){
    this.service.deleteRecord(TenderFileId)
    .subscribe(
      res => {
        this.toastr.info('Įrašas sėkmingai ištrintas');
        this.service.refreshList(this.id);
        this.delay(5).then(any => {
          this.loadItems();
      });
      },
      err => {
        console.log(err)
        this.toastr.error('Įvyko klaida');
      }
    )
    }
  }

public dataStateChange(state: DataStateChangeEvent): void {
  this.state = state;
  this.gridView = process(this.service.list, this.state);
}

public pageChange({ skip, take }: PageChangeEvent): void {
  this.state.skip = skip;
  this.state.take = take;
  this.loadItems();
}

private loadItems(): void {
 this.gridView = process(this.service.list, this.state);
 this.excelExport = this.gridView;
}

}