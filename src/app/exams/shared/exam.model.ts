import { Certificate } from 'src/app/certificates/shared/certificate.model';

export class Exam {
    ExamId: number;
    Title: string;
    Code: string;
    Certificate: Certificate; 
    CertificateId: number;
}
