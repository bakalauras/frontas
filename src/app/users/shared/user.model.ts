import { GroupRights } from 'src/app/group-rights/shared/group-rights.model';

export class User {
    UserId : number;
    Login : string;
    Password : string;
    GroupRightId: number;
    GroupRights: GroupRights;
}
