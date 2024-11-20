import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type userDocument = HydratedDocument<InventoryManagement>;

@Schema()
export class InventoryManagement {
    @Prop()
    inventory_id: number
  
    @Prop()
    inventory_name: string;
  
    @Prop()
    product_id: number[];
  
    @Prop()
    rack_id: number;

  }
  
  export const InventoryManagementSchema = SchemaFactory.createForClass(InventoryManagement);