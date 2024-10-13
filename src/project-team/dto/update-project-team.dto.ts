import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectTeamDto } from './create-project-team.dto';

export class UpdateProjectTeamDto extends PartialType(CreateProjectTeamDto) {
    uid_user: string[]
    project_leader: string
}
