import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarkUserDirective } from '../../directives/mark-user';
import { TaskStatusPipe } from '../../pipes/task-status-pipe';
import { TaskService } from '../../services/task';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../services/user';

interface Task {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MarkUserDirective, TaskStatusPipe, RouterModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.scss']
})
export class TaskList implements OnInit {

  tareas: Task[] = [];
  filtro: string = 'todas';

  constructor(private taskService: TaskService, private userService: UserService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.taskService.tareas$.subscribe((tareas) => {
      this.tareas = tareas;
      this.cdr.detectChanges();
    });
    this.taskService.cargarTareasEnSubject();

    this.userService.usuarios$.subscribe(() => {
      this.cdr.detectChanges();
    });
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
    return this.userService.getNombreUsuario(userId);
  }

  tareasFiltradas(): Task[] {
    if (this.filtro === 'completadas') return this.tareas.filter(t => t.completed);
    if (this.filtro === 'pendientes') return this.tareas.filter(t => !t.completed);
    return this.tareas;
  }
}
