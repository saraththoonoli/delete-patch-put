import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addTodo(todo: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, todo);
  }

  updateTodoPatch(id: number, updates: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<any>(url, updates);
  }

  updateTodoPut(id: number, updates: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, updates);
  }

  deleteTodo(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
