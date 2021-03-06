import { Employee } from 'src/app/employees/shared/employee.model';
import { Certificate } from 'src/app/certificates/shared/certificate.model';

export class EmployeeCertificate {
    EmployeeCertificateId: number;
    File: string;
    DateFrom: Date;
    DateTo: Date;
    Emloyee:Employee;
    EmployeeId: number;
    Certificate: Certificate; 
    CertificateId: number;
}
