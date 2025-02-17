import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Correction du chemin d'importation pour TodoListComponent
import { TodoListComponent } from './components/todo-list/todo-list.component'; // Ajout du point devant ./components

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // Template principal de l'application
  styleUrls: ['./app.component.scss'] // Correction de styleUrl en styleUrls
  ,
  imports: [TodoListComponent]
})
export class AppComponent {
  title = 'gestion-todos';
}
