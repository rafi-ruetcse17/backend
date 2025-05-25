import { Types } from 'mongoose';
import { CollaboratorRole } from 'src/todo-app/enum/role.enum';
export declare class Collaborator {
    userId: Types.ObjectId;
    role: CollaboratorRole;
}
export declare const CollaboratorSchema: import("mongoose").Schema<Collaborator, import("mongoose").Model<Collaborator, any, any, any, import("mongoose").Document<unknown, any, Collaborator, any> & Collaborator & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Collaborator, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Collaborator>, {}> & import("mongoose").FlatRecord<Collaborator> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
