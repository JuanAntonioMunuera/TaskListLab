import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  private _tareas = new BehaviorSubject<Task[]>([]);
  public tareas$ = this._tareas.asObservable();

  constructor(private http: HttpClient) {}

  getTareas(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      catchError(err => { console.error('Error al obtener tareas:', err); return EMPTY; })
    );
  }

  getTareaPorId(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => { console.error('Error al obtener tarea:', err); return EMPTY; })
    );
  }

  agregarTarea(tarea: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, tarea).pipe(
      catchError(err => { console.error('Error al agregar tarea:', err); return EMPTY; })
    );
  }

  editarTarea(id: number, tarea: Omit<Task, 'id'>): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, tarea).pipe(
      catchError(err => { console.error('Error al editar tarea:', err); return EMPTY; })
    );
  }

  borrarTarea(id: number): Observable<object> {
    if (id > 200) {
      return new Observable(observer => {
        observer.next({});
        observer.complete();
      });
    }
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(err => { console.error('Error al borrar tarea:', err); return EMPTY; })
    );
  }

  eliminarTarea(id: number): void {
    const tareasActuales = this._tareas.getValue();
    this._tareas.next(tareasActuales.filter(t => t.id !== id));
  }

  actualizarTarea(tareaEditada: Task): void {
    const tareasActuales = this._tareas.getValue();
    this._tareas.next(tareasActuales.map(t =>
      t.id === tareaEditada.id ? { ...tareaEditada } : t
    ));
  }

  cargarTareasEnSubject(): void {
    if (this._tareas.getValue().length > 0) return;
    this.http.get<Task[]>(this.apiUrl).pipe(
      catchError(err => { console.error('Error al cargar tareas:', err); return EMPTY; })
    ).subscribe(data => this._tareas.next(data));
  }

  añadirTareaAlSubject(tarea: Task): void {
    this._tareas.next([...this._tareas.getValue(), tarea]);
  }

  getTareasFiltradas(tareas: Task[], filtro: string): Task[] {
    if (filtro === 'completadas') return tareas.filter(t => t.completed);
    if (filtro === 'pendientes') return tareas.filter(t => !t.completed);
    return tareas;
  }
}