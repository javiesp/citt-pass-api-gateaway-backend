// auth.controller.ts
import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('USERS_SERVICES') private usersClient: ClientProxy,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() credentials: { username: string; password: string }) {
    const user = await this.usersClient.send('validateUser', credentials).toPromise();

    if (user) {
      return this.authService.login(user);
    } else {
      return { message: 'Invalid credentials' };
    }
  }
}
