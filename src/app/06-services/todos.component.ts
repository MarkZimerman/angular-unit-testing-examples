
import { TodoService } from './todo.service';
import { OnInit } from '@angular/core';

export class TodosComponent implements OnInit {
  todos: any[] = [];
  message;

  constructor(private service: TodoService) {}

  ngOnInit(): void {
    this.service.getTodos().subscribe(t => this.todos.push(t));
  }

  add(): void {
    const newTodo = { title: '... ' };
    this.service.add(newTodo).subscribe(
      t => this.todos.push(t),
      err => this.message = err);
  }

  delete(id): void {
    if (confirm('Are you sure?')){
      this.service.delete(id).subscribe();
    }
  }
}
