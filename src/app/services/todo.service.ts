import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { Todo, CreateTodoDto } from '../models/todo.interface';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(
    private http: HttpClient,
    private cacheService: CacheService // Injection du service de cache
  ) {}

getTodos(): Observable<Todo[]> {
    const cachedTodos = this.cacheService.get('todos');
    if (cachedTodos) {
      return of(cachedTodos);
    }
    return this.http.get<Todo[]>(this.apiUrl).pipe(
      tap((todos) => this.cacheService.set('todos', todos))
    );
  }
  getTodo(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => throwError(() => error))
    );
  }

  createTodo(todo: CreateTodoDto): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo).pipe(
      catchError((error) => throwError(() => error))
    );
  }

  updateTodo(id: number, todo: Partial<Todo>): Observable<Todo> {
    return this.http.patch<Todo>(`${this.apiUrl}/${id}`, todo).pipe(
      catchError((error) => throwError(() => error))
    );
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => throwError(() => error))
    );
  }
}