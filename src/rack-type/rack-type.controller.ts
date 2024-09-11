import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { RackTypeService } from './rack-type.service';
import { CreateRackTypeDto } from './dto/create-rack-type.dto';
import { UpdateRackTypeDto } from './dto/update-rack-type.dto';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from 'src/users/jwt.guard';

@Controller('rack-type')
export class RackTypeController {
  constructor(private readonly rackTypeService: RackTypeService) {}

  @Post('create-rack-type')
  @UseGuards(AuthGuard) 
  create(@Body() createRackTypeDto: CreateRackTypeDto) {
    return this.rackTypeService.createRackType(createRackTypeDto);
  }

  @Get('/find-all-rack-types')
  @UseGuards(AuthGuard) 
  findAll() {
    return this.rackTypeService.findAllRackTypes();
  }

  @Get('/find-one-rack-type/:id') 
  @UseGuards(AuthGuard) 
  findOne(@Param('id') id: string) {
    return this.rackTypeService.findOneRackType(id);
  }

  @Put('/update-rack-type/:id')
  @UseGuards(AuthGuard) 
  update(@Param('id') id: string, @Body() updateRackTypeDto: UpdateRackTypeDto) { 
    console.log(updateRackTypeDto) 
    return this.rackTypeService.updateRackType(id, updateRackTypeDto);
  }

  @Delete('/delete-rack-type/:id')
  @UseGuards(AuthGuard) 
  remove(@Param('id') id: string) {
    return this.rackTypeService.removeRackType(id);
  }
}