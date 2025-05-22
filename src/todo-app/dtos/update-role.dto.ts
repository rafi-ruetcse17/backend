import { CollaboratorRole } from "../enum/role.enum";

export class UpdateCollaboratorRoleDto {
  userId: string;
  role: CollaboratorRole
  ;
}
