import { Employee } from 'src/app/employees/shared/employee.model';
import { EmployeeRole } from 'src/app/employee-roles/shared/employee-role.model';

export class WorkingTimeRegister {
    WorkingTimeRegisterId : number;
    DateFrom : Date;
    DateTo : Date;
    Hours : number;
    Price : number;
    ProjectStageId : number;
    EmployeeRoleId : number;
    EmployeeRole : EmployeeRole;
    EmployeeId : number;
    Employee : Employee;
}
