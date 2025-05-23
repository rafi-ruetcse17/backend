import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  Collaborator,
  CollaboratorSchema,
} from './inner-schema/collaborator.model';
import { Task } from './inner-schema/task.model';

@Schema({ timestamps: true })
export class ToDoApp {
  @Prop({ required: true })
  title: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: Types.ObjectId;

  @Prop({ type: [CollaboratorSchema], default: [] })
  collaborators: Collaborator[];

  @Prop({ type: [Task], default: [] })
  tasks: Task[];
}

export type ToDoAppDocument = ToDoApp & Document;
export const ToDoAppSchema = SchemaFactory.createForClass(ToDoApp);
