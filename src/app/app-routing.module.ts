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
import { EmployeeCertificatesComponent } from './employee-certificates/employee-certificates.component';
import { EmployeeExamsComponent } from './employee-exams/employee-exams.component';
import { EmployeeCompetenciesComponent } from './employee-competencies/employee-competencies.component';
import { EmployeeDutiesComponent } from './employee-duties/employee-duties.component';
import { ContestFormComponent } from './contests/contest-form/contest-form.component';
import { TenderFormComponent } from './tenders/tender-form/tender-form.component';
import { ProjectFormComponent } from './projects/project-form/project-form.component';
import { ProjectStageFormComponent } from './project-stages/project-stage-form/project-stage-form.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { ChartsComponent } from './charts/charts.component';
import { StageCompetenciesComponent } from './stage-competencies/stage-competencies.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { JwtService } from './jwt.service';


const routes: Routes = [
  {path: 'contestStatuses', component: ContestStatusesComponent, canActivate: [JwtService]},
  {path: 'projectStageNames', component: ProjectStageNamesComponent, canActivate: [JwtService]},
  {path: 'tenderStates', component: TenderStatesComponent, canActivate: [JwtService]},
  {path: 'customerTypes', component: CustomerTypesComponent, canActivate: [JwtService]},
  {path: 'employeeRoles', component: EmployeeRolesComponent, canActivate: [JwtService]},
  {path: 'customers', component : CustomersComponent, canActivate: [JwtService]},
  {path: 'contests', component : ContestsComponent, canActivate: [JwtService]},
  {path: 'tenders', component: TendersComponent, canActivate: [JwtService]},
  {path: 'projects', component: ProjectsComponent, canActivate: [JwtService]},
  {path: 'contest/:id', component : ContestFormComponent, canActivate: [JwtService]},
  {path: 'tender/:id', component : TenderFormComponent, canActivate: [JwtService]},
  {path: 'project/:id', component : ProjectFormComponent, canActivate: [JwtService]},
  {path: 'project/:id/stage/:id2', component : ProjectStageFormComponent, canActivate: [JwtService]},
  {path: 'duties', component : DutiesComponent, canActivate: [JwtService]},
  {path: 'competencies', component : CompetenciesComponent, canActivate: [JwtService]},
  {path: 'employees', component : EmployeesComponent, canActivate: [JwtService]},
  {path: 'certificates', component : CertificatesComponent, canActivate: [JwtService]},
  {path: 'exams', component : ExamsComponent, canActivate: [JwtService]},
  {path: 'salaries', component : SalariesComponent, canActivate: [JwtService]},
  {path: 'allsalaries', component : AllSalaryListComponent, canActivate: [JwtService]},
  {path: 'employee-certificate', component : EmployeeCertificatesComponent, canActivate: [JwtService]},
  {path: 'employee-exam', component : EmployeeExamsComponent, canActivate: [JwtService]},
  {path: 'employee-competency', component : EmployeeCompetenciesComponent, canActivate: [JwtService]},
  {path: 'stage-competency', component : StageCompetenciesComponent, canActivate: [JwtService]},
  {path: 'employee/:id', component : EmployeeComponent, canActivate: [JwtService]},
  {path: 'charts', component : ChartsComponent, canActivate: [JwtService]},
  {path: 'users', component : UsersComponent, canActivate: [JwtService]},
  {path: 'login', component : LoginComponent},
  {path: 'employee-duty', component : EmployeeDutiesComponent, canActivate: [JwtService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
