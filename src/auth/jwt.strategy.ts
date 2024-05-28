import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '7d6c26a8852d9519e7f1ea76189170e7f18ac4f3f2f491de817b4e603b1e9cfd0641f47132b70b110e1ac3640f9dce262adc525473b867e92e71d3b013cc74d2',  // Reemplaza 'yourSecretKey' con la misma clave secreta usada en JwtModule
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
