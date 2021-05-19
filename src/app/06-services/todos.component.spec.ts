import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';
import { from, throwError, EMPTY } from 'rxjs';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    // Instead of real Http service we will inject null, because we will never use it here:
    service = new TodoService(null);
    component = new TodosComponent(service);
  });

  it('should set todos properties with the items returned from the server', () => {
    const todos = [1, 2, 3];
    spyOn(service, 'getTodos').and.callFake(() => {
      return from(todos);
    });

    component.ngOnInit();

    // expect(component.todos.length).toBeGreaterThan(0);
    expect(component.todos).toEqual(todos);
  });

  it('should call the server to save the changes when a new todo item is added', () => {
    const spy =  spyOn(service, 'add').and.callFake((t) => EMPTY );

    component.add();

    expect(spy).toHaveBeenCalled();
  });

  it('should add the new todo returned from server', () => {
    const todo = { id: 1};
    spyOn(service, 'add').and.returnValue(from([ todo ]));

    component.add();

    expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);
  });

  it('should set the message property if message returns an error when adding a new todo', () => {
    const errorFromServer = 'error from the server';
    spyOn(service, 'add').and.returnValue(throwError(errorFromServer));

    component.add();

    expect(component.message).toBe(errorFromServer);
  });
// ===========
  it ('should call the server to delete a todo item if the user confirms', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const spy = spyOn(service, 'delete').and.returnValue(EMPTY);

    component.delete(1);

    expect(spy).toHaveBeenCalledWith(1);
  });

  it ('should NOT call the server to delete a todo item if the user cancels', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    const spy = spyOn(service, 'delete').and.returnValue(EMPTY);

    component.delete(1);

    expect(spy).not.toHaveBeenCalledWith(1);
  });
});
