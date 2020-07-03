import { Department } from 'src/app/departments/shared/department.model';

export class Employee {
    EmployeeId: number;
    Name : string;
    Surname: string;
    IsActive: boolean;
    FkEmployeeId: number;
    Department: Department;
    DepartmentId: number;
}
