import { Competency } from 'src/app/competencies/shared/competency.model';
import { ProjectStage } from 'src/app/project-stages/shared/project-stage.model';

export class StageCompetency {
    StageCompetencyId: number;
    Amount: number;
    Competency: Competency;
    CompetencyId: number;
    ProjectStage: ProjectStage;
    ProjectStageId: number;
}
