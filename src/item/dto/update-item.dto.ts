import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './create-item.dto';

export class UpdateItemDto extends PartialType(CreateItemDto) {
    item_name: string;
    item_price: string;
    category: string;
    inventory_id: string;
}