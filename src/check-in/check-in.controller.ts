import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query } from '@nestjs/common';
import { CheckInService } from './check-in.service';
import { CreateCheckInDto } from './dto/create-check-in.dto';
import { UpdateCheckInDto } from './dto/update-check-in.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('check-in')
export class CheckInController {
  constructor(
    private readonly checkInService: CheckInService,
    @Inject('CHECK_IN_SERVICE') private checkInClient: ClientProxy,
  ) {}

  @Post('/create-check-in')
  createCheckIn(@Body() createCheckInDto: CreateCheckInDto) {
    console.log(this.checkInClient)
    return this.checkInClient.send('createCheckIn',createCheckInDto);
  }

  @Get('/find-all-check-in')
  findAllByDate() {
    return this.checkInClient.send('findAllByDate', 0);
  }

  @Get('/find-by-date-range')
  findAllByDateRange(
    @Query('startDate') startDateStr: string,
    @Query('endDate') endDateStr: string
  ) {
    const query = {
      "startDateStr": startDateStr,
      "endDateStr": endDateStr
    }
    return this.checkInClient.send('findAllByDateRange', query);
  }
////////////////////////////////////////////////////////////////////  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkInService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCheckInDto: UpdateCheckInDto) {
    return this.checkInService.update(+id, updateCheckInDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkInService.remove(+id);
  }
}
