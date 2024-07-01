import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginAuthDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { AuthGuard } from './jwt.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/login')
  async loginUser(@Body() loginAuthDto: LoginAuthDto): Promise<{ accessToken: string; message: string }> {
    const userData = await this.usersService.userLogin(loginAuthDto);
    console.log('HOLA MUNDO')
    console.log(loginAuthDto)
    if (!userData) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.generateToken(userData);

    return { accessToken, message: 'token generado' };
  }

  private generateToken(user: any): string {
    console.log('HOLA MUNDO')
    console.log(user)
    const payload = { email: user.email, sub: user._id };
    return this.jwtService.sign(payload);
  }

  @Post('/create-user')
  @UseGuards(AuthGuard) 
  createUser(@Body() createUserDto: CreateUserDto) { 
    console.log("pasa por aca")
    return this.usersService.createUser(createUserDto);
  }

  @Get('/find-users-by-project')
  @UseGuards(AuthGuard) 
  async findUsersByProject(@Query('proyect_id') proyectId: number) {
    return this.usersService.findUsersByProject(proyectId);
  }


  @Get('/find-all-users')
  @UseGuards(AuthGuard) 
  findAll() { 
    const usersData = this.usersService.findAll();
    return usersData;
  }

  @Get('/find-one-user/:id') 
  @UseGuards(AuthGuard) 
  findOne(@Param('id') id: string) {
    return this.usersService.findOneUser(id);
  }

  @Patch('/update-user/:id')
  @UseGuards(AuthGuard) 
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) { 
    console.log(updateUserDto) 
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Patch('/update-user-password/:id')
  @UseGuards(AuthGuard) 
  updateUserPassword(@Param('id') id: string, @Body() updateUserDto: UpdateUserPasswordDto) { 
    console.log(updateUserDto) 
    return this.usersService.updateUserPassword(id, updateUserDto);
  }

  @Delete('/delete-user/:id')
  @UseGuards(AuthGuard) 
  remove(@Param('id') id: string) {
    return this.usersService.removeUser(id);
  }
}
