import { Injectable } from '@nestjs/common';
import { CreateProjectTeamDto } from './dto/create-project-team.dto';
import { UpdateProjectTeamDto } from './dto/update-project-team.dto';

@Injectable()
export class ProjectTeamService {
  create(createProjectTeamDto: CreateProjectTeamDto) {
    return 'This action adds a new projectTeam';
  }

  findAll() {
    return `This action returns all projectTeam`;
  }

  findOne(id: number) {
    return `This action returns a #${id} projectTeam`;
  }

  update(id: number, updateProjectTeamDto: UpdateProjectTeamDto) {
    return `This action updates a #${id} projectTeam`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectTeam`;
  }
}
