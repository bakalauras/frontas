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
import { DutiesComponent } from './duties/duties.component';
import { CompetenciesComponent } from './competencies/competencies.component';
import { EmployeesComponent } from './employees/employees.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { ExamsComponent } from './exams/exams.component';
import { SalariesComponent } from './salaries/salaries.component';
import { AllSalaryListComponent } from './salaries/all-salary-list/all-salary-list.component';
import { ContestFormComponent } from './contests/contest-form/contest-form.component';
import { TenderFormComponent } from './tenders/tender-form/tender-form.component';
import { ProjectFormComponent } from './projects/project-form/project-form.component';
import { ProjectStageFormComponent } from './project-stages/project-stage-form/project-stage-form.component';


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
  {path: 'contest/:id', component : ContestFormComponent},
  {path: 'tender/:id', component : TenderFormComponent},
  {path: 'project/:id', component : ProjectFormComponent},
  {path: 'project/:id/stage/:id2', component : ProjectStageFormComponent},
  {path: 'duties', component : DutiesComponent},
  {path: 'competencies', component : CompetenciesComponent},
  {path: 'employees', component : EmployeesComponent},
  {path: 'certificates', component : CertificatesComponent},
  {path: 'exams', component : ExamsComponent},
  {path: 'salaries', component : SalariesComponent},
  {path: 'allsalaries', component : AllSalaryListComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
