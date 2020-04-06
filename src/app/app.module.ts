import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { HttpClientModule } from "@angular/common/http";
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import { ContestStatusesComponent } from './contest-statuses/contest-statuses.component';
import { ContestStatusFormComponent } from './contest-statuses/contest-status-form/contest-status-form.component';
import { ContestStatusListComponent } from './contest-statuses/contest-status-list/contest-status-list.component';
import { FormsModule } from "@angular/forms";
import { ProjectStageNamesComponent } from './project-stage-names/project-stage-names.component';
import { ProjectStageNameFormComponent } from './project-stage-names/project-stage-name-form/project-stage-name-form.component';
import { ProjectStageNameListComponent } from './project-stage-names/project-stage-name-list/project-stage-name-list.component';
import { TenderStatesComponent } from './tender-states/tender-states.component';
import { TenderStateFormComponent } from './tender-states/tender-state-form/tender-state-form.component';
import { TenderStateListComponent } from './tender-states/tender-state-list/tender-state-list.component';
import { CustomerTypeFormComponent } from './customer-types/customer-type-form/customer-type-form.component';
import { CustomerTypeListComponent } from './customer-types/customer-type-list/customer-type-list.component';
import { CustomerTypesComponent } from './customer-types/customer-types.component';
import { EmployeeRolesComponent } from './employee-roles/employee-roles.component';
import { EmployeeRoleFormComponent } from './employee-roles/employee-role-form/employee-role-form.component';
import { EmployeeRoleListComponent } from './employee-roles/employee-role-list/employee-role-list.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { ContestsComponent } from './contests/contests.component';
import { ContestFormComponent } from './contests/contest-form/contest-form.component';
import { ContestListComponent } from './contests/contest-list/contest-list.component';
import { TendersComponent } from './tenders/tenders.component';
import { TenderFormComponent } from './tenders/tender-form/tender-form.component';
import { TenderListComponent } from './tenders/tender-list/tender-list.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectFormComponent } from './projects/project-form/project-form.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ContestFilesComponent } from './contest-files/contest-files.component';
import { ContestFileFormComponent } from './contest-files/contest-file-form/contest-file-form.component';
import { ContestFileListComponent } from './contest-files/contest-file-list/contest-file-list.component';
import { TenderFilesComponent } from './tender-files/tender-files.component';
import { TenderFileFormComponent } from './tender-files/tender-file-form/tender-file-form.component';
import { TenderFileListComponent } from './tender-files/tender-file-list/tender-file-list.component';
import { ProjectStagesComponent } from './project-stages/project-stages.component';
import { ProjectStageFormComponent } from './project-stages/project-stage-form/project-stage-form.component';
import { ProjectStageListComponent } from './project-stages/project-stage-list/project-stage-list.component';
import { WorkingTimeRegistersComponent } from './working-time-registers/working-time-registers.component';
import { WorkingTimeRegisterFormComponent } from './working-time-registers/working-time-register-form/working-time-register-form.component';
import { WorkingTimeRegisterListComponent } from './working-time-registers/working-time-register-list/working-time-register-list.component';
import { StageProgressesComponent } from './stage-progresses/stage-progresses.component';
import { StageProgressFormComponent } from './stage-progresses/stage-progress-form/stage-progress-form.component';
import { StageProgressListComponent } from './stage-progresses/stage-progress-list/stage-progress-list.component';
import { ResourcePlansComponent } from './resource-plans/resource-plans.component';
import { ResourcePlanFormComponent } from './resource-plans/resource-plan-form/resource-plan-form.component';
import { ResourcePlanListComponent } from './resource-plans/resource-plan-list/resource-plan-list.component';
import { DutiesComponent } from './duties/duties.component';
import { DutyComponent } from './duties/duty/duty.component';
import { DutyListComponent } from './duties/duty-list/duty-list.component';
import { NavComponent } from './nav/nav.component';
import { DutyService } from './duties/shared/duty.service';
import { CompetenciesComponent } from './competencies/competencies.component';
import { CompetencyComponent } from './competencies/competency/competency.component';
import { CompetencyListComponent } from './competencies/competency-list/competency-list.component';
import { CompetencyService } from './competencies/shared/competency.service';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeService } from './employees/shared/employee.service';
import { CertificatesComponent } from './certificates/certificates.component';
import { CertificateComponent } from './certificates/certificate/certificate.component';
import { CertificateListComponent } from './certificates/certificate-list/certificate-list.component';
import { CertificateService } from './certificates/shared/certificate.service';
import { ExamsComponent } from './exams/exams.component';
import { ExamComponent } from './exams/exam/exam.component';
import { ExamListComponent } from './exams/exam-list/exam-list.component';
import { ExamService } from './exams/shared/exam.service';
import { SalariesComponent } from './salaries/salaries.component';
import { SalaryComponent } from './salaries/salary/salary.component';
import { SalaryListComponent } from './salaries/salary-list/salary-list.component';
import { SalaryService } from './salaries/shared/salary.service';
import { AllSalaryListComponent } from './salaries/all-salary-list/all-salary-list.component';
import { EmployeeDutiesComponent } from './employee-duties/employee-duties.component';
import { EmployeeDutyFormComponent } from './employee-duties/employee-duty-form/employee-duty-form.component';
import { EmployeeDutyListComponent } from './employee-duties/employee-duty-list/employee-duty-list.component';
import { EmployeeExamsComponent } from './employee-exams/employee-exams.component';
import { EmployeeExamFormComponent } from './employee-exams/employee-exam-form/employee-exam-form.component';
import { EmployeeExamListComponent } from './employee-exams/employee-exam-list/employee-exam-list.component';
import { EmployeeCertificatesComponent } from './employee-certificates/employee-certificates.component';
import { EmployeeCertificateFormComponent } from './employee-certificates/employee-certificate-form/employee-certificate-form.component';
import { EmployeeCertificateListComponent } from './employee-certificates/employee-certificate-list/employee-certificate-list.component';
import { EmployeeCompetenciesComponent } from './employee-competencies/employee-competencies.component';
import { EmployeeCompetencyFormComponent } from './employee-competencies/employee-competency-form/employee-competency-form.component';
import { EmployeeCompetencyListComponent } from './employee-competencies/employee-competency-list/employee-competency-list.component';
import { ContestCertificatesComponent } from './contest-certificates/contest-certificates.component';
import { ContestCertificateFormComponent } from './contest-certificates/contest-certificate-form/contest-certificate-form.component';
import { ContestCertificateListComponent } from './contest-certificates/contest-certificate-list/contest-certificate-list.component';
import { StageCompetenciesComponent } from './stage-competencies/stage-competencies.component';
import { StageCompetencyFormComponent } from './stage-competencies/stage-competency-form/stage-competency-form.component';
import { StageCompetencyListComponent } from './stage-competencies/stage-competency-list/stage-competency-list.component';
import { MatNativeDateModule } from '@angular/material/core';
import {MAT_DATE_LOCALE} from '@angular/material';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ContestStatusesComponent,
    ContestStatusFormComponent,
    ContestStatusListComponent,
    ProjectStageNamesComponent,
    ProjectStageNameFormComponent,
    ProjectStageNameListComponent,
    TenderStatesComponent,
    TenderStateFormComponent,
    TenderStateListComponent,
    CustomerTypesComponent,
    CustomerTypeFormComponent,
    CustomerTypeListComponent,
    EmployeeRolesComponent,
    EmployeeRoleFormComponent,
    EmployeeRoleListComponent,
    CustomersComponent,
    CustomerFormComponent,
    CustomerListComponent,
    ContestsComponent,
    ContestFormComponent,
    ContestListComponent,
    TendersComponent,
    TenderFormComponent,
    TenderListComponent,
    ProjectsComponent,
    ProjectFormComponent,
    ProjectListComponent,
    ContestFilesComponent,
    ContestFileFormComponent,
    ContestFileListComponent,
    TenderFilesComponent,
    TenderFileFormComponent,
    TenderFileListComponent,
    ProjectStagesComponent,
    ProjectStageFormComponent,
    ProjectStageListComponent,
    WorkingTimeRegistersComponent,
    WorkingTimeRegisterFormComponent,
    WorkingTimeRegisterListComponent,
    StageProgressesComponent,
    StageProgressFormComponent,
    StageProgressListComponent,
    ResourcePlansComponent,
    ResourcePlanFormComponent,
    ResourcePlanListComponent,
    DutiesComponent,
    DutyComponent,
    DutyListComponent,
    NavComponent,
    CompetenciesComponent,
    CompetencyComponent,
    CompetencyListComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent,
    CertificatesComponent,
    CertificateComponent,
    CertificateListComponent,
    ExamsComponent,
    ExamComponent,
    ExamListComponent,
    SalariesComponent,
    SalaryComponent,
    SalaryListComponent,
    AllSalaryListComponent,
    EmployeeDutiesComponent,
    EmployeeDutyFormComponent,
    EmployeeDutyListComponent,
    EmployeeExamsComponent,
    EmployeeExamFormComponent,
    EmployeeExamListComponent,
    EmployeeCertificatesComponent,
    EmployeeCertificateFormComponent,
    EmployeeCertificateListComponent,
    EmployeeCompetenciesComponent,
    EmployeeCompetencyFormComponent,
    EmployeeCompetencyListComponent,
    ContestCertificatesComponent,
    ContestCertificateFormComponent,
    ContestCertificateListComponent,
    StageCompetenciesComponent,
    StageCompetencyFormComponent,
    StageCompetencyListComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    LayoutModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatExpansionModule
  ],
  providers: [DutyService, CompetencyService, EmployeeService, CertificateService, ExamService, SalaryService,
     { provide: MAT_DATE_LOCALE, useValue: 'lt-LT' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
