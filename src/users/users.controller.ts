import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, UnauthorizedException, UseInterceptors, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginAuthDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from './jwt.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject('USERS_SERVICES') private usersClient: ClientProxy,
    @Inject('PROJECT_SERVICES') private projectClient: ClientProxy,
  ) {}

  @Post('/login') 
  async loginUser(@Body() loginAuthDto: LoginAuthDto): Promise<{ accessToken: string; message: string }> {
    const userData = await this.usersClient.send('loginUser', loginAuthDto); 
    
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
  @Post("/create-user")
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersClient.send('createUser', createUserDto);  // la funcion send() envia los datos al decorator @MessagePattern del micro servicio users, ademas del parametro
  }

  @UseGuards(AuthGuard)
  @Get("/find-users-by-project")
  async findAllByProjectId(@Query('project_id') project_id: string) { // recibe un parametro ingresado
    const query = {
      "project_id": project_id
    }
    // para utilizar dos funciones de dos microservicios distintos asincronicamente 
    const usersData = await firstValueFrom( 
      this.usersClient.send('findAllUsers', query)
    ) 

    const projectData = await firstValueFrom(
      this.projectClient.send('findProjectById', query)
    ) 
    return usersData
  }

  @UseGuards(AuthGuard)
  @Get("/find-all-users")
  async findAll() { // recibe un parametro ingresado
    const usersData = await firstValueFrom( 
      this.usersClient.send('findAll', 1)
    ) 
    return usersData  
  }

  @UseGuards(AuthGuard)
  @Get('/find-one-user/:id')
  findOneUser(@Param('id') id: string) {
    return this.usersClient.send("findOneUser", id);
  }

  @UseGuards(AuthGuard)
  @Patch('/update-user/:id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const payload = {
      "id": id,
      "updateUserDto": updateUserDto
    }
    return this.usersClient.send("updateUser", payload)
  }

  @UseGuards(AuthGuard)
  @Patch('/update-user-password/:id')
  updateUserPassword(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const payload = {
      "id": id,
      "updateUserDto": updateUserDto
    }
    return this.usersClient.send("updateUser", payload)
  }

  @Delete('/delete-user/:id')
  remove(@Param('id') id: string) {
    return this.usersClient.send('removeUser', id)
  }
}
