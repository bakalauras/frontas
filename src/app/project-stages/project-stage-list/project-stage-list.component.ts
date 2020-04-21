import { Component, OnInit } from '@angular/core';
import { ProjectStageService } from '../shared/project-stage.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { KendoGridComponent } from 'src/app/kendo-grid/kendo-grid.component';

@Component({
  selector: 'app-project-stage-list',
  templateUrl: './project-stage-list.component.html',
  styles: []
})
export class ProjectStageListComponent extends KendoGridComponent implements OnInit {

  id = null;
  stageRoute = null;

  constructor(public service : ProjectStageService, private toastr: ToastrService, private router: Router,
    public route: ActivatedRoute) { 
      super();
      this.id = this.route.snapshot.paramMap.get('id'); //get id parameter
      this.stageRoute = '/project/'+this.id+'/stage/';
    }

  ngOnInit() {
    this.service.refreshList(this.id, this.loadItems.bind(this));
  }
}
