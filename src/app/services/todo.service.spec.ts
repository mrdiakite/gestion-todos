// src/app/services/todo.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { Todo, CreateTodoDto } from '../models/todo.interface';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService]
    });

    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Vérifie qu'il n'y a pas de requêtes non simulées
  });

  it('devrait être créé', () => {
    expect(service).toBeTruthy();
  });

  it('devrait récupérer les tâches', () => {
    const mockTodos: Todo[] = [
      {
        id: 1,
        title: 'Test Task',
        completed: false,
        userId: 1
      }
    ];

    service.getTodos().subscribe(todos => {
      expect(todos).toEqual(mockTodos);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTodos);
  });

  it('devrait récupérer une tâche par ID', () => {
    const todoId = 1;
    const mockTodo: Todo = {
      id: todoId,
      title: 'Test Task',
      completed: false,
      userId: 1
    };

    service.getTodo(todoId).subscribe(todo => {
      expect(todo).toEqual(mockTodo);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${todoId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTodo);
  });

  it('devrait créer une tâche', () => {
    const newTodo: CreateTodoDto = {
      title: 'New Task',
      completed: false,
      userId: 1
    };

    service.createTodo(newTodo).subscribe(response => {
      expect(response.title).toBe(newTodo.title);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTodo);
    req.flush({ ...newTodo, id: 101 });
  });

  it('devrait mettre à jour une tâche', () => {
    const todoId = 1;
    const updatedTodoData: Partial<Todo> = {
      title: 'Updated Task',
      completed: true
    };

    service.updateTodo(todoId, updatedTodoData).subscribe(response => {
        const arrayLiketitle = updatedTodoData.title as ArrayLike<string>
      expect(response.title).toEqual(arrayLiketitle);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${todoId}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(updatedTodoData);
    req.flush({ ...updatedTodoData, id: todoId });
  });

  it('devrait supprimer une tâche', () => {
    const todoId = 1;

    service.deleteTodo(todoId).subscribe(() => {});

    const req = httpMock.expectOne(`${service['apiUrl']}/${todoId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});

export { TodoService };
