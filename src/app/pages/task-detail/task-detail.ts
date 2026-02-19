import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task';
import { UserService } from '../../services/user';
import { TaskStatusPipe } from '../../pipes/task-status-pipe'; 

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskStatusPipe],
  templateUrl: './task-detail.html',
  styleUrls: ['./task-detail.scss']
})
export class TaskDetail implements OnInit {

  tarea: any;  
  nombreUsuario: string = '';
  modoEdicion: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    public userService: UserService
  ) {}

  ngOnInit() {    
    this.modoEdicion = this.route.snapshot.url.some(segment => segment.path === 'edit');

    const tareaId = +this.route.snapshot.paramMap.get('id')!;

    const tareaEnMemoria = this.taskService._tareas
      .getValue()
      .find(t => t.id === tareaId);

    if (tareaEnMemoria) {
      this.tarea = { ...tareaEnMemoria };
      this.nombreUsuario = this.userService.getNombreUsuario(this.tarea.userId);
    } else {
      this.loadTarea(tareaId);
    }
  }

  irAEditar() {
    this.router.navigate(['/tasks', this.tarea.id, 'edit']);
  }

  loadTarea(id: number) {
    this.taskService.getTareaPorId(id).subscribe((data) => {
      this.tarea = data;
      this.nombreUsuario = this.userService.getNombreUsuario(this.tarea.userId); // ✅
    });
  }

  guardarTarea() {
    const esTareaLocal = this.tarea.id > 200;

    if (esTareaLocal) {
      // Tarea local
      this.taskService.actualizarTarea(this.tarea);
      this.router.navigate(['/tasks']);
    } else {
      // Tarea API
      this.taskService.editarTarea(this.tarea.id, this.tarea).subscribe(() => {
        this.taskService.actualizarTarea(this.tarea);
        this.router.navigate(['/tasks']);
      });
    }
  }

  volver() {
    if (this.modoEdicion) {
      this.router.navigate(['/tasks', this.tarea.id]); 
    } else {
      this.router.navigate(['/tasks']);
    }
  }
}
