import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { StateService } from '../../services/state.service';
import { CreateTodoDto } from '../../models/todo.interface';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <label for="title">Titre :</label>
      <input id="title" formControlName="title" required />
      <br />
      <label for="completed">Terminée :</label>
      <input id="completed" type="checkbox" formControlName="completed" />
      <br />
      <button type="submit" [disabled]="form.invalid">Ajouter</button>
    </form>
  `,
})
export class TodoFormComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    private stateService: StateService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      completed: [false],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const newTodo: CreateTodoDto = this.form.value;
      this.todoService.createTodo(newTodo).subscribe({
        next: (todo) => {
          this.stateService.addTodo(todo);
          alert('Tâche ajoutée avec succès !');
          this.form.reset();
        },
        error: (error) => this.stateService.setError(error.message),
      });
    }
  }
}