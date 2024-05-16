import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    product_id: number;
    product_price: number;
    product_stock: number;
    item_id: number;
}
