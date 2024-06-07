import { PartialType } from '@nestjs/mapped-types';
import { CreateWishListDto } from './create-wish-list.dto';
import { ProductDto } from './product.dto';

export class UpdateWishListDto extends PartialType(CreateWishListDto) {
    wishlist_id: number;
    wishlist_name: string;
    budget: number;
    product: ProductDto[];
}
