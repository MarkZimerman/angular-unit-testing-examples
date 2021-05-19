
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';

export class TodoService {
  constructor(private http: HttpClient) { }

  add(todo) {
    return this.http.post('...', todo);
  }

  getTodos() {
    return from([1, 2, 3]);
  }

  delete(id) {
    return this.http.delete('...');
  }
}
