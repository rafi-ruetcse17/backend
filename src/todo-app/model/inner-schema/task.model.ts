import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { TaskStatus } from 'src/lib/enum/task-status.enum';

@Schema({ _id: true, timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({
    type: String,
    enum: Object.values(TaskStatus),
    default: TaskStatus.IN_PROGRESS,
  })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  _id?: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
