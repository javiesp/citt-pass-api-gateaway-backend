import { PartialType } from '@nestjs/mapped-types';
import { CreateDecreaseDto } from './create-decrease.dto';

export class UpdateDecreaseDto extends PartialType(CreateDecreaseDto) {
    decrease_id: number;
    reason_for_decrease: string;
    date_decrease: Date;
    product_id: number[];
}
