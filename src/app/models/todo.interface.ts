export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    userId: number; // Identifiant de l'utilisateur associé à la tâche
  }

  export type CreateTodoDto = Omit<Todo, 'id'>;