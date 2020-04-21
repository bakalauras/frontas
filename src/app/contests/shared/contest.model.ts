import { Customer } from 'src/app/customers/shared/customer.model';
import { ContestStatus } from 'src/app/contest-statuses/shared/contest-status.model';

export class Contest {
    ContestId : number;
    Title : string;
    Budget : number;
    PublicationDate : Date;
    FillingDate : Date;
    PriceRobbingDate : Date;
    ClaimsFillingDate : Date;
    CustomerId : number;
    Customer : Customer;
    ContestStatusId : number;
    ContestStatus : ContestStatus;
}
