import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
    @Prop()
    product_id: number;

    @Prop()
    product_price: number;

    @Prop()
    product_stock: number;

    @Prop()
    item_id: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);