import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type projectDocument = HydratedDocument<Project>;

@Schema()
export class Project {

  @Prop()
  project_id: number

  @Prop()
  project_name: string

  @Prop()
  project_description: string

  @Prop()
  project_status: string

  @Prop()
  wishlist_id: number

  @Prop()
  project_team_id: number
}

export const projectSchema = SchemaFactory.createForClass(Project);