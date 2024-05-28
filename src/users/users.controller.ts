import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { query } from 'express';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';


@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    @Inject('USERS_SERVICES') private usersClient: ClientProxy,
    @Inject('PROJECT_SERVICES') private projectClient: ClientProxy,
  ) {}

  @Post('login')
  async login(@Body() credentials: { username: string; password: string }) {
    const user = await this.usersClient.send('validateUser', credentials).toPromise();

    if (user) {
      return this.authService.login(user);
    } else {
      return { message: 'Invalid credentials' };
    }
  }

  @Post("/create-user")
  create(@Body() createUserDto: CreateUserDto) {
    console.log("pasa por aca")
    return this.usersClient.send('createUser', createUserDto);  // la funcion send() envia los datos al decorator @MessagePattern del micro servicio users, ademas del parametro
  }

  @Get("/find-all-users")
  async findAll(@Query('project_id') project_id: string) { // recibe un parametro ingresado
    console.log(this.projectClient)
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

    console.log('data project',projectData)
    console.log('data users', usersData)
    
    return usersData
  }

  @Get('/find-one-user/:id')
  findOneUser(@Param('id') id: string) {
    return this.usersClient.send("findOneUser", id);
  }

  @Patch('/update-user/:id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const payload = {
      "id": id,
      "updateUserDto": updateUserDto
    }
    return this.usersClient.send("updateUser", payload)
  }

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
