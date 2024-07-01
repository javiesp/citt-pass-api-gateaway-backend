import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type userDocument = HydratedDocument<User>;

@Schema()
export class User {

  @Prop()
  uid_user: string

  @Prop()
  name: string;

  @Prop()
  hashed_password: string;

  @Prop()
  email: string;

  @Prop()
  phone: number;

  @Prop()
  run: string;


  @Prop()
  proyect_id: number;
}

export const UserSchema = SchemaFactory.createForClass(User);