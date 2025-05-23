export class UpdateTaskDto {
  title?: string;
  description?: string;
  status?: 'in-progress' | 'completed' | 'stale';
}
