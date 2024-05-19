import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Put } from '@nestjs/common';
import { BillLogService } from './bill_log.service';
import { CreateBillLogDto } from './dto/create-bill_log.dto';
import { UpdateBillLogDto } from './dto/update-bill_log.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('bill-log')
export class BillLogController {
  constructor(private readonly billLogService: BillLogService,

    @Inject('BILL_LOG_SERVICES') private billLogClient: ClientProxy
  ) {}

  @Post("/create-bill-log")
  createBillLog(@Body() createBillLogDto: CreateBillLogDto) {
    console.log("crea un product")
    return this.billLogClient.send('createBillLog', createBillLogDto);  // la funcion send() envia los datos al decorator @MessagePattern del micro servicio users, ademas del parametro
  }

  @Get('/find-all-bill-logs')
  findAllBillLogs() {
    return this.billLogClient.send('findAllBillLogs', {});
  }

  @Get('/find-one-bill-log/:id')
  findOneBillLog(@Param('id') id: string) {
    return this.billLogClient.send("findOneBillLog", id);
  }

  @Put('/update-bill-log/:id')
  updateBillLog(@Param('id') id: string, @Body() updateBillLogDto: UpdateBillLogDto) {
    const payload = {
      "id": id,
      "updateBillLogDto": updateBillLogDto
    }
    return this.billLogClient.send("updateBillLog", payload)
  }


  @Delete('/delete-bill-log/:id')
  removeBillLog(@Param('id') id: string) {
    return this.billLogClient.send('removeBillLog', id)
  }
}

