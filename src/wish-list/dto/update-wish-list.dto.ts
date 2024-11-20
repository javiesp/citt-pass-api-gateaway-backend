import { PartialType } from '@nestjs/mapped-types';
import { CreateWishListDto } from './create-wish-list.dto';
import { ProductDto } from './product.dto';

export class UpdateWishListDto {
    budget: number;
}
