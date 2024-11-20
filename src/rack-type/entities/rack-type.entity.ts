import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<RackType>;

@Schema()
export class RackType {

    @Prop()
    rack_id: number;

    @Prop()
    rack_type: string;

    @Prop()
    rack_name: string;
}

export const RackTypeSchema = SchemaFactory.createForClass(RackType);
