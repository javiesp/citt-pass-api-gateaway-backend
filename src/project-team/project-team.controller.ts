import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Put } from '@nestjs/common';
import { ProjectTeamService } from './project-team.service';
import { CreateProjectTeamDto } from './dto/create-project-team.dto';
import { UpdateProjectTeamDto } from './dto/update-project-team.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('project-team')
export class ProjectTeamController {
  constructor(
    private readonly projectTeamService: ProjectTeamService,
    @Inject('PROJECT_SERVICES') private projectTeamClient: ClientProxy,
  ) {}

  @Post("/create-project-team")
  createProjectTeam(@Body() createProjectTeamDto: CreateProjectTeamDto) {
    console.log("crea un projectTeam")
    return this.projectTeamClient.send('createProjectTeam', createProjectTeamDto);  // la funcion send() envia los datos al decorator @MessagePattern del micro servicio users, ademas del parametro
  }

  @Get('/find-all-project-teams')
  findAllProjectTeams() {
    return this.projectTeamClient.send('findAllProjectTeams', {});
  }

  @Get('/find-one-project-team/:id')
  findOneProjectTeam(@Param('id') id: string) {
    return this.projectTeamClient.send("findOneProjectTeam", id);
  }

  @Put('/update-project-team/:id')
  updateProjectTeam(@Param('id') id: string, @Body() updateProjectTeamDto: UpdateProjectTeamDto) {
    const payload = {
      "id": id,
      "updateProjectTeamDto": updateProjectTeamDto
    }
    return this.projectTeamClient.send("updateProjectTeam", payload)
  }


  @Delete('/delete-project-team/:id')
  removeProjectTeam(@Param('id') id: string) {
    return this.projectTeamClient.send('removeProjectTeam', id)
  }
}