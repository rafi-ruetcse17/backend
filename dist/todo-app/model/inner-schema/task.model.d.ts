import { Types } from 'mongoose';
export declare class Task {
    title: string;
    description: string;
    status: string;
    createdBy: Types.ObjectId;
    _id?: Types.ObjectId;
}
export declare const TaskSchema: import("mongoose").Schema<Task, import("mongoose").Model<Task, any, any, any, import("mongoose").Document<unknown, any, Task, any> & Task & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Task, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Task>, {}> & import("mongoose").FlatRecord<Task> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
