import { Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';

export const appRoutes: Routes = [
  { path: '', component: TodoListComponent },
  { path: 'todos/:id', component: TodoDetailComponent },
];