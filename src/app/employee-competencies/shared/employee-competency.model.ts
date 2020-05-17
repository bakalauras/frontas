import { Competency } from 'src/app/competencies/shared/competency.model';
import { Employee } from 'src/app/employees/shared/employee.model';

export class EmployeeCompetency {
    EmployeeCompetencyId: number;
    DateFrom: Date;
    DateTo: Date;
    Competency: Competency;
    CompetencyId: number;
    Employee: Employee;
    EmployeeId: number;
}
