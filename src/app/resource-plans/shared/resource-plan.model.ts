import { EmployeeRole } from 'src/app/employee-roles/shared/employee-role.model';

export class ResourcePlan {
    ResourcePlanId : number;
    DateFrom : Date;
    DateTo : Date;
    Hours : number;
    Price : number;
    ProjectStageId : number;
    EmployeeRoleId : number;
    EmployeeRole : EmployeeRole;
}
