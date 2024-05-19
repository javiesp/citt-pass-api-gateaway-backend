import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService,
  @Inject('USERS_SERVICES') private roleClient: ClientProxy,
  ) {}

  @Post("/create-role")
  createRole(@Body() createRoleDto: CreateRoleDto) {
    console.log("crea un role")
    return this.roleClient.send('createRole', createRoleDto);  // la funcion send() envia los datos al decorator @MessagePattern del micro servicio users, ademas del parametro
  }

  @Get('/find-all-roles')
  findAllRoles() {
    return this.roleClient.send('findAllRoles', {});
  }

  @Get('/find-one-role/:id')
  findOneRole(@Param('id') id: string) {
    return this.roleClient.send("findOneRole", id);
  }

  @Put('/update-role/:id')
  updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    const payload = {
      "id": id,
      "updateRoleDto": updateRoleDto
    }
    return this.roleClient.send("updateRole", payload)
  }


  @Delete('/delete-role/:id')
  removeRole(@Param('id') id: string) {
    return this.roleClient.send('removeRole', id)
  }
}
