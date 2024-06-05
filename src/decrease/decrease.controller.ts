import { Controller, Get, Post, Body, Put, Param, Delete, Inject, Query, UnauthorizedException, UseGuards } from '@nestjs/common';
import { DecreaseService } from './decrease.service';
import { CreateDecreaseDto } from './dto/create-decrease.dto';
import { UpdateDecreaseDto } from './dto/update-decrease.dto';
import { LoginAuthDto } from 'src/users/dto/create-user.dto';
import { ClientProxy} from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from 'src/users/jwt.guard';

@Controller('decrease')
export class DecreaseController {
  constructor(
    private readonly decreaseService: DecreaseService,
    private readonly jwtService: JwtService,
    @Inject('DECREASE_SERVICES') private decreaseClient: ClientProxy
  ) {}

  @Post('/login') 
  async loginUser(@Body() loginAuthDto: LoginAuthDto): Promise<{ accessToken: string; message: string }> {
    const userData = await this.decreaseClient.send('loginUser', loginAuthDto); 
    
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
  @Post("/create-decrease")
  createDecrease(@Body() createDecreaseDto: CreateDecreaseDto) {
    console.log("crea un product")
    return this.decreaseClient.send('createDecrease', createDecreaseDto);  // la funcion send() envia los datos al decorator @MessagePattern del micro servicio users, ademas del parametro
  }

  @UseGuards(AuthGuard) 
  @Get('/find-all-decreases')
  findAllDecreases() {
    return this.decreaseClient.send('findAllDecreases', {});
  }

  @UseGuards(AuthGuard) 
  @Get('/find-one-decrease/:id')
  findOneDecrease(@Param('id') id: string) {
    return this.decreaseClient.send("findOneDecrease", id);
  }

  @UseGuards(AuthGuard) 
  @Put('/update-decrease/:id')
  updateDecrease(@Param('id') id: string, @Body() updateDecreaseDto: UpdateDecreaseDto) {
    const payload = {
      "id": id,
      "updateDecreaseDto": updateDecreaseDto
    }
    return this.decreaseClient.send("updateDecrease", payload)
  }

  @UseGuards(AuthGuard) 
  @Delete('/delete-decrease/:id')
  removeDecrease(@Param('id') id: string) {
    return this.decreaseClient.send('removeDecrease', id)
  }
}

