import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  private _usuarios = new BehaviorSubject<User[]>([]);
  public usuarios$ = this._usuarios.asObservable();

  constructor(private http: HttpClient) {
    this.http.get<User[]>(this.apiUrl).pipe(
      catchError(err => {
        console.error('Error al cargar usuarios:', err);
        return EMPTY;
      })
    ).subscribe(data => this._usuarios.next(data));
  }

  getNombreUsuario(userId: number): string | null {
    const usuario = this._usuarios.getValue().find(u => u.id === userId);
    return usuario ? usuario.name : null;
  }
}