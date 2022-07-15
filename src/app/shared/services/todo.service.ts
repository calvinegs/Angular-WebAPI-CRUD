import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
import { AppSettings } from '../helpers/appSettings';
const API_URL = AppSettings.API_URL + 'todos/';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) { }
  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(API_URL);
  }
  get(id: any): Observable<Todo> {
    return this.http.get(`${API_URL}/${id}`);
  }
  create(data: any): Observable<Todo> {
    return this.http.post(API_URL, data);
  }
  update(id: any, data: Todo): Observable<any> {
    return this.http.put(`${API_URL}/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(API_URL);
  }
  findByTitle(title: any): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${API_URL}?title=${title}`);
  }
}