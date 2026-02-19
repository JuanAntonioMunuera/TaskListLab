import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TaskService } from '../../services/task';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-task.html',
  styleUrls: ['./add-task.scss']
})
export class AddTask {

  constructor(private router: Router, private taskService: TaskService, public userService: UserService) {}

  nuevaTarea = {
    title: '',
    userId: 1,
    completed: false
  };

  guardar() {
    if (!this.nuevaTarea.title.trim()) return;

    this.taskService.agregarTarea(this.nuevaTarea).subscribe((tareaCreada) => {
      this.taskService.añadirTareaAlSubject(tareaCreada);
      this.router.navigate(['/tasks']);
    });
  }
}