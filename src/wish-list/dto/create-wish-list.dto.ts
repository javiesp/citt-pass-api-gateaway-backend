import { ProductDto } from './product.dto';

export class CreateWishListDto {
    id: number;
    wishlist_id: number;
    wishlist_name: string;
    budget: number;
    product: ProductDto[];
}
