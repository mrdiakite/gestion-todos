import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { StateService } from '../../services/state.service';
import { Todo } from '../../models/todo.interface';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="todo">
      <h2>{{ todo.title }}</h2>
      <p><strong>Statut :</strong> {{ todo.completed ? 'Terminée' : 'En cours' }}</p>
      <button (click)="goBack()">Retour</button>
    </div>
    <div *ngIf="!todo">Chargement...</div>
  `,
})
export class TodoDetailComponent implements OnInit {
  todo: Todo | null = null;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private stateService: StateService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.todoService.getTodo(id).subscribe({
        next: (todo) => {
          this.todo = todo;
          this.stateService.setSelectedTodo(todo);
        },
        error: (error) => this.stateService.setError(error.message),
      });
    }
  }

  goBack() {
    history.back();
  }
}