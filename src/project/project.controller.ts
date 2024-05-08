import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, Put } from '@nestjs/common';
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
  
  @Get('/get-project-by-id')
  findProjectById(@Query('project_id') project_id: any) {
    console.log('id', project_id)
    return this.projectClient.send('findProjectById', project_id);
  }

  @Get('/search-project-by-name')
  searchProjectByName(@Query('project_name') project_name: any ) {
    console.log(project_name)
    return this.projectClient.send('searchProductByName',project_name)
  }

  @Put('update-project/:id')
  updateProject(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    const updateQuery = {
      "id": id,
      "updateProjectDto": updateProjectDto
    } 

    return this.projectClient.send('updateProject', updateQuery)
  }

  @Delete('delete-project/:id')
  removeProject(@Param('id') id: string) {
    console.log(id)
    return this.projectClient.send('removeProject', id);
  }
}