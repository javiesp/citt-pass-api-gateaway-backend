import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: '7d6c26a8852d9519e7f1ea76189170e7f18ac4f3f2f491de817b4e603b1e9cfd0641f47132b70b110e1ac3640f9dce262adc525473b867e92e71d3b013cc74d2',  // Reemplaza 'yourSecretKey' con una clave secreta segura
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
