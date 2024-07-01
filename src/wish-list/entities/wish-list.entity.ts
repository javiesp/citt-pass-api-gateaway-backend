import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
//import { Product } from './product.schema';  // Importar el esquema de Producto

export type WishListDocument = HydratedDocument<WishList>;

@Schema()
export class WishList {
    @Prop()
    id: number;

    @Prop()
    wishlist_id: number;

    @Prop()
    wishlist_name: string;

    @Prop()
    budget: number;

    @Prop([{ product_id: Number, product_name: String, price: Number, quantity: Number }])
    product: Product[];
}

export const WishListSchema = SchemaFactory.createForClass(WishList);


@Schema()
export class Product {

    @Prop()
    product_id: number;

    @Prop()
    cant: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);