import { Exam } from 'src/app/exams/shared/exam.model';
import { Employee } from 'src/app/employees/shared/employee.model';
import { Certificate } from 'src/app/certificates/shared/certificate.model';

export class EmployeeExam {
    EmployeeExamId: number;
    PlannedExamDate: Date;
    RealExamDate: Date;
    IsPassed: boolean;
    Price: number;
    File: string;
    Exam: Exam;
    ExamId: number;
    Employee: Employee;
    EmployeeId: number;
    Certificate: Certificate;
    CertificateId: number;
}
