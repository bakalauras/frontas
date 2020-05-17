import { Certificate } from 'src/app/certificates/shared/certificate.model';
import { Contest } from 'src/app/contests/shared/contest.model';

export class ContestCertificate {
    ContestCertificateId: number;
    Amount: number;
    Certificate: Certificate;
    CertificateId: number;
    Contest: Contest;
    ContestId: number;
}
