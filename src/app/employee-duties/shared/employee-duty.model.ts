import { Duty } from 'src/app/duties/shared/duty.model';
import { Employee } from 'src/app/employees/shared/employee.model';

export class EmployeeDuty {
    EmployeeDutyId: number;
    DateFrom: Date;
    DateTo: Date;
    Staff: number;
    Duty: Duty;
    DutyId: number;
    Employee: Employee;
    EmployeeId: number;
}
