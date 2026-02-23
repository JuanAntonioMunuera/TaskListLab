import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarkUserDirective } from '../../directives/mark-user';
import { TaskStatusPipe } from '../../pipes/task-status-pipe';
import { TaskService } from '../../services/task';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../services/user';
import { Subscription } from 'rxjs';
import { Task } from '../../models/task';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MarkUserDirective, TaskStatusPipe, RouterModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.scss']
})
export class TaskList implements OnInit, OnDestroy {

  private subs = new Subscription();

  tareas: Task[] = [];
  filtro: string = 'todas';

  constructor(private taskService: TaskService, private userService: UserService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.subs.add(
      this.taskService.tareas$.subscribe((tareas) => {
        this.tareas = tareas;
        this.cdr.detectChanges();
      })
    );
    this.taskService.cargarTareasEnSubject();

    this.subs.add(
      this.userService.usuarios$.subscribe(() => {
        this.cdr.detectChanges();
      })
    );
  }

  ngOnDestroy() {
  this.subs.unsubscribe();
  }

  hayTareas(): boolean {
    return this.tareas.length > 0;
  }

  borrar(id: number) {
  const tarea = this.tareas.find(t => t.id === id);
  if (!tarea) return;
  
  if (!window.confirm(`Se va a eliminar la tarea: "${tarea.title}"`)) return;

  this.taskService.borrarTarea(id).subscribe(() => {
    this.taskService.eliminarTarea(id);
    this.cdr.detectChanges();
  });
}

  getUsuarioNombre(userId: number): string {
    return this.userService.getNombreUsuario(userId) ?? `Usuario ${userId}`;
  }

  tareasFiltradas(): Task[] {
    return this.taskService.getTareasFiltradas(this.tareas, this.filtro);
  }

}
