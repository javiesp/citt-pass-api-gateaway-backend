import { Controller, Get, Post, Body, Put, Param, Delete, Inject, Query, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ClientProxy} from '@nestjs/microservices';
import { AuthGuard } from 'src/users/jwt.guard';

@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,

    @Inject('PROJECT_SERVICES') private projectClient: ClientProxy,

  ) {}


  @UseGuards(AuthGuard) 
  @Post('/create-project')
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectClient.send('createProject',createProjectDto);
  }

  @UseGuards(AuthGuard) 
  @Get('/get-projects')
  findAllProjects() {
    const rol = 'buscando rol'
    return this.projectClient.send('findAllProjects', rol);
  }
  
  @UseGuards(AuthGuard) 
  @Get('/get-project-by-id')
  findProjectById(@Query('project_id') project_id: any) {
    console.log('id', project_id)
    return this.projectClient.send('findProjectById', project_id);
  }

  @UseGuards(AuthGuard) 
  @Get('/search-project-by-name')
  searchProjectByName(@Query('project_name') project_name: any ) {
    console.log(project_name)
    return this.projectClient.send('searchProductByName',project_name)
  }

  @UseGuards(AuthGuard) 
  @Put('update-project/:id')
  updateProject(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    const updateQuery = {
      "id": id,
      "updateProjectDto": updateProjectDto
    } 

    return this.projectClient.send('updateProject', updateQuery)
  }

  @UseGuards(AuthGuard) 
  @Delete('delete-project/:id')
  removeProject(@Param('id') id: string) {
    console.log(id)
    return this.projectClient.send('removeProject', id);
  }
}