import { ProductDto } from './product.dto';

export class CreateWishListDto {
  wishlist_id: number;
  wishlist_name: string;
  budget: number;
  product: ProductDto[];
}