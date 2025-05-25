import { Document, Types } from 'mongoose';
import { Collaborator } from './inner-schema/collaborator.model';
import { Task } from './inner-schema/task.model';
export declare class ToDoApp {
    title: string;
    description: string;
    owner: Types.ObjectId;
    collaborators: Collaborator[];
    tasks: Task[];
}
export type ToDoAppDocument = ToDoApp & Document;
export declare const ToDoAppSchema: import("mongoose").Schema<ToDoApp, import("mongoose").Model<ToDoApp, any, any, any, Document<unknown, any, ToDoApp, any> & ToDoApp & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ToDoApp, Document<unknown, {}, import("mongoose").FlatRecord<ToDoApp>, {}> & import("mongoose").FlatRecord<ToDoApp> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
