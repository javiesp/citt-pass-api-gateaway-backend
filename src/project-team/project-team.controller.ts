import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { ProjectTeamService } from './project-team.service';
import { CreateProjectTeamDto } from './dto/create-project-team.dto';
import { UpdateProjectTeamDto } from './dto/update-project-team.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('project-team')
export class ProjectTeamController {
  constructor(
    private readonly projectTeamService: ProjectTeamService,
    @Inject('PROJECT_SERVICES') private projectClient: ClientProxy,
  ) {}

  @Post()
  createProjectTeam(@Body() createProjectTeamDto: CreateProjectTeamDto) {
    return this.projectClient.send('createProjectTeam', createProjectTeamDto);
  }

  @Get()
  findAll() {
    return this.projectTeamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectTeamService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectTeamDto: UpdateProjectTeamDto) {
    return this.projectTeamService.update(+id, updateProjectTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectTeamService.remove(+id);
  }
}
