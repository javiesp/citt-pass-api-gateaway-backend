import { Controller, Get, Post, Body, Put, Param, Delete, Inject, Query, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserRoleService } from './user_role.service';
import { CreateUserRoleDto} from './dto/create-user_role.dto';
import { UpdateUserRoleDto } from './dto/update-user_role.dto';
import { ClientProxy} from '@nestjs/microservices';
import { AuthGuard } from 'src/users/jwt.guard';

@Controller('user-role')
export class UserRoleController {
  constructor(
    private readonly userRoleService: UserRoleService,
    @Inject('USERS_SERVICES') private userRoleClient: ClientProxy,

  ) {}

  @UseGuards(AuthGuard) 
  @Post("/create-user-role")
  createUserRole(@Body() createUserRoleDto: CreateUserRoleDto) {
    console.log("crea un user_role")
    return this.userRoleClient.send('createUserRole', createUserRoleDto);  // la funcion send() envia los datos al decorator @MessagePattern del micro servicio users, ademas del parametro
  }

  @UseGuards(AuthGuard) 
  @Get('/find-all-user-roles')
  findAllUserRoles() {
    return this.userRoleClient.send('findAllUserRoles', {});
  }

  @UseGuards(AuthGuard) 
  @Get('/find-one-user-role/:id')
  findOneUserRole(@Param('id') id: string) {
    return this.userRoleClient.send("findOneUserRole", id);
  }

  @UseGuards(AuthGuard) 
  @Put('/update-user-role/:id')
  updateUserRole(@Param('id') id: string, @Body() updateUserRoleDto: UpdateUserRoleDto) {
    const payload = {
      "id": id,
      "updateUserRoleDto": updateUserRoleDto
    }
    return this.userRoleClient.send("updateUserRole", payload)
  }

  @UseGuards(AuthGuard) 
  @Delete('/delete-user-role/:id')
  removeUserRole(@Param('id') id: string) {
    return this.userRoleClient.send('removeUserRole', id)
  }
}
