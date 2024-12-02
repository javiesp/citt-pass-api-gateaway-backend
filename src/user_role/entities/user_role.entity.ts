import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type userDocument = HydratedDocument<UserRole>;

@Schema()
export class UserRole {

  @Prop()
  user_role_id: number;

  @Prop()
  role_id: number;

  @Prop()
  uid_user: string;

  @Prop()
  user_role: string[];

  @Prop()
  user_major: string;

  @Prop()
  user_permissions: string[];

  @Prop()
  major_school: string;

  @Prop()
  current_semester: number;
}

export const UserRoleSchema = SchemaFactory.createForClass(UserRole);
