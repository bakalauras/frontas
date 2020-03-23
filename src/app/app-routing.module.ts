import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContestStatusesComponent } from './contest-statuses/contest-statuses.component';
import { ProjectStageNamesComponent } from './project-stage-names/project-stage-names.component';
import { TenderStatesComponent } from './tender-states/tender-states.component';
import { CustomerTypesComponent } from './customer-types/customer-types.component';
import { EmployeeRolesComponent } from './employee-roles/employee-roles.component';
import { CustomersComponent } from './customers/customers.component';
import { ContestsComponent } from './contests/contests.component';
import { TendersComponent } from './tenders/tenders.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContestListComponent } from './contests/contest-list/contest-list.component';
import { ContestFilesComponent } from './contest-files/contest-files.component';
import { TenderFilesComponent } from './tender-files/tender-files.component';
import { ProjectStagesComponent } from './project-stages/project-stages.component';
import { WorkingTimeRegistersComponent } from './working-time-registers/working-time-registers.component';
import { StageProgressesComponent } from './stage-progresses/stage-progresses.component';
import { ResourcePlansComponent } from './resource-plans/resource-plans.component';
import { DutiesComponent } from './duties/duties.component';
import { CompetenciesComponent } from './competencies/competencies.component';
import { EmployeesComponent } from './employees/employees.component';


const routes: Routes = [
  {path: 'contestStatuses', component: ContestStatusesComponent},
  {path: 'projectStageNames', component: ProjectStageNamesComponent},
  {path: 'tenderStates', component: TenderStatesComponent},
  {path: 'customerTypes', component: CustomerTypesComponent},
  {path: 'employeeRoles', component: EmployeeRolesComponent},
  {path: 'customers', component : CustomersComponent},
  {path: 'contests', component : ContestsComponent},
  {path: 'tenders', component: TendersComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'contestFiles', component : ContestFilesComponent},
  {path: 'tenderFiles', component: TenderFilesComponent},
  {path: 'projectStages', component: ProjectStagesComponent},
  {path: 'workingTimeRegisters', component: WorkingTimeRegistersComponent},
  {path: 'stageProgresses', component: StageProgressesComponent},
  {path: 'resourcePlans', component: ResourcePlansComponent},
  {path: 'duties', component : DutiesComponent},
  {path: 'competencies', component : CompetenciesComponent},
  {path: 'employees', component : EmployeesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
