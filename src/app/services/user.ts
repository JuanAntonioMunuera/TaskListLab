import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  private _usuarios = new BehaviorSubject<any[]>([]);
  
  public usuarios$ = this._usuarios.asObservable();

  constructor(private http: HttpClient) {
    // Carga de usuarios al iniciar el servicio
    this.http.get<any[]>(this.apiUrl).subscribe((data) => {
      this._usuarios.next(data);
    });
  }

  getNombreUsuario(userId: number): string {
    const usuario = this._usuarios.getValue().find(u => u.id === userId);
    return usuario ? usuario.name : `Usuario ${userId}`;
  }
}