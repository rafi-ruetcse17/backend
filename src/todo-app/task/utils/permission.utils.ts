import { ToDoAppDocument } from 'src/todo-app/model/todo-app.model';

export function canEdit(app: ToDoAppDocument, userId: string): boolean {
  if (app.owner.toString() === userId) return true;

  const collaborator = app.collaborators.find(
    (c) => c.userId.toString() === userId && c.role === 'editor',
  );

  return !!collaborator;
}
