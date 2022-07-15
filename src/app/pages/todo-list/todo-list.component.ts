import { Component, OnInit } from '@angular/core';
import { VirtualTimeScheduler } from 'rxjs';
import { Todo } from 'src/app/shared/models/todo.model';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos?: Todo[];
  currentTodo: Todo = {};
  currentIndex = -1;
  title='';

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.retrieveTodos();
  }

  retrieveTodos(): void {
    this.todoService.getAll()
      .subscribe({
        next: (data) => {
          this.todos = data;
        },
        error: (e) => console.log(e)
      });
  }

  refreshList(): void {
    this.retrieveTodos();
    this.currentTodo = {};
    this.currentIndex = -1
  }

  setActiveTodo(todo: Todo, index: number): void {
    this.currentTodo = todo;
    this.currentIndex = index;
  }

  removeAllTodos(): void {
    this.todoService.deleteAll()
      .subscribe({
        next: (res) => {
          this.refreshList();
        },
        error: (e) => console.log(e)
      });
  }

  searchTitle(): void {
    this.currentTodo = {};
    this.currentIndex = -1;
    this.todoService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.todos = data;
          console.log(data);
        },
        error: (e) => console.log(e)
      });
  }
}
