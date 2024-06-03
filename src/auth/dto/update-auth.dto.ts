import { PartialType } from '@nestjs/mapped-types';
import { loginAuthDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(loginAuthDto) {}
