import { Component, OnInit, ValueProvider } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Todo } from 'src/app/shared/models/todo.model';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });

  submitted = false;  // 送出否
  isAddFailed = false;  // 新增有誤否
  isAdded = false;  // 新增成功否
  errorMessage = "";

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private todoService: TodoService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        title: ['',[Validators.required]],
        description: ['',[Validators.required]]
      }
    )}

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const data = this.form.getRawValue();
    this.todoService.create(data)
      .subscribe({
        next: (res) => {
          this.isAdded = true;
          this.router.navigate(['/todolist']);
        },
        error: (e) => {
          this.errorMessage = e.message
          this.isAddFailed = true;
        }
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onReset(): void {
    this.submitted = false;
    this.isAddFailed = false;
    this.form.reset();
  }
}