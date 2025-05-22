import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { CollaboratorRole } from 'src/todo-app/enum/role.enum';

@Schema({ _id: false })
export class Collaborator {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({
    type: String,
    enum: Object.values(CollaboratorRole),
    default: CollaboratorRole.VIEWER,
  })
  role: CollaboratorRole;
}

export const CollaboratorSchema = SchemaFactory.createForClass(Collaborator);
