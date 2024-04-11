import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { query } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject('USERS_SERVICES') private usersClient: ClientProxy,
  ) {}

  @Post("/create-user")
  create(@Body() createUserDto: CreateUserDto) {
    console.log("pasa por aca")
    return this.usersClient.send('createUser', createUserDto);
  }

  @Get("/find-all-users")
  findAll(@Query('proyect_id') proyect_id: string) { // recibe un parametro ingresado
    return this.usersClient.send('findAllUsers', proyect_id); // la funcion send() envia los datos al decorator @MessagePattern del micro servicio users, ademas del parametro
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

  @Delete('/delete-user/:id')
  remove(@Param('id') id: string) {
    return this.usersClient.send('removeUser', id)
  }
}
