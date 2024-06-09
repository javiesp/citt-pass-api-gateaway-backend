import { Controller, Get, Post, Body, Put, Param, Delete, Inject, Query, UnauthorizedException, UseInterceptors, UseGuards } from '@nestjs/common';
import { RackTypeService } from './rack-type.service';
import { CreateRackTypeDto } from './dto/create-rack-type.dto';
import { UpdateRackTypeDto } from './dto/update-rack-type.dto';
import { ClientProxy} from '@nestjs/microservices';
import { AuthGuard } from 'src/users/jwt.guard';

@Controller('rack-type')
export class RackTypeController {
  constructor(
    private readonly rackTypeService: RackTypeService,
    @Inject('RACK_TYPE_SERVICES') private rackTypeClient: ClientProxy
  ) {}

  @UseGuards(AuthGuard) 
  @Post("/create-rack-type")
  createRackType(@Body() createRackTypeDto: CreateRackTypeDto) {
    console.log("crea un product")
    return this.rackTypeClient.send('createRackType', createRackTypeDto);  // la funcion send() envia los datos al decorator @MessagePattern del micro servicio users, ademas del parametro
  }

  @UseGuards(AuthGuard) 
  @Get('/find-all-rack-types')
  findAllRackTypes() {
    return this.rackTypeClient.send('findAllRackTypes', {});
  }

  @UseGuards(AuthGuard) 
  @Get('/find-one-rack-type/:id')
  findOneRackType(@Param('id') id: string) {
    return this.rackTypeClient.send("findOneRackType", id);
  }

  @UseGuards(AuthGuard) 
  @Put('/update-rack-type/:id')
  updateRackType(@Param('id') id: string, @Body() updateRackTypeDto: UpdateRackTypeDto) {
    const payload = {
      "id": id,
      "updateRackTypeDto": updateRackTypeDto
    }
    return this.rackTypeClient.send("updateRackType", payload)
  }

  @UseGuards(AuthGuard) 
  @Delete('/delete-rack-type/:id')
  removeRackType(@Param('id') id: string) {
    return this.rackTypeClient.send('removeRackType', id)
  }
}
