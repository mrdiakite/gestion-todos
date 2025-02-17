// src/app/components/todo-list/todo-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service'; // Vérifiez le chemin
import { StateService } from '../../services/state.service'; // Vérifiez le chemin
import { Todo } from '../../models/todo.interface'; // Vérifiez le chemin
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="todo-list-container">
      <!-- État de chargement -->
      @if (loading()) {
        <div class="loading">Chargement des tâches...</div>
      }

      <!-- État d'erreur -->
      @if (error()) {
        <div class="error">
          {{ error() }}
          <button (click)="loadTodos()">Réessayer</button>
        </div>
      }

      <!-- Liste des tâches -->
      @if (todos().length) {
        <div class="todo-grid">
          @for (todo of todos(); track todo.id) {
            <div class="todo-card">
              <h3>{{ todo.title }}</h3>
              <div class="actions">
                <button (click)="selectTodo(todo)">Voir détails</button>
                <button (click)="toggleTodo(todo.id)">Basculer</button>
                <button (click)="deleteTodo(todo.id)">Supprimer</button>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .user-list-container {
      padding: 20px;
    }

    .user-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      padding: 20px;
    }

    .user-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .actions {
      display: flex;
      gap: 10px;
      margin-top: 15px;
    }

    .error {
      color: red;
      padding: 20px;
      text-align: center;
    }

    .loading {
      text-align: center;
      padding: 20px;
    }
  `]
})
export class TodoListComponent implements OnInit {
  filteredTodos: Todo[] = [];
  private searchTerms = new Subject<string>();

  constructor(
    private todoService: TodoService, // Vérifiez que TodoService est bien injecté
    private stateService: StateService
  ) {}

  todos(): Todo[] {
    return this.stateService.todos(); // Utilisez le bon type "Todo[]"
  }

  loading(): boolean {
    return this.stateService.loading();
  }

  error(): string | null {
    return this.stateService.error();
  }

  ngOnInit() {
    this.loadTodos();
    this.searchTerms
      .pipe(debounceTime(300))
      .subscribe((term) => (this.filteredTodos = this.filterTodos(term)));
  }

  loadTodos() {
    this.todoService.getTodos().subscribe({
      next: (todos: Todo[]) => {
        this.stateService.setTodos(todos);
        this.filteredTodos = todos;
      },
      error: (error: { message: any }) => this.stateService.setError(error.message),
    });
  }

  onSearch(term: string) {
    this.searchTerms.next(term);
  }

  filterTodos(term: string): Todo[] {
    return this.todos().filter(
      (todo) =>
        todo.title.toLowerCase().includes(term.toLowerCase()) ||
        (todo.completed ? 'terminée' : 'en cours').includes(term.toLowerCase())
    );
  }

  selectTodo(todo: Todo) {
    this.stateService.setSelectedTodo(todo);
  }

  toggleTodo(id: number) {
    const updatedTodo = this.todos().find((t) => t.id === id);
    if (updatedTodo) {
      updatedTodo.completed = !updatedTodo.completed;
      this.todoService.updateTodo(id, { completed: updatedTodo.completed }).subscribe({
        next: () => this.stateService.updateTodo(updatedTodo),
        error: (error: { message: any }) => this.stateService.setError(error.message),
      });
    }
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe({
      next: () => this.stateService.removeTodo(id),
      error: (error: { message: any }) => this.stateService.setError(error.message),
    });
  }
}