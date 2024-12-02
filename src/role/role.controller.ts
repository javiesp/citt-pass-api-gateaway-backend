import { Controller, Get, Post, Body, Put, Param, Delete, Inject, Query, UnauthorizedException, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ClientProxy} from '@nestjs/microservices';
import { AuthGuard } from 'src/users/jwt.guard';

@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    @Inject('USERS_SERVICES') private roleClient: ClientProxy,
  ) {}


  @UseGuards(AuthGuard) 
  @Post("/create-role")
  createRole(@Body() createRoleDto: CreateRoleDto) {
    console.log("crea un role")
    return this.roleService.createRole(createRoleDto)  // la funcion send() envia los datos al decorator @MessagePattern del micro servicio users, ademas del parametro
  }

  @UseGuards(AuthGuard) 
  @Get('/find-all-roles')
  findAllRoles() {
    return this.roleService.findAllRoles()
  }

  @UseGuards(AuthGuard) 
  @Get('/find-one-role/:id')
  findOneRole(@Param('id') id: string) {
    return this.roleService.findOneRole(id)
  }

  @UseGuards(AuthGuard) 
  @Get('/find-one-roleid')
  findOneRoleId(@Query('role_id') role_id: string) {
    return this.roleService.findOneRoleId(role_id)
  }

  @UseGuards(AuthGuard) 
  @Put('/update-role/:id')
  updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    const payload = {
      "id": id,
      "updateRoleDto": updateRoleDto
    }
    return this.roleService
  }

  @UseGuards(AuthGuard) 
  @Delete('/delete-role/:id')
  removeRole(@Param('id') id: string) {
    return this.roleService
  }
}
