import { Types } from 'mongoose';

export function compareObjectIds(
  a: Types.ObjectId | string,
  b: Types.ObjectId | string,
): boolean {
  return a?.toString() === b?.toString();
}
