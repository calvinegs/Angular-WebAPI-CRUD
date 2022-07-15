import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from 'src/app/shared/models/todo.model';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentTodo: Todo = {
    title: '',
    description: '',
    status: false,
  }
  @Output() refreshProcess = new EventEmitter()

  message = '';
  showBackto = 0;
  constructor(private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getTodo(this.route.snapshot.params["id"]);
      // console.log("id:" + this.route.snapshot.params["id"]);
    }
    this.route.queryParams.subscribe(params => {
      this.showBackto = params['showbackto'];
      // console.log('query:' + this.showBackto);
    });
  }
  
  getTodo(id: string): void {
    this.todoService.get(id)
      .subscribe({
        next: (data) => {
          this.currentTodo = data;
          console.log(data);
        },
        error: (e) => console.log(e)
      });
  }

  updateStatus(status: boolean): void {
    const data = {
      title: this.currentTodo.title,
      description: this.currentTodo.description,
      status: status,
    };
    this.message = '';
    this.todoService.update(this.currentTodo.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentTodo.status = status;
          this.message = res.message ? res.message : '狀態更新成功！';
        },
        error: (e) => console.log(e)
      });
  }

  updateTodo(): void {
    this.message = '';
    this.todoService.update(this.currentTodo.id, this.currentTodo)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'todo 更新成功！';
        },
        error: (e) => console.log(e)
      });
  }

  deleteTodo(): void {
    this.todoService.delete(this.currentTodo.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/todolist']);
          this.refreshProcess.emit();
        },
        error: (e) => console.log(e)
      });
  }

  backtoTodo(): void {
    this.router.navigate(['/todolist']);
  }
}