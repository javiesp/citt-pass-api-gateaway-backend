import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type userDocument = HydratedDocument<Role>;

@Schema()
export class Role {

  @Prop()
  role_id: number;

  @Prop()
  role_name: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);