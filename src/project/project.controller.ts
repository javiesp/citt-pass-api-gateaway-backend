import { Controller, Get, Post, Body, Put, Param, Delete, Inject, Query, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { LoginAuthDto } from 'src/users/dto/create-user.dto';
import { ClientProxy} from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from 'src/users/jwt.guard';

@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly jwtService: JwtService,
    @Inject('PROJECT_SERVICES') private projectClient: ClientProxy,

  ) {}

  @Post('/login') 
  async loginUser(@Body() loginAuthDto: LoginAuthDto): Promise<{ accessToken: string; message: string }> {
    const userData = await this.projectClient.send('loginUser', loginAuthDto); 
    
    if (!userData) {
      throw new UnauthorizedException('Invalid credentials'); 
    }

    // Genera el token JWT
    const accessToken = this.generateToken(userData); 

    return { accessToken, message: 'token generado' };
  }

  private generateToken(user: any): string { 
    const payload = { email: user.email, sub: user.id }; 
    return this.jwtService.sign(payload);
  }

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