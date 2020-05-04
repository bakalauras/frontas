import { Customer } from 'src/app/customers/shared/customer.model';

export class Project {
    ProjectId : number;
    Title : string;
    ContractNumber : string;
    Budget : number;
    CustomerId : number;
    Customer : Customer;
    TenderId : number;
}
