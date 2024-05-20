import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Put } from '@nestjs/common';
import { DecreaseService } from './decrease.service';
import { CreateDecreaseDto } from './dto/create-decrease.dto';
import { UpdateDecreaseDto } from './dto/update-decrease.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('decrease')
export class DecreaseController {
  constructor(private readonly decreaseService: DecreaseService,
    @Inject('DECREASE_SERVICES') private decreaseClient: ClientProxy
  ) {}

  @Post("/create-decrease")
  createDecrease(@Body() createDecreaseDto: CreateDecreaseDto) {
    console.log("crea un product")
    return this.decreaseClient.send('createDecrease', createDecreaseDto);  // la funcion send() envia los datos al decorator @MessagePattern del micro servicio users, ademas del parametro
  }

  @Get('/find-all-decreases')
  findAllDecreases() {
    return this.decreaseClient.send('findAllDecreases', {});
  }

  @Get('/find-one-decrease/:id')
  findOneDecrease(@Param('id') id: string) {
    return this.decreaseClient.send("findOneDecrease", id);
  }

  @Put('/update-decrease/:id')
  updateDecrease(@Param('id') id: string, @Body() updateDecreaseDto: UpdateDecreaseDto) {
    const payload = {
      "id": id,
      "updateDecreaseDto": updateDecreaseDto
    }
    return this.decreaseClient.send("updateDecrease", payload)
  }


  @Delete('/delete-decrease/:id')
  removeDecrease(@Param('id') id: string) {
    return this.decreaseClient.send('removeDecrease', id)
  }
}

