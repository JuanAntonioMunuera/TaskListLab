import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  public _tareas = new BehaviorSubject<any[]>([]);

  public tareas$ = this._tareas.asObservable();

  constructor(private http: HttpClient) {}

  getTareas(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getTareaPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  agregarTarea(tarea: { title: string; userId: number; completed: boolean }): Observable<any> {
    return this.http.post<any>(this.apiUrl, tarea);
  }

  editarTarea(id: number, tarea: { title: string; userId: number; completed: boolean }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, tarea);
  }

  borrarTarea(id: number): Observable<any> {
    // Comprueba si es tarea local o de la API
    if (id > 200) {
      return new Observable(observer => {
        observer.next({});
        observer.complete();
      });
    }
    // Simula el borrado a la API
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  
  eliminarTarea(id: number) {
    // Elimina la tarea del BehaviorSubject para actualizar la vista
    const tareasActuales = this._tareas.getValue();
    this._tareas.next(tareasActuales.filter(t => t.id !== id));
  }

  actualizarTarea(tareaEditada: any) {
    const tareasActuales = this._tareas.getValue();
    const nuevaLista = tareasActuales.map(t =>
      t.id === tareaEditada.id ? { ...tareaEditada } : t
    );
    this._tareas.next(nuevaLista);
  }

  cargarTareasEnSubject() {
    //Evita peticiones duplicadas si ya están cargadas
    if (this._tareas.getValue().length > 0) return;

    this.http.get<any[]>(this.apiUrl).subscribe((data) => {
      this._tareas.next(data);
    });
  }

  añadirTareaAlSubject(tarea: any) {
    const tareasActuales = this._tareas.getValue();
    this._tareas.next([...tareasActuales, tarea]);
  }
}
