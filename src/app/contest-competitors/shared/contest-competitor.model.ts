import { Competitor } from 'src/app/competitors/shared/competitor.model';
import { Contest } from 'src/app/contests/shared/contest.model';

export class ContestCompetitor {
    ContestCompetitorId : number;
    Price : number;
    CompetitorId : number;
    Competitor : Competitor;
    ContestId : number;
    Contest : Contest;
}