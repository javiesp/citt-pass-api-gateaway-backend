import { Controller, Get, Post, Body, Put, Param, Delete, Inject, Query, UnauthorizedException, UseGuards } from '@nestjs/common';
import { BillLogService } from './bill_log.service';
import { CreateBillLogDto } from './dto/create-bill_log.dto';
import { UpdateBillLogDto } from './dto/update-bill_log.dto';
import { LoginAuthDto } from 'src/users/dto/create-user.dto';
import { ClientProxy} from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from 'src/users/jwt.guard';

@Controller('bill-log')
export class BillLogController {
  constructor(
    private readonly billLogService: BillLogService,
    private readonly jwtService: JwtService,
    @Inject('BILL_LOG_SERVICES') private billLogClient: ClientProxy
  ) {}

  @Post('/login') 
  async loginUser(@Body() loginAuthDto: LoginAuthDto): Promise<{ accessToken: string; message: string }> {
    const userData = await this.billLogClient.send('loginUser', loginAuthDto); 
    
    if (!userData) {
      throw new UnauthorizedException('Invalid credentials'); 
    }

    // Genera el token JWT
    const accessToken = this.generateToken(userData); 

    return { accessToken, message: 'token generado' };
  }

  private generateToken(user: any): string { 
    const payload = { email: user.email, sub: user.id }; 
    return this.jwtService.sign(payload);
  }

  @UseGuards(AuthGuard) 
  @Post("/create-bill-log")
  createBillLog(@Body() createBillLogDto: CreateBillLogDto) {
    console.log("crea un product")
    return this.billLogClient.send('createBillLog', createBillLogDto);  // la funcion send() envia los datos al decorator @MessagePattern del micro servicio users, ademas del parametro
  }

  @UseGuards(AuthGuard) 
  @Get('/find-all-bill-logs')
  findAllBillLogs() {
    return this.billLogClient.send('findAllBillLogs', {});
  }

  @UseGuards(AuthGuard) 
  @Get('/find-one-bill-log/:id')
  findOneBillLog(@Param('id') id: string) {
    return this.billLogClient.send("findOneBillLog", id);
  }

  @UseGuards(AuthGuard) 
  @Put('/update-bill-log/:id')
  updateBillLog(@Param('id') id: string, @Body() updateBillLogDto: UpdateBillLogDto) {
    const payload = {
      "id": id,
      "updateBillLogDto": updateBillLogDto
    }
    return this.billLogClient.send("updateBillLog", payload)
  }

  @UseGuards(AuthGuard) 
  @Delete('/delete-bill-log/:id')
  removeBillLog(@Param('id') id: string) {
    return this.billLogClient.send('removeBillLog', id)
  }
}

