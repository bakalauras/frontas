import { TenderState } from 'src/app/tender-states/shared/tender-state.model';
import { Contest } from 'src/app/contests/shared/contest.model';

export class Tender {
    TenderId : number;
    Price : number;
    FillingDate : Date;
    TenderStateId : number;
    TenderState : TenderState;
    ContestId : number;
    Contest : Contest;
}
