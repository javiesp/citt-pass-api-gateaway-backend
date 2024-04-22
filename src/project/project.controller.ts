import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService,
    @Inject('PROJECT_SERVICES') private projectClient: ClientProxy,

  ) {}

  @Post('/create-project')
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectClient.send('createProject',createProjectDto);
  }

  @Get('/get-projects')
  findAllProjects() {
    const rol = 'buscando rol'
    return this.projectClient.send('findAllProjects', rol);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
// commit 2