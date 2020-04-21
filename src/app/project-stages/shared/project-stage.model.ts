import { ProjectStageName } from 'src/app/project-stage-names/shared/project-stage-name.model';

export class ProjectStage {
    ProjectStageId : number;
    ProjectStageNameId : number;
    ProjectStageName : ProjectStageName;
    StageBudget : number;
    StartDate : number;
    EndDate : Date;
    ScheduledStartDate : Date;
    ScheduledEndDate: Date;
    ProjectId : number;
}