import { PartialType } from '@nestjs/mapped-types';
import { CreateRackTypeDto } from './create-rack-type.dto';

export class UpdateRackTypeDto extends PartialType(CreateRackTypeDto) {
    rack_type: string;
    rack_name: string;
}
