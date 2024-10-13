import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    email: string;
    phone: number;
    name: string;
    run: string
    proyect_id: number;
}
