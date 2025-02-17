import { Injectable, signal, computed } from '@angular/core';
import { Todo } from '../models/todo.interface';

export interface AppState {
  todos: Todo[];
  selectedTodo: Todo | null;
  loading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private state = signal<AppState>({
    todos: [],
    selectedTodo: null,
    loading: false,
    error: null
  });

  todos = computed(() => this.state().todos);
  selectedTodo = computed(() => this.state().selectedTodo);
  loading = computed(() => this.state().loading);
  error = computed(() => this.state().error);

  setTodos(todos: Todo[]) {
    this.state.update((state) => ({ ...state, todos, error: null }));
  }

  setSelectedTodo(todo: Todo | null) {
    this.state.update((state) => ({ ...state, selectedTodo: todo }));
  }

  setLoading(loading: boolean) {
    this.state.update((state) => ({ ...state, loading }));
  }

  setError(error: string | null) {
    this.state.update((state) => ({ ...state, error }));
  }

  addTodo(todo: Todo) {
    this.state.update((state) => ({
      ...state,
      todos: [...state.todos, todo]
    }));
  }

  updateTodo(updatedTodo: Todo) {
    this.state.update((state) => ({
      ...state,
      todos: state.todos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      )
    }));
  }

  removeTodo(id: number) {
    this.state.update((state) => ({
      ...state,
      todos: state.todos.filter((todo) => todo.id !== id)
    }));
  }
}