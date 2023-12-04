import { Component } from '@angular/core';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  todos: any[]=[];
  newTitle: any;
  newCompleted: any;
  selectedTodo: any;
  message: any;
  messageType: any;

  constructor(private todoService: ContactService) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.todoService.getTodos().subscribe(
      todos => {
        console.log('Fetched todos:', todos);
        this.todos = todos;
      }
    );
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(
      () => {
        console.log('Todo deleted successfully.');
        this.showMessage('Task deleted successfully.', 'success');
        this.getTodos();
      }
    );
  }

  updateTodoPatch(todo: any) {
    this.todoService.updateTodoPatch(todo.id, { completed: !todo.completed }).subscribe(
      response => {
        console.log('Todo updated successfully with PATCH:', response);
        this.showMessage('Todo updated successfully with PATCH.', 'success');
        this.resetForm();
        this.getTodos();
      }
    );
  }

  updateTodoPut(todo: any) {
    this.todoService.updateTodoPut(todo.id, { title: this.newTitle, completed: this.newCompleted }).subscribe(
      response => {
        console.log('Todo updated successfully with PUT:', response);
        this.showMessage('Todo updated successfully with PUT.', 'success');
        this.resetForm();
        this.getTodos();
      }
    );
  }

  
// form reset
  resetForm() {
    this.newTitle = '';
    this.newCompleted = null;
    this.selectedTodo = null;
  }

  showMessage(message: string, type: 'success' | 'error') {
    this.message = message;
    this.messageType = type;
    setTimeout(() => {
      this.message = null;
    }, 3000);
  }
}
