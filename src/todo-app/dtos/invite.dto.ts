import { CollaboratorRole } from "../enum/role.enum";

export class InviteCollaboratorDto {
  userId: string;
  role: CollaboratorRole;
}
