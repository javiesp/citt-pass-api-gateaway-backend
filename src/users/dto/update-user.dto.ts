import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    uid_user: string;
    email: string;
    phone: number;
    name: string;
    hashed_password: string
    run: string
    proyect_id: number;
}
