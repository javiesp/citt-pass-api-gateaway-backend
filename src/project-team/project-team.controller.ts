import { Controller, Get, Post, Body, Put, Param, Delete, Inject, Query, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ProjectTeamService } from './project-team.service';
import { CreateProjectTeamDto } from './dto/create-project-team.dto';
import { UpdateProjectTeamDto } from './dto/update-project-team.dto';
import { LoginAuthDto } from 'src/users/dto/create-user.dto';
import { ClientProxy} from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from 'src/users/jwt.guard';

@Controller('project-team')
export class ProjectTeamController {
  constructor(
    private readonly projectTeamService: ProjectTeamService,
    private readonly jwtService: JwtService,
    @Inject('PROJECT_SERVICES') private projectTeamClient: ClientProxy,
  ) {}

  @Post('/login') 
  async loginUser(@Body() loginAuthDto: LoginAuthDto): Promise<{ accessToken: string; message: string }> {
    const userData = await this.projectTeamClient.send('loginUser', loginAuthDto); 
    
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
  @Post("/create-project-team")
  createProjectTeam(@Body() createProjectTeamDto: CreateProjectTeamDto) {
    console.log("crea un projectTeam")
    return this.projectTeamClient.send('createProjectTeam', createProjectTeamDto);  // la funcion send() envia los datos al decorator @MessagePattern del micro servicio users, ademas del parametro
  }

  @UseGuards(AuthGuard) 
  @Get('/find-all-project-teams')
  findAllProjectTeams() {
    return this.projectTeamClient.send('findAllProjectTeams', {});
  }

  @UseGuards(AuthGuard) 
  @Get('/find-one-project-team/:id')
  findOneProjectTeam(@Param('id') id: string) {
    return this.projectTeamClient.send("findOneProjectTeam", id);
  }

  @UseGuards(AuthGuard) 
  @Put('/update-project-team/:id')
  updateProjectTeam(@Param('id') id: string, @Body() updateProjectTeamDto: UpdateProjectTeamDto) {
    const payload = {
      "id": id,
      "updateProjectTeamDto": updateProjectTeamDto
    }
    return this.projectTeamClient.send("updateProjectTeam", payload)
  }

  @UseGuards(AuthGuard) 
  @Delete('/delete-project-team/:id')
  removeProjectTeam(@Param('id') id: string) {
    return this.projectTeamClient.send('removeProjectTeam', id)
  }
}