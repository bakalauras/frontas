import { CustomerType } from 'src/app/customer-types/shared/customer-type.model';

export class Customer {
    CustomerId : number;
    Name : string;
    Adress : string;
    CustomerTypeId : number;
    CustomerType : CustomerType;
}
