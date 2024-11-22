import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Item>;

@Schema()
export class Item {

    @Prop()
    item_id: number;

    @Prop()
    item_name: string;

    @Prop()
    item_price: string;

    @Prop()
    category: string;

    @Prop()
    inventory_id: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);