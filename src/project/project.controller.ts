import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from 'src/users/jwt.guard';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('/create-project')
  @UseGuards(AuthGuard) 
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.createProject(createProjectDto);
  }

  @Get('/get-project')
  @UseGuards(AuthGuard) 
  findAllProject() {
    return this.projectService.findAllProject();
  }

  @Get('/get-project-by-id')
  @UseGuards(AuthGuard) 
  findProjectById(@Query('project_id') project_id: any) {
    console.log('hola ',project_id)
    return this.projectService.findProjectById(project_id);
  } 

  @Get('/search-product-by-name')
  @UseGuards(AuthGuard) 
  searchProductByName(@Query('project_name') project_name: any) {
    return this.projectService.searchProductByName(project_name);
  }

  @Put('update-project/:id')
  @UseGuards(AuthGuard) 
  updateProject(@Param('id') id: any, @Body() updateProjectDto: UpdateProjectDto) {
    console.log(updateProjectDto)
    return this.projectService.updateProject(id, updateProjectDto);
  }

  @Delete('delete-project/:id')
  @UseGuards(AuthGuard) 
  removeProject(@Param('id') id: string) {
    console.log(id)
    return this.projectService.removeProject(id);
  }
}