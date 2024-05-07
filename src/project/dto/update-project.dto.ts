import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
    project_id: number
    project_name: string
    project_description: string
    project_status: string
    wishlist_id: number
    project_team_id: number
}
         